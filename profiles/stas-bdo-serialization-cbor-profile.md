# STAS Layer Profile — Bitcoin Digital Objects Serialization (Deterministic CBOR)

- Status: Draft
- Profile Identifier: `urn:stas:profile:bdo-serialization-cbor`
- Profile Version: 0.1.0
- Layer: Serialization (RFC-0009)
- Format: Deterministically Encoded CBOR (RFC 8949 §4.2)
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This Layer Profile constrains the **Serialization** layer (RFC-0009) for Bitcoin Digital Objects using **Deterministically Encoded CBOR** as defined in RFC 8949 §4.2.

It operates on a Representation conforming to the BDO Representation Profile (`urn:stas:profile:bdo-representation`) and defines a single, byte-reproducible Serialized Form for a given Representation, so that content-derived Identity and Integrity are stable across independent implementations.

This Profile is defined under RFC-0012 and preserves the semantics and architectural boundaries of RFC-0009.

---

# Profile Purpose

The purpose of this Profile is a deterministic, byte-reproducible serialization of a BDO Object: any two conforming Serializers given the same conforming Representation MUST produce identical bytes.

Determinism is required because Identity may be content-derived and Integrity is evaluated over serialized information; without a single reproducible Serialized Form, independent implementations could not agree on identity or verify integrity.

This Profile is a dependency of the composite **STAS Profile — Bitcoin Digital Objects** (`urn:stas:profile:bdo`).

---

# Profile Scope

This Profile applies to:

- the CBOR representation of the component slots defined by the BDO Representation Profile;
- the deterministic encoding requirements every conforming Serialized Form satisfies;
- the serialization of Extensions with byte-for-byte payload preservation.

This Profile does not apply to:

- the structural model of a Representation (BDO Representation Profile);
- byte-level encoding on top of the Serialized Form, framing, or media types (Encoding Layer Profile);
- transport or storage;
- the semantic meaning of any component.

Silence in this Profile SHALL NOT be interpreted as a requirement.

---

# Dependencies

- **STAS-01 v1.0**, in particular RFC-0009 (Serialization) and RFC-0013 (Extension Model).
- **`urn:stas:profile:bdo-representation`** — the Representation this Profile serializes.
- **RFC 8949** — Concise Binary Object Representation (CBOR), in particular §4.2 (Deterministically Encoded CBOR).

---

# Conformance Classes

- **Serializer** — produces a Serialized Form from a conforming Representation.
- **Deserializer** — reconstructs a Representation from a Serialized Form.

A conformance claim SHALL identify the applicable Conformance Class.

---

# Serialized Form

The Serialized Form of a BDO Object is a single CBOR data item: a CBOR **map** whose entries are the component slots present in the Representation.

- Each map key is a CBOR definite-length text string equal to the component slot name defined by the BDO Representation Profile (`type`, `identity`, `integrity`, `content`, `metadata`, `capabilities`, `extensions`).
- Each map value is the CBOR serialization of that component.
- Only slots present in the conforming Representation appear; absent optional slots are omitted rather than encoded as null.
- The map MUST NOT contain duplicate keys and MUST NOT contain a key not defined by the BDO Representation Profile or a Profile that composes it.

A Serializer MUST reject a Representation that is not conformant to the BDO Representation Profile rather than produce a Serialized Form for it.

---

# Deterministic Encoding Requirements

Every Serialized Form produced under this Profile MUST be Deterministically Encoded CBOR per RFC 8949 §4.2. In particular:

- integers, lengths, and other head values MUST use the shortest form;
- all items MUST use definite-length encoding; indefinite-length items MUST NOT be used;
- map keys MUST be sorted in the bytewise lexicographic order of their deterministic encodings (RFC 8949 §4.2.1);
- a map MUST NOT contain duplicate keys;
- floating-point values, where used, MUST use the shortest form that preserves the value;
- no CBOR tags MUST be used except where explicitly defined by this Profile or a Profile that composes it.

Two conforming Serializers given the same conforming Representation MUST produce byte-identical Serialized Forms.

---

# Extension Serialization

Extensions in the `extensions` slot are serialized as a CBOR array of Extension items. Each Extension item is a CBOR map with the following keys, deterministically encoded:

