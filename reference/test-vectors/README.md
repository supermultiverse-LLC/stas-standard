# BDO Serialization Test Vectors

This directory is the **test suite** (RFC-0012 §Profile Test Suites) for the BDO
representation pipeline:

| Profile | Version tested |
|---|---|
| `urn:stas:profile:bdo-representation` | 0.2.0 |
| `urn:stas:profile:bdo-serialization-cbor` | 0.2.0 |
| `urn:stas:profile:bdo-encoding-cbor` | 0.1.0 |

## What a vector is

Each vector gives a BDO Representation (human-readable), its **exact canonical
CBOR bytes** (hex), and the **Meta Commitment** — the SHA-256 of those bytes,
as placed in the Taproot Asset meta payload under
`urn:stas:profile:bdo-taproot-binding` (Commitment Mode), or derivable from the
payload (Inline Mode).

Two independent Serializers conforming to the profiles MUST reproduce these
bytes exactly. An implementation that produces different bytes for a vector's
Representation is non-conforming — the profiles define conformance; these
vectors make the failure observable.

## Files

- `generate.mjs` — zero-dependency reference implementation (Node ≥ 18). Small
  on purpose: it is meant to be read.
- `vectors.json` — machine-readable vectors (for test harnesses).
- `vectors.md` — the same vectors, human-readable.

`vectors.json` and `vectors.md` are **frozen**. Regenerate with
`node generate.mjs`; if any byte changes, a breaking profile change has
occurred and MUST be handled under RFC-0015 — the vectors do not silently
follow the code.

## Coverage

- One vector per Type of the BDO Type Vocabulary (RFC-0017): `collectible`,
  `ticket`, `membership`, `redeemable`, `certificate`.
- Canonical map-key ordering (RFC 8949 §4.2.1 — note `type` sorts first, before
  `content`, `identity`, `integrity`: shorter encoded keys precede longer).
- NFC normalization: `ticket-full`'s name is written **decomposed** in the
  generator source (`e` + U+0301) and must serialize **composed** (`é`, UTF-8
  `c3 a9`).
- Absent-not-empty field rules; `identity`/`integrity` derivation declarations
  (`taproot-assets-genesis`, `carrier-commitment`); an `integrity.refs` entry
  binding external image bytes.
- One Extension item (`urn:stas:ext:bdo-attestation`) exercising extension
  serialization and byte-preserved opaque payloads. The payload in that vector
  is **exemplary bytes only** — the attestation payload's own serialization is
  defined by the Extension, and this layer preserves it verbatim regardless.

## Status

Informative, like all of `reference/` — conformance is defined by the
profiles. The vectors are the agreed cross-verification fixture for reference
implementations (first consumers: the platform TypeScript serializer and the
plugin C# serializer, which must match these bytes and each other).
