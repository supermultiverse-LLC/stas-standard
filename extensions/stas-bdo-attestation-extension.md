# STAS Extension — BDO Attestation

- Status: Draft
- Extension Identifier: `urn:stas:ext:bdo-attestation`
- Extension Namespace: `urn:stas:ext` (Namespace Authority: STAS Working Group)
- Extension Version: 0.1.0
- Processing Requirement: `MAY_IGNORE`
- Author: STAS Working Group
- Created: 2026-08-13

---

# Abstract

This Extension defines the **Attestation**: a signed statement by an identified signer
about a BDO Object, referencing the object's Integrity evidence.

An Attestation is how **Authenticity** travels with a BDO Object — who authored it, who
vouches for it — while remaining strictly separate from Integrity, as required by
RFC-0006 and by the *Authenticity Separation* section of the Taproot Binding Profile
(`urn:stas:profile:bdo-taproot-binding`). An Attestation references the Integrity
digest; it is never the Integrity mechanism.

This is the first concrete Extension defined under the Extension Model (RFC-0013). It
is carried in the `extensions` slot of the BDO Representation
(`urn:stas:profile:bdo-representation`) and is byte-preserved by consumers that do not
process it.

---

# Purpose

A verifier can establish that a BDO Object is intact (Integrity) and who controls it
(ownership, via the Taproot Assets protocol) without trusting anyone. What those
mechanisms cannot establish is **who stands behind the object**: the creator claiming
authorship, or a platform vouching that it verified the object.

This Extension carries that evidence in a form any independent implementation can
validate, so that authorship and endorsement survive across wallets, platforms, and
the disappearance of any single vendor.

---

# Scope

This Extension defines:

- the structure of an Attestation (role, scheme, signer, target, signature);
- the signature schemes an Attestation may use, and how each is validated;
- the domain-separation fields and their standard literals;
- processing and preservation requirements.

This Extension does not define:

- signer identity resolution — *which real-world party controls a key* is the concern
  of registries, platform records, or future specifications;
- revocation of attestations;
- Integrity, ownership, or Identity, which are defined by the Profiles this Extension
  accompanies;
- any trust decision. An Attestation is evidence, not a verdict (BDO-01 Trust Model).

Silence in this Extension SHALL NOT be interpreted as a requirement.

---

# Dependencies

- **STAS-01 v1.0** — RFC-0006 (Integrity), RFC-0013 (Extension Model), RFC-0015
  (Versioning), RFC-0016 (Conformance).
- **`urn:stas:profile:bdo-taproot-binding` v0.2.0** — defines the Meta Commitment an
  Attestation targets and requires the Authenticity/Integrity separation this
  Extension realizes.
- **External normative:** BIP-340 (Schnorr signatures), BIP-322 (generic signed
  messages), the Nostr event model (NIP-01) for the `nostr-event` scheme, FIPS 180-4
  (SHA-256).

Informative: BDO-01 v1.0 (Trust Model, Issuer Model); BDO RFC-0011.

---

# Conformance Classes

- **Attestation Producer** — creates and attaches Attestations.
- **Attestation Verifier** — validates Attestations.

A consumer that does not process this Extension is not a Conformance Class of this
Extension; it is governed by the preservation rules of RFC-0013 and the composed
Profiles (`MAY_IGNORE`: preserve byte-for-byte, never reinterpret).

---

# The Attestation

An Attestation is a statement of the form: *signer S, acting in role R, signs a
commitment that references target T under scheme M.*

Every Attestation MUST carry:

| Field | Meaning |
|---|---|
| `role` | the capacity in which the signer attests (see Roles) |
| `scheme` | the signature scheme (see Schemes) |
| `signer` | the signer's public key, in the scheme's canonical form |
| `target` | the referenced digest: the Meta Commitment of the object (lowercase 64-hex) |
| `signature` | the signature material, per the scheme |
| scheme evidence | any additional material the scheme requires for independent validation, byte-preserved |

Requirements:

- The `target` MUST equal the object's Meta Commitment. An Attestation whose target
  does not match the accompanying object MUST be treated as not valid for that object.
- An object MAY carry multiple Attestations (multiple roles, multiple signers). An
  Attestation Producer SHOULD NOT attach more than one Attestation per (role, signer,
  scheme) triple.
- An Attestation MUST be independently delimitable and byte-preserved (RFC-0013); a
  Verifier MUST validate the signature over the exact preserved bytes, never over a
  re-serialization.

---

# Roles

| Role | Meaning |
|---|---|
| `creator` | authorship: the signer claims to be the author/issuer of the object |
| `platform` | endorsement: the signer operated the issuance or verification of the object and vouches for it |
| `witness` | reserved for future use (third-party observation) |

- A role is a claim about capacity, not a verified fact: `creator` proves control of
  the signing key at signing time, not real-world identity.
- A Verifier MUST report which roles were validly attested and MUST NOT collapse
  distinct roles into a single "verified" verdict.
- Under `urn:stas:profile:bdo-taproot-binding`, ecosystem rules MAY require a
  `creator` Attestation for indexing or listing; that requirement belongs to the
  deployment, not to this Extension.

---

# Schemes

## `nostr-event`

The Attestation is a complete signed Nostr event (NIP-01), preserved verbatim.