- `id` — the Extension Identifier;
- `ns` — the Extension Namespace;
- `ver` — the Extension Version;
- `req` — the Processing Requirement (`MUST_UNDERSTAND` or `MAY_IGNORE`);
- `payload` — the Extension payload as a CBOR byte string (`bstr`).

The `payload` byte string is an **opaque octet sequence**. A Serializer MUST place the exact payload octets in the byte string, and a Deserializer or intermediary that does not understand the Extension MUST preserve the byte string verbatim and MUST NOT decode, re-encode, or re-canonicalize its contents. The `bstr` is length-prefixed, satisfying the RFC-0013 requirement that an Extension be independently delimited and its unknown payload preserved byte-for-byte.

The array of Extension items MUST be ordered deterministically by the bytewise lexicographic order of each item's `ns` then `id` then `ver`.

---

# Serialization Round-Trip

A conforming Serialization supports the round-trip required by RFC-0009: a Representation serialized and then deserialized MUST yield a semantically equivalent Representation.

Under this Profile the round-trip is additionally byte-stable: re-serializing the reconstructed Representation MUST produce the identical Serialized Form, and an unknown Extension payload MUST survive the round-trip byte-for-byte.

---

# Validation

A Deserializer:

- MUST reject a Serialized Form that is not valid Deterministically Encoded CBOR per RFC 8949 §4.2;
- MUST reject a Serialized Form whose top-level item is not a CBOR map;
- MUST reject a map containing a duplicate key, an undefined key, or a missing REQUIRED slot;
- MUST reject an object carrying a `MUST_UNDERSTAND` Extension it does not understand;
- MUST preserve a `MAY_IGNORE` Extension it does not understand, retaining its `payload` byte string unchanged.

Validation at this layer is structural and encoding-level. It does not establish authenticity, ownership, or trust.

---

# Relationship to Encoding

This Profile produces a Serialized Form that is already a sequence of CBOR bytes. An Encoding Layer Profile for BDO MAY therefore be a near-identity encoding that pins the media type (for example `application/cbor`) and confirms byte-level constraints, rather than transforming the bytes further. This Profile does not define that Encoding Profile.

---

# Conformance

An implementation or Serialized Form conforms to this Profile when it satisfies every applicable **MUST** requirement of this Profile, of RFC-0009, and of this Profile's Dependency Closure, for the applicable Conformance Class.

Partial implementation SHALL NOT be described as full conformance.

---

# Compatibility and Versioning

This Profile is an independent version domain under RFC-0015. Its Profile Identifier `urn:stas:profile:bdo-serialization-cbor` is stable across compatible revisions.

This Profile is at version 0.1.0 and is **Draft**. Because determinism is a mandatory guarantee, any change that would alter the bytes produced for an existing conforming Representation is a breaking change and SHALL be expressed as a new incompatible Version.

---

# Security Considerations

Deterministic encoding reduces malleability: a given Representation has exactly one valid Serialized Form, so a Deserializer MUST reject non-deterministic encodings rather than accept and re-serialize them, which would otherwise permit multiple byte sequences for one logical object. Malformed, deeply nested, or oversized CBOR SHOULD be handled with appropriate resource limits. The security considerations of STAS-01 apply in full.

---

# Privacy Considerations

The Serialized Form exposes the same information as the Representation it encodes. Producers SHOULD serialize no more than the stated purpose requires, consistent with the privacy considerations of the BDO Representation Profile and STAS-01.

---

# References

## Normative

- STAS-01 v1.0 — Shared Taproot Assets Standard
- RFC-0009 — Serialization
- RFC-0012 — Profiles
- RFC-0013 — Extension Model
- RFC-0015 — Versioning and Compatibility
- RFC 8949 — Concise Binary Object Representation (CBOR), §4.2 Deterministically Encoded CBOR
- `urn:stas:profile:bdo-representation` — BDO Representation Layer Profile

## Informative

- `urn:stas:profile:bdo` — STAS Profile — Bitcoin Digital Objects (composes this Layer Profile)
- BDO-01 v1.0 — Bitcoin Digital Objects
