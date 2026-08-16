#!/usr/bin/env node
// STAS BDO test-vector generator (reference implementation).
//
// Implements the deterministic CBOR serialization of a BDO Representation per:
//   - urn:stas:profile:bdo-representation      0.2.0  (slot schemas, value kinds)
//   - urn:stas:profile:bdo-serialization-cbor  0.2.0  (deterministic CBOR, RFC 8949 §4.2)
//   - urn:stas:profile:bdo-encoding-cbor       0.1.0  (identity encoding)
//
// Zero dependencies, written for auditability rather than speed. Running it
// regenerates vectors.json and vectors.md; committed outputs are FROZEN — a
// regeneration that changes any byte signals a breaking profile change.
//
// Value-kind mapping (Serialization 0.2.0 §Component Value Serialization):
//   text   -> definite-length text string, UTF-8, NFC-normalized here
//   octets -> definite-length byte string
//   uint   -> unsigned integer, shortest form
//   list   -> definite-length array, order preserved
//   map    -> definite-length map, text keys, sorted bytewise by their
//             deterministic encodings (RFC 8949 §4.2.1)

import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── deterministic CBOR encoder (subset used by the profiles: no floats, no tags) ──

function head(major, n) {
  if (n < 24) return Buffer.from([(major << 5) | n]);
  if (n < 0x100) return Buffer.from([(major << 5) | 24, n]);
  if (n < 0x10000) { const b = Buffer.alloc(3); b[0] = (major << 5) | 25; b.writeUInt16BE(n, 1); return b; }
  if (n < 0x100000000) { const b = Buffer.alloc(5); b[0] = (major << 5) | 26; b.writeUInt32BE(n, 1); return b; }
  throw new Error('value too large for these vectors');
}

function encode(value) {
  if (typeof value === 'number') {
    if (!Number.isInteger(value) || value < 0) throw new Error('only unsigned integers are used by the profiles');
    return head(0, value);
  }
  if (typeof value === 'string') {
    const bytes = Buffer.from(value.normalize('NFC'), 'utf8'); // text is NFC (Representation 0.2.0)
    return Buffer.concat([head(3, bytes.length), bytes]);
  }
  if (Buffer.isBuffer(value)) {
    return Buffer.concat([head(2, value.length), value]);
  }
  if (Array.isArray(value)) {
    const items = value.map(encode);
    return Buffer.concat([head(4, items.length), ...items]);
  }
  if (value !== null && typeof value === 'object') {
    // map: encode keys, sort entries bytewise by encoded key (RFC 8949 §4.2.1)
    const entries = Object.entries(value)
      .filter(([, v]) => v !== undefined) // absent fields are omitted, never null/empty
      .map(([k, v]) => [encode(k), encode(v)]);
    entries.sort((a, b) => Buffer.compare(a[0], b[0]));
    return Buffer.concat([head(5, entries.length), ...entries.flat()]);
  }
  throw new Error(`unsupported value: ${value}`);
}

const sha256 = (buf) => createHash('sha256').update(buf).digest();

// ── vector definitions ────────────────────────────────────────────────────────
// Every object: identity declares its derivation scheme; integrity declares the
// carrier-commitment scheme (the form's own integrity IS the outer Meta
// Commitment; refs[] bind external resources).

const IDENTITY = { scheme: 'taproot-assets-genesis' };
const INTEGRITY = { scheme: 'carrier-commitment' };

// A reproducible stand-in for "the bytes of an external image": the digest in
// integrity.refs below is sha256 of this ASCII string.
const IMAGE_BYTES = Buffer.from('stas-test-vector-image-bytes', 'ascii');

