# STAS Layer Profile — Bitcoin Digital Objects Representation

- Status: Draft
- Profile Identifier: `urn:stas:profile:bdo-representation`
- Profile Version: 0.1.0
- Layer: Representation (RFC-0008)
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This Layer Profile constrains the **Representation** layer (RFC-0008) for Bitcoin Digital Objects.

It defines the concrete structural organization of a Representation of a BDO Object: which of the Core Object Model components appear, which are required, which are optional, and how Extensions attach. It defines structure only; it does not define a serialization format, encoding, or byte layout, which are the responsibility of the Serialization and Encoding Layer Profiles.

This Profile is defined under RFC-0012 and preserves the semantics and architectural boundaries of RFC-0008.

---

# Profile Purpose

The purpose of this Profile is to give independent implementations a single, shared structural model for representing a Bitcoin Digital Object, so that a Complete Representation carries exactly the components required to reconstruct a semantically equivalent BDO Object.

This Profile is a dependency of the composite **STAS Profile — Bitcoin Digital Objects** (`urn:stas:profile:bdo`).

---

# Profile Scope

This Profile applies to:

- the set and multiplicity of Core Object Model components present in a Representation of a BDO Object;
- the structural placement of Extensions;
- the requirements for a Complete Representation and for a Projection.

This Profile does not apply to:

- serialization ordering, normalization, or format (Serialization Layer Profile);
- byte-level encoding, canonicalization, or media types (Encoding Layer Profile);
- the semantic meaning of any component, which is defined by STAS-01 and the object's Type;
- concrete field syntax in any particular wire format.

Silence in this Profile SHALL NOT be interpreted as a requirement.

---

# Dependencies

- **STAS-01 v1.0**, in particular RFC-0008 (Representation), RFC-0001 (Core Object Model), and RFC-0013 (Extension Model).
- This Profile is intended to be composed by `urn:stas:profile:bdo` together with a Serialization Layer Profile and an Encoding Layer Profile.

---

# Conformance Classes

- **Representation Producer** — constructs a Representation of a BDO Object.
- **Representation Consumer** — interprets such a Representation.

A conformance claim SHALL identify the applicable Conformance Class.

---

# Representation Structure

A Representation of a BDO Object is a structured mapping of named **component slots**. This Profile defines the following component slots, each corresponding to a Core Object Model component:

| Slot | Component | Presence |
|------|-----------|----------|
| `type` | Type | REQUIRED |
| `identity` | Identity | REQUIRED |
| `integrity` | Integrity | REQUIRED |
| `content` | Content | REQUIRED when the object's Type defines Content; otherwise OMITTED |
| `metadata` | Metadata | OPTIONAL |
| `capabilities` | Capabilities | OPTIONAL |
| `extensions` | Extensions | OPTIONAL |

A conforming Representation:

- MUST contain exactly one `type` slot, one `identity` slot, and one `integrity` slot;
- MUST contain a `content` slot when the object's Type defines Content, and MUST omit it otherwise;
- MUST contain at most one of each defined slot;
- MUST NOT contain a component slot not defined by this Profile or by a Profile that composes it;
- MUST preserve the semantic meaning of each component as defined by STAS-01 and the object's Type.

The slot names above are structural identifiers at the Representation layer. How each slot name and value is expressed in bytes is defined by the Serialization and Encoding Layer Profiles.

---

# Component Placement

- The `identity` slot MUST carry the object's single Identity and MUST NOT be derived from, or duplicated within, the `metadata` or `content` slots in a way that could be mistaken for the Identity.
- The `content` slot MUST be interpreted according to the object's Type.
- The `metadata` slot MUST NOT carry information required to determine Identity or the object's fundamental meaning; such information belongs in `identity` or `content` respectively.
- The `integrity` slot MUST cover the components within its determinable scope such that a Consumer can evaluate Integrity over the Representation.

---

# Extensions

Extensions are represented in the `extensions` slot and at any extension point declared by the object's Type, consistent with RFC-0013.

- Each Extension MUST be represented so that it can be **independently delimited** and its payload preserved as an opaque octet string by a Consumer that does not understand it.
- A Representation Consumer MUST preserve an Extension it does not understand, MUST NOT reinterpret or restructure its payload, and MUST apply the Extension's Processing Requirement.
- An Extension MUST NOT occupy or redefine a defined component slot.

This satisfies the requirement of RFC-0013 that any Representation mechanism claiming Extension support permit independent delimitation and byte-for-byte preservation of unknown Extension payloads.

---

# Completeness and Projections

A **Complete Representation** of a BDO Object contains every REQUIRED slot and every slot required by the object's Type, sufficient to reconstruct a semantically equivalent BDO Object, as required by RFC-0008.

A **Projection** is an intentionally incomplete Representation. A Projection:

- MUST remain identifiable as incomplete;
- MUST preserve the semantics of the components it retains;
- MUST NOT be presented as a Complete Representation;
- MUST retain the `identity` slot, so that the Projection can still be attributed to its object.

---

# Validation

A Representation Consumer:

- MUST reject a Representation missing a REQUIRED slot or a slot required by the object's Type;
- MUST reject a Representation containing a duplicate defined slot;
- MUST reject a Representation containing a `MUST_UNDERSTAND` Extension it does not understand;
- MUST preserve, and MUST NOT reject solely for the presence of, a `MAY_IGNORE` Extension it does not understand.

Validation at this layer is structural. It does not establish authenticity, ownership, or trust, which are addressed by Integrity, the BDO Profile, and the underlying Bitcoin / Taproot Assets layers.

---

# Relationship to Serialization and Encoding

This Profile defines structure only. A Serialization Layer Profile defines how this structure is ordered and normalized into a Serialized Form; an Encoding Layer Profile defines the byte-level encoding, canonicalization, and media type.

The same conforming Representation MAY be serialized and encoded by different Layer Profiles, provided each preserves this structure and the semantics of every component.

---

# Conformance

An implementation or Representation conforms to this Profile when it satisfies every applicable **MUST** requirement of this Profile, of RFC-0008, and of this Profile's Dependency Closure, for the applicable Conformance Class.

Partial implementation SHALL NOT be described as full conformance.

---

# Compatibility and Versioning

This Profile is an independent version domain under RFC-0015. Its Profile Identifier `urn:stas:profile:bdo-representation` is stable across compatible revisions.

This Profile is at version 0.1.0 and is **Draft**. Adding a new OPTIONAL component slot is a compatible change; changing the presence of a REQUIRED slot, redefining a slot, or altering component semantics is a breaking change and SHALL be expressed as a new incompatible Version.

---

# Security Considerations

A structurally valid Representation is not an authentic or trustworthy one. A Consumer MUST evaluate Integrity and, where applicable, the requirements of the BDO Profile before making trust decisions. Malformed or oversized Representations SHOULD be handled with appropriate resource limits. The security considerations of STAS-01 apply in full.

---

# Privacy Considerations

The `metadata` slot may carry descriptive information that enables correlation or fingerprinting. Producers SHOULD include in a Representation, and especially in a Projection, no more information than the stated purpose requires. The privacy considerations of STAS-01 apply in full.

---

# References

## Normative

- STAS-01 v1.0 — Shared Taproot Assets Standard
- RFC-0008 — Representation
- RFC-0012 — Profiles
- RFC-0013 — Extension Model
- RFC-0015 — Versioning and Compatibility

## Informative

- `urn:stas:profile:bdo` — STAS Profile — Bitcoin Digital Objects (composes this Layer Profile)
- BDO-01 v1.0 — Bitcoin Digital Objects
