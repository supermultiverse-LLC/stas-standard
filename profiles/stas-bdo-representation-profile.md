# STAS Layer Profile — Bitcoin Digital Objects Representation

- Status: In Review
- Profile Identifier: `urn:stas:profile:bdo-representation`
- Profile Version: 0.2.0
- Layer: Representation (RFC-0008)
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This Layer Profile constrains the **Representation** layer (RFC-0008) for Bitcoin Digital Objects.

It defines the concrete structural organization of a Representation of a BDO Object: which of the Core Object Model components appear, which are required, which are optional, how Extensions attach, and — as of version 0.2.0 — the **content schema of each component slot**: the named fields a slot carries, their value kinds, and their presence rules. It defines structure only; it does not define a serialization format, encoding, or byte layout, which are the responsibility of the Serialization and Encoding Layer Profiles.

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

- The `identity` slot MUST carry the object's single Identity **or the declaration by
  which the carrier derives it** (see the `identity` schema below). When a carrier
  binding derives the Identity from a commitment that covers the Representation's own
  bytes — as the Taproot binding does — the identifier cannot exist inside the
  Representation it depends on; the slot then carries the derivation declaration, and
  the Identity value is established by the binding. Identity MUST NOT be derived from,
  or duplicated within, the `metadata` or `content` slots in a way that could be
  mistaken for the Identity.
- The `content` slot MUST be interpreted according to the object's Type.
- The `metadata` slot MUST NOT carry information required to determine Identity or the object's fundamental meaning; such information belongs in `identity` or `content` respectively.
- The `integrity` slot MUST cover the components within its determinable scope such that a Consumer can evaluate Integrity over the Representation. The Representation's **own** integrity may be established outside it — by the carrier's commitment over its serialized bytes — in which case the slot declares that scheme and carries evidence only for what the Representation references (see the `integrity` schema below).

---

# Component Slot Schemas

This section defines the content of each component slot: its named fields, their value
kinds, and their presence rules. These are the initial (0.2.0) definitions; adding an
optional field is a compatible change.

## Value kinds

Slot content is expressed with five abstract value kinds. Their byte-level encoding is
defined by the Serialization Layer Profile.

| Kind | Meaning |
|---|---|
| `text` | a Unicode string, normalized to **NFC** |
| `octets` | an opaque byte sequence |
| `uint` | an unsigned integer |
| `list` | an ordered sequence of values of a stated kind |
| `map` | named fields (text keys) with stated value kinds |

Rules:

- A field with no value is **absent** — never present as an empty `text`, empty
  `list`, empty `map`, or null.
- Field names are ASCII, lowercase, fixed by this Profile. A Producer MUST NOT invent
  fields; deployment-specific data belongs in Extensions (RFC-0013).
- No field defined by this Profile uses floating-point values.

## `type` — REQUIRED

A single `text` value: one Type name from the **BDO Type Vocabulary** (RFC-0017) —
`collectible`, `ticket`, `membership`, `redeemable`, or `certificate`. The
unknown-Type rule of RFC-0017 applies to consumers.

## `identity` — REQUIRED

A `map` declaring how the object's Identity is derived:

| Field | Kind | Presence | Meaning |
|---|---|---|---|
| `scheme` | `text` | REQUIRED | the registered identity-derivation scheme |

Registered scheme (this profile family): **`taproot-assets-genesis`** — the Identity
is the Taproot Asset genesis identifier of the asset that carries this
Representation, per `urn:stas:profile:bdo-taproot-binding`. A future carrier binding
registers its own scheme literal.

A Verifier MUST check that the declared scheme matches the binding actually carrying
the object, and MUST NOT accept an Identity claimed through any other channel.

> Rationale: under a carrier whose identifier commits to the Representation's own
> serialized bytes, embedding the identifier would be circular. The slot therefore
> fixes *how* Identity derives; the carrier fixes *what* it is. The object still has
> exactly one Identity (RFC-0003); it is protocol-derived, as BDO RFC-0011 ratified.

## `integrity` — REQUIRED

A `map` declaring how Integrity is established and carrying evidence for referenced
resources:

| Field | Kind | Presence | Meaning |
|---|---|---|---|
| `scheme` | `text` | REQUIRED | the integrity scheme for the Representation itself |
| `refs` | `list` of `map` | OPTIONAL | digests binding external resources the Representation references |

