# STAS Layer Profile — Bitcoin Digital Objects Encoding (CBOR)

- Status: Draft
- Profile Identifier: `urn:stas:profile:bdo-encoding-cbor`
- Profile Version: 0.1.0
- Layer: Encoding (RFC-0010)
- Media Type: `application/cbor`
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This Layer Profile constrains the **Encoding** layer (RFC-0010) for Bitcoin Digital Objects whose Serialized Form is Deterministically Encoded CBOR.

Because the Serialized Form produced by `urn:stas:profile:bdo-serialization-cbor` is already a deterministic sequence of CBOR bytes, this Profile defines an **identity encoding**: the Encoded Form is the Serialized Form unchanged. This Profile pins the media type and requires byte-level equality, so that the Encoded Form remains reproducible and verifiable.

This Profile is defined under RFC-0012 and preserves the semantics and architectural boundaries of RFC-0010.

---

# Profile Purpose

The purpose of this Profile is to complete the Bitcoin Digital Objects pipeline (Representation → Serialization → Encoding) with an encoding that adds no transformation and no ambiguity, so that the bytes an implementation transports, stores, hashes, or verifies are exactly the deterministic Serialized Form.

This Profile is a dependency of the composite **STAS Profile — Bitcoin Digital Objects** (`urn:stas:profile:bdo`).

---

# Profile Scope

This Profile applies to:

- the relationship between the Serialized Form and the Encoded Form;
- the media type of the Encoded Form;
- byte-level equality and decoding.

This Profile does not apply to:

- the CBOR serialization itself (BDO Serialization Layer Profile);
- transport or storage of the Encoded Form (Transport / Storage Layer Profiles);
- confidentiality transformations such as encryption or compression, which, if applied, are defined by a separate Profile and are not part of this encoding.

Silence in this Profile SHALL NOT be interpreted as a requirement.

---

# Dependencies

- **STAS-01 v1.0**, in particular RFC-0010 (Encoding).
- **`urn:stas:profile:bdo-serialization-cbor`** — the Serialized Form this Profile encodes.
- **RFC 8949** — CBOR.
- **RFC 8949 §11 / IANA** — the `application/cbor` media type.

---

# Conformance Classes

- **Encoder** — produces an Encoded Form from a Serialized Form.
- **Decoder** — reconstructs the Serialized Form from an Encoded Form.

A conformance claim SHALL identify the applicable Conformance Class.

---

# Encoded Form

The Encoded Form of a BDO Object is the Serialized Form produced by `urn:stas:profile:bdo-serialization-cbor`, unchanged.

- An Encoder MUST produce an Encoded Form whose octets are byte-for-byte equal to the Serialized Form.
- The encoding transformation is the identity transformation. An Encoder MUST NOT reorder, re-canonicalize, pad, wrap, compress, or otherwise alter the bytes.
- The media type of the Encoded Form is `application/cbor`.

Because the Serialized Form is already Deterministically Encoded CBOR, the Encoded Form inherits its determinism: a given conforming Representation has exactly one valid Encoded Form under this Profile.

---

# Decoding

Decoding is the identity transformation: the Decoder treats the Encoded Form octets as the Serialized Form and passes them to the Serialization layer.

- A Decoder MUST treat the Encoded Form as opaque octets at this layer and MUST NOT alter them before handing them to Serialization.
- A Decoder MUST reject an Encoded Form that is not well-formed CBOR, and MUST NOT attempt to repair or normalize it.

Semantic interpretation of the decoded object remains governed by its Type and the higher layers.

---

# Byte-Level Equality

This Profile requires byte-level equality, which RFC-0010 leaves to the Encoding Profile:

- two Encoded Forms are equivalent under this Profile only when their octets are identical;
- re-encoding a Serialized Form MUST produce identical octets;
- an unknown Extension payload, carried as an opaque `bstr` in the Serialized Form, is preserved byte-for-byte through encoding and decoding.

This byte-level equality is what allows Identity anchoring and Integrity verification to operate over the Encoded Form directly.

---

# Encoding Round-Trip

A conforming Encoding supports the round-trip required by RFC-0010: encoding a Serialized Form and then decoding it MUST reconstruct the identical Serialized Form. Under this Profile, because the transformation is the identity, the reconstructed Serialized Form is byte-for-byte equal to the original.

---

# Relationship to Transport and Storage

The Encoded Form defined here is the unit conveyed by Transport and preserved by Storage. Transport and Storage Layer Profiles for BDO, when defined, carry this `application/cbor` Encoded Form without redefining it. Any confidentiality transformation (for example encryption) applied for transport or storage operates on the Encoded Form and is outside this Profile; it does not change the Encoded Form's definition.

---

# Conformance

An implementation or Encoded Form conforms to this Profile when it satisfies every applicable **MUST** requirement of this Profile, of RFC-0010, and of this Profile's Dependency Closure, for the applicable Conformance Class.

Partial implementation SHALL NOT be described as full conformance.

---

# Compatibility and Versioning

This Profile is an independent version domain under RFC-0015. Its Profile Identifier `urn:stas:profile:bdo-encoding-cbor` is stable across compatible revisions.

This Profile is at version 0.1.0 and is **Draft**. Any change that would alter the octets of the Encoded Form for an existing conforming Serialized Form — including introducing a non-identity transformation — is a breaking change and SHALL be expressed as a new incompatible Version.

---

# Security Considerations

An identity encoding introduces no transformation and therefore no additional parsing surface beyond CBOR itself; Decoders MUST still reject malformed CBOR and SHOULD apply resource limits to deeply nested or oversized input. Because this Profile guarantees byte-level equality, it does not itself provide confidentiality: the Encoded Form reveals the same information as the Serialized Form unless a separate confidentiality Profile is applied. The security considerations of STAS-01 apply in full.

---

# Privacy Considerations

The Encoded Form exposes the same information as the Serialized Form. Where confidentiality is required, it is provided by a separate mechanism applied to the Encoded Form, consistent with the privacy considerations of STAS-01.

---

# References

## Normative

- STAS-01 v1.0 — Shared Taproot Assets Standard
- RFC-0010 — Encoding
- RFC-0012 — Profiles
- RFC-0015 — Versioning and Compatibility
- RFC 8949 — Concise Binary Object Representation (CBOR)
- `urn:stas:profile:bdo-serialization-cbor` — BDO Serialization Layer Profile

## Informative

- `urn:stas:profile:bdo` — STAS Profile — Bitcoin Digital Objects (composes this Layer Profile)
- BDO-01 v1.0 — Bitcoin Digital Objects