- The event `kind` MUST be `30078` (parameterized replaceable application data).
- The event `tags` MUST include, each exactly once:
  - `["purpose", <purpose literal>]` (see Domain Separation);
  - `["domain", <domain identifier>]`;
  - `["metadata_hash", <target>]` — the tag value MUST equal the Attestation `target`.
- The event `pubkey` (x-only, lowercase hex) is the `signer` and MUST equal the
  Attestation's signer field.
- Validation: recompute the event id over the preserved event fields per NIP-01;
  verify the BIP-340 signature over that id; verify the tag/target equalities above.
  Any failure invalidates the Attestation.

## `bip322-message`

The Attestation signs the **canonical commitment payload**: a JSON object with keys in
ascending lexicographic order, UTF-8 encoded, no insignificant whitespace, containing:

- `domain` — the domain identifier;
- `metadata_hash` — the target;
- `purpose` — the purpose literal;
- `schema_version` — the string `"1"`;
- optionally `asset_id`, `collection_id`, `issuer_user_id` — included only when
  present (omitted, never null).

The signature is a BIP-322 signature over those exact payload bytes by the `signer`
key. Validation recomputes the payload bytes from the preserved fields and verifies
per BIP-322. The same byte stream is used to sign and to verify — no tolerance.

## `secp256k1-digest`

A raw secp256k1 signature by a declared key over a message derived from the `target`
digest. This scheme exists for operator (`platform`) signing paths; the exact message
derivation MUST be declared by the deployment's Profile or documentation, and a
Verifier MUST NOT guess it. Producers SHOULD prefer `bip322-message` for new platform
attestations; this scheme is retained for compatibility with existing deployments.

---

# Domain Separation

Two fields bind an Attestation to its context and prevent cross-context replay:

- **`purpose`** — what kind of statement this is. The standard literal for this
  Extension Version is **`bdo_asset_signature`**.
- **`domain`** — the deployment context in which the signer's identity is registered
  and the Attestation is meant to be interpreted (for example, the platform's DNS
  name). The domain is chosen by the deployment and declared; it is not fixed by this
  Extension.

**Deployments predating this Extension** used vendor-specific purpose literals (for
example `supermultiverse_asset_signature` with domain `supermultiverse`). A Verifier
MAY accept such literals for objects created before the deployment adopted this
Extension, and SHOULD identify them as pre-adoption attestations. A new Attestation
SHALL use the standard purpose literal. Accepting a legacy literal SHALL NOT weaken
any validation rule.

---

# Processing

- Processing Requirement: **`MAY_IGNORE`**. A consumer that does not process this
  Extension MUST preserve it byte-for-byte and MUST NOT reject an object solely for
  carrying it.
- A consumer that does not process this Extension MUST NOT claim any authenticity
  verdict about the object — ignoring the Extension means authenticity is simply
  unevaluated.
- A Verifier MUST validate each Attestation independently; one invalid Attestation
  does not invalidate the others or the object.
- Presence is not validity: an unvalidated Attestation MUST NOT be presented as a
  verified one.
- An Attestation MUST NOT be used as the object's Integrity mechanism, and its absence
  MUST NOT be reported as an Integrity failure (inherited from the Taproot Binding
  Profile).

---

# Conformance

An implementation conforms to this Extension when it satisfies every applicable
**MUST** requirement of this document and of its Dependency Closure for the applicable
Conformance Class. Partial implementation SHALL NOT be described as full conformance.

---

# Compatibility and Versioning

This Extension is an independent version domain under RFC-0015. Its Extension
Identifier `urn:stas:ext:bdo-attestation` is stable across compatible revisions.

This Extension is at version 0.1.0 and is **Draft**. Adding a scheme or a role is a
compatible change; changing the validation rules of an existing scheme, the standard
purpose literal, or the Processing Requirement is a breaking change and SHALL be
expressed as a new incompatible Version. The Processing Requirement MAY be
strengthened by a Profile, instance, or emitter and SHALL NOT be weakened (RFC-0013).

---

# Security Considerations

- An Attestation proves control of a key at signing time. It does not prove real-world
  identity, good faith, or the truth of the object's contents. Signer-identity
  resolution and trust decisions are outside this Extension.
- Replay is bounded by the `target` (each Attestation binds one object's commitment)
  and by `domain` separation across deployments. A Verifier MUST check the target
  equality; skipping it re-enables cross-object replay.
- This Extension defines no revocation. A deployment requiring revocation semantics
  MUST layer them explicitly; a Verifier MUST NOT infer revocation from absence.
- Signature validation MUST use the preserved bytes. Re-serializing before validation
  reintroduces exactly the canonicalisation ambiguity this ecosystem exists to remove.

---

# Privacy Considerations

An Attestation permanently and publicly links a signing key to an object. Signers
SHOULD understand that authorship attestations are irrevocable public statements;
deployments SHOULD NOT require personally identifying material inside the Attestation
itself beyond the signing key and declared context fields.

---

# References

## Normative

- STAS-01 v1.0 — RFC-0006, RFC-0013, RFC-0015, RFC-0016
- `urn:stas:profile:bdo-taproot-binding` v0.2.0
- BIP-340 — Schnorr Signatures for secp256k1
- BIP-322 — Generic Signed Message Format
- NIP-01 — Nostr basic protocol (event model)
- FIPS 180-4 — Secure Hash Standard (SHA-256)

## Informative

- BDO-01 v1.0 — Bitcoin Digital Objects (Trust Model, Issuer Model)
- BDO RFC-0011 — Taproot Binding and Canonical Conformance