Registered scheme (this profile family): **`carrier-commitment`** — the
Representation's own integrity is established by the carrier binding's commitment
over its serialized bytes (for Taproot, the Meta Commitment of
`urn:stas:profile:bdo-taproot-binding`).

Each `refs` entry:

| Field | Kind | Presence | Meaning |
|---|---|---|---|
| `subject` | `text` | REQUIRED | what the digest covers, as a field path (e.g. `metadata.image`, `content.media.0`) |
| `alg` | `text` | REQUIRED | digest algorithm; this version registers `sha-256` |
| `digest` | `octets` | REQUIRED | the digest of the referenced resource's bytes |

A Producer SHOULD include a `refs` entry for every external resource whose bytes
matter to the object (above all its media); a Consumer that retrieves a referenced
resource MUST verify it against its `refs` digest before presenting it as the
object's, and MUST treat a mismatch as a failed retrieval, not as object invalidity.

## `metadata` — OPTIONAL

Descriptive, presentation-facing fields. Descriptive means exactly that: nothing in
this slot determines Identity, ownership, or the object's fundamental meaning.

| Field | Kind | Presence | Meaning |
|---|---|---|---|
| `name` | `text` | REQUIRED when the slot is present | human-readable name |
| `issuer` | `text` | OPTIONAL | issuer's display name — descriptive; authenticity rides Attestations |
| `description` | `text` | OPTIONAL | free-text description |
| `image` | `text` | OPTIONAL | URI of the primary presentation image; its bytes SHOULD be bound via `integrity.refs` |
| `collection` | `text` | OPTIONAL | display name of the grouping the object belongs to |
| `external_url` | `text` | OPTIONAL | absolute http(s) URI to an external page |
| `attributes` | `list` of `map` | OPTIONAL | display traits; each entry `{ trait: text, value: text }`, order preserved |

## `content` — presence per Type (RFC-0017 / BDO RFC-0011 A5)

The substance the object carries, defined per Type. Initial schemas:

**`collectible`** — the media is the Content:

| Field | Kind | Presence |
|---|---|---|
| `media` | `list` of `map` — `{ uri: text, content_type?: text }`, at least one entry | REQUIRED |

For a `collectible`, consumers present `content.media` as the object; a
`metadata.image` entry, if also present, is a preview pointer only. Media bytes
SHOULD be bound via `integrity.refs`.

**`ticket`** — the admission entitlement:

| Field | Kind | Presence |
|---|---|---|
| `event` | `text` | REQUIRED |
| `ticket_type` | `text` | OPTIONAL |
| `valid_from` / `valid_until` | `uint` (Unix seconds) | OPTIONAL |
| `uses` | `uint` | OPTIONAL — admissions granted; absent means 1 |

**`membership`** — the grant:

| Field | Kind | Presence |
|---|---|---|
| `grant` | `text` (access scope) | REQUIRED |
| `valid_from` / `valid_until` | `uint` (Unix seconds) | OPTIONAL |

**`redeemable`** — the promise:

| Field | Kind | Presence |
|---|---|---|
| `promise` | `text` (what may be redeemed) | REQUIRED |
| `redemptions` | `uint` (how many times) | REQUIRED |

**`certificate`** — the certification statement:

| Field | Kind | Presence |
|---|---|---|
| `subject` | `text` (identification of the certified item) | REQUIRED |
| `declaration` | `text` (what the issuer declares about it) | REQUIRED |
| `reference` | `text` (serial or external reference) | OPTIONAL |

## `capabilities` — RESERVED

The Capabilities schema is not defined in this version. A Producer MUST omit the
slot; a future compatible revision defines it (the descriptive /
cryptographically-bound / contract-enforced classification is the anticipated
framing).

## `extensions` — OPTIONAL

Unchanged: Extension items per RFC-0013 and the Extensions section of this Profile.
The Attestation Extension (`urn:stas:ext:bdo-attestation`) is the first registered
occupant.

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

This Profile is at version 0.2.0 and is **Draft**. The 0.2.0 revision adds the
Component Slot Schemas — value kinds, per-slot field definitions, the
identity/integrity derivation declarations (resolving the circularity a
carrier commitment over the Representation's own bytes would otherwise
create), per-Type content schemas, and the reserved `capabilities` slot.
Adding a new OPTIONAL component slot or an OPTIONAL field is a compatible
change; changing the presence of a REQUIRED slot or field, redefining a slot
or field, or altering component semantics is a breaking change and SHALL be
expressed as a new incompatible Version.

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