const vectors = [
  {
    name: 'collectible-minimal',
    description: 'Smallest conforming collectible: required slots only; content is the media (A5).',
    representation: {
      type: 'collectible',
      identity: IDENTITY,
      integrity: INTEGRITY,
      content: { media: [{ uri: 'https://example.com/art.png' }] },
    },
  },
  {
    name: 'ticket-full',
    description:
      'Ticket with metadata, validity window, uses, an attribute, and an integrity ref binding the image bytes. ' +
      'The metadata.name is written in the source with a DECOMPOSED accent (Cafe\\u0301) and must serialize NFC-composed.',
    representation: {
      type: 'ticket',
      identity: IDENTITY,
      integrity: {
        scheme: 'carrier-commitment',
        refs: [{ subject: 'metadata.image', alg: 'sha-256', digest: sha256(IMAGE_BYTES) }],
      },
      content: {
        event: 'Satoshi Stadium Final',
        ticket_type: 'General',
        valid_from: 1767225600,
        valid_until: 1767312000,
        uses: 1,
      },
      metadata: {
        name: 'Entrada Café Final', // decomposed on purpose; NFC composes it
        issuer: 'Vector Issuer',
        image: 'https://example.com/ticket.png',
        attributes: [{ trait: 'row', value: '10' }],
      },
    },
  },
  {
    name: 'membership',
    description: 'Membership: the grant is the content.',
    representation: {
      type: 'membership',
      identity: IDENTITY,
      integrity: INTEGRITY,
      content: { grant: 'clubhouse-access', valid_until: 1798761600 },
      metadata: { name: 'Vector Membership' },
    },
  },
  {
    name: 'redeemable',
    description: 'Redeemable: the promise and its redemption count are the content.',
    representation: {
      type: 'redeemable',
      identity: IDENTITY,
      integrity: INTEGRITY,
      content: { promise: 'one-coffee', redemptions: 3 },
      metadata: { name: 'Coffee Card' },
    },
  },
  {
    name: 'certificate',
    description: 'Certificate (RFC-0017): the certification statement is the content; inert.',
    representation: {
      type: 'certificate',
      identity: IDENTITY,
      integrity: INTEGRITY,
      content: {
        subject: 'Guitar SN-0042',
        declaration: 'Authentic instrument, workshop of Vector Luthiers',
        reference: 'SN-0042',
      },
      metadata: { name: 'Certificate of Authenticity', issuer: 'Vector Luthiers' },
    },
  },
  {
    name: 'collectible-with-extension',
    description:
      'Collectible carrying one Extension item (urn:stas:ext:bdo-attestation). The payload here is EXEMPLARY ' +
      'opaque bytes — the attestation payload serialization is defined by the Extension and is byte-preserved ' +
      'by this layer regardless of its content.',
    representation: {
      type: 'collectible',
      identity: IDENTITY,
      integrity: INTEGRITY,
      content: { media: [{ uri: 'https://example.com/art.png' }] },
      extensions: [
        {
          id: 'bdo-attestation',
          ns: 'urn:stas:ext',
          ver: '0.1.0',
          req: 'MAY_IGNORE',
          payload: Buffer.from('{"example":"opaque attestation payload"}', 'utf8'),
        },
      ],
    },
  },
];

// ── generation ────────────────────────────────────────────────────────────────

function reprForDisplay(v) {
  // JSON view of the representation with octets shown as hex strings.
  return JSON.parse(
    JSON.stringify(v, (k, val) =>
      val && val.type === 'Buffer' && Array.isArray(val.data) ? Buffer.from(val.data).toString('hex') : val,
    ),
  );
}

const out = vectors.map((v) => {
  const bytes = encode(v.representation);
  return {
    name: v.name,
    description: v.description,
    representation: reprForDisplay(v.representation),
    cbor_hex: bytes.toString('hex'),
    cbor_length: bytes.length,
    meta_commitment_sha256: sha256(bytes).toString('hex'),
  };
});

const here = dirname(fileURLToPath(import.meta.url));

writeFileSync(join(here, 'vectors.json'), JSON.stringify(out, null, 2) + '\n');

const md = [
  '# BDO Serialization Test Vectors',
  '',
  'Generated by `generate.mjs` — see README.md for scope and rules. FROZEN: a',
  'regeneration that changes any byte signals a breaking profile change.',
  '',
  ...out.flatMap((v) => [
    `## ${v.name}`,
    '',
    v.description,
    '',
    '```json',
    JSON.stringify(v.representation, null, 2),
    '```',
    '',
    `Canonical CBOR (${v.cbor_length} bytes):`,
    '',
    '```',
    v.cbor_hex,
    '```',
    '',
    `Meta Commitment (SHA-256 of the bytes above):`,
    '',
    '```',
    v.meta_commitment_sha256,
    '```',
    '',
  ]),
].join('\n');

writeFileSync(join(here, 'vectors.md'), md);

console.log(`${out.length} vectors written.`);
for (const v of out) console.log(`  ${v.name}: ${v.cbor_length} bytes, commitment ${v.meta_commitment_sha256.slice(0, 16)}…`);
