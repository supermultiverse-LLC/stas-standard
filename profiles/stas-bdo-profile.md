# STAS Profile — Bitcoin Digital Objects

- Status: Draft
- Profile Identifier: `urn:stas:profile:bdo`
- Profile Version: 0.1.0
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This Profile constrains STAS-01 for the interoperable representation of **Bitcoin Digital Objects (BDOs)**, as defined by the BDO-01 conceptual specification.

It selects and strengthens the requirements of the STAS Core Object Model so that a STAS Object faithfully represents a Bitcoin Digital Object, and it identifies the Layer Profiles required to make that representation concretely interoperable.

This Profile is defined under RFC-0012. It preserves the semantics and architectural boundaries of the STAS specifications on which it depends and does not redefine the Core Object Model.

---

# Profile Purpose

The purpose of this Profile is the interoperable representation, exchange, and verification of Bitcoin Digital Objects across independent wallets, platforms, and applications.

This Profile does not define ownership semantics, lifecycle semantics, or verification procedures. Those belong to the BDO conceptual model (BDO-01). This Profile defines how a conforming STAS Object represents an object of that model.

---

# Profile Scope

This Profile applies to:

- constraints on the STAS Core Object Model (Section "Core Object Model Constraints");
- the representation of BDO ownership, issuance, and provenance information;
- the Layer Profiles required for concrete interoperability (declared as dependencies).

This Profile does not apply to:

- the BDO conceptual model itself (defined by BDO-01);
- wallet, custody, marketplace, or application implementations;
- platform bindings;
- concrete cryptographic proof formats, which are the responsibility of the applicable Layer Profiles and Bitcoin / Taproot Assets.

Silence in this Profile SHALL NOT be interpreted as a requirement.

---

# Dependencies

This Profile depends normatively on:

- **STAS-01 v1.0** — the released specification (RFC-0001 through RFC-0016).
- **BDO-01 v1.0** — informative, as the conceptual model this Profile represents.

This Profile is a **Composite Profile** and additionally depends on the following **Layer Profiles**, which are **not yet defined**:

- a **Representation Profile** for Bitcoin Digital Objects;
- a **Serialization Profile** (canonical);
- an **Encoding Profile** (canonical).

Until those Layer Profiles are defined and released, this Profile defines the semantic and Identity constraints of a Bitcoin Digital Object representation but **cannot yet be claimed as a complete interoperability agreement**. A conformance claim of full interoperability under this Profile SHALL identify the specific Layer Profile versions used; while those dependencies are undefined, only the constraints in this document apply.

---

# Conformance Classes

This Profile defines the following Conformance Classes:

- **BDO Producer** — produces STAS Objects representing Bitcoin Digital Objects.
- **BDO Consumer** — accepts and interprets such objects.
- **BDO Verifier** — independently verifies such objects.

An implementation MAY conform to one Conformance Class without conforming to another. A conformance claim SHALL identify the applicable Conformance Class.

---

# Core Object Model Constraints

A STAS Object conforming to this Profile ("a BDO Object") satisfies every requirement of STAS-01 and the following additional constraints. Every constraint below strengthens, and never weakens, the corresponding STAS-01 requirement.

## Type

- A BDO Object MUST declare a Type whose semantics identify it as a Bitcoin Digital Object or a specialization thereof.
- The Type MUST define the semantic meaning of any Content and Capabilities it permits.

## Identity

This Profile strengthens the Identity requirements of STAS-01 §4.2 to match the BDO-01 Identity model. A BDO Object:

- MUST define exactly one Identity;
- MUST have an Identity that is **globally unique**, strengthening the STAS-01 requirement of uniqueness within an intended scope;
- MUST **preserve its Identity throughout the lifetime of the object**, strengthening the STAS-01 SHOULD to a MUST;
- MUST NOT reuse an Identity for a different logical object;
- MUST derive or anchor its Identity such that it is independently verifiable without trusting any issuer, application, or intermediary.

Ownership changes, metadata updates, capability evolution, and representation changes MUST NOT change the Identity.

## Content

- A BDO Object MUST interpret its Content according to its Type.
- Content MUST NOT be used to establish Identity, ownership, integrity, authenticity, or authorization.

## Metadata

- Metadata MAY describe the object, its issuer, and its capabilities.
- A BDO Object MUST NOT rely on Metadata to determine Identity or ownership. A Consumer MUST NOT infer ownership from Metadata.
- Issuer information carried in Metadata is descriptive; it MUST be confirmed through verification rather than trusted on its face.

## Integrity and Verification

- A BDO Object MUST carry Integrity information sufficient for a BDO Verifier to independently confirm authenticity and ownership using only publicly available evidence anchored to Bitcoin.
- Verification MUST NOT require contacting the issuer, a proprietary API, a centralized database, a specific wallet, or a specific application.
- Two conforming Verifiers given the same evidence MUST reach the same verification result.

## Capabilities

- Capabilities MAY be declared and MUST be interpreted according to the object's Type.
- A Capability MUST NOT be interpreted as authorization; who may exercise a Capability is determined by ownership, which this Profile requires to be independently verifiable.

---

# Ownership, Issuance, and Provenance

Ownership, issuance, and provenance are BDO-layer concepts (BDO-01 §4, §8, §10). STAS-01 does not define ownership semantics. This Profile requires that a BDO Object **represent** them such that they are independently verifiable:

- A BDO Object MUST represent its current owner such that ownership can be independently verified and its transfers reconstructed, without trusting any single party.
- A transfer of ownership MUST preserve the object's Identity and MUST be independently verifiable.
- A BDO Object MUST represent its issuer and origin such that authenticity is verifiable independently of the issuer's continued existence.
- Being represented as the issuer MUST NOT, by itself, confer any ownership authority.

The concrete representation of ownership and provenance is the responsibility of the applicable Layer Profiles together with Taproot Assets and Bitcoin.

---

# Extensions within this Profile

This Profile permits STAS Extensions (RFC-0013) at the extension points declared by the applicable Type and Layer Profiles.

- An Extension MUST NOT redefine Identity, Integrity, ownership, or issuance semantics.
- A BDO Consumer MUST apply each Extension's Processing Requirement, rejecting an object carrying a `MUST_UNDERSTAND` Extension it does not understand and preserving a `MAY_IGNORE` Extension byte-for-byte.
- This Profile does not weaken any Extension Processing Requirement and MAY be strengthened by a more specific Profile.

---

# Conformance

An implementation or object conforms to this Profile when it satisfies every applicable **MUST** requirement of this Profile, of STAS-01, and of this Profile's Dependency Closure, for the applicable Conformance Class.

While the Layer Profile dependencies remain undefined, conformance is limited to the semantic, Identity, verification, and ownership-representation constraints stated in this document. A claim of full interoperability conformance SHALL identify the specific Representation, Serialization, and Encoding Profile versions used and is not possible until those Layer Profiles are released.

Partial implementation SHALL NOT be described as full conformance.

---

# Compatibility and Versioning

This Profile is versioned as an independent version domain under RFC-0015. Its Profile Identifier `urn:stas:profile:bdo` is stable across compatible revisions.

This Profile is at version 0.1.0 and is **Draft**: it is expected to change as its Layer Profile dependencies are defined. A future 1.0.0 release will pin those Layer Profiles and constitute a complete, testable interoperability agreement.

A revision of this Profile SHALL classify its changes as compatible or breaking according to RFC-0015 and SHALL NOT weaken an Integrity, Identity, or security guarantee through a change declared compatible.

---

# Security Considerations

This Profile strengthens Identity and requires independent, Bitcoin-anchored verification of authenticity and ownership; it does not itself define cryptographic mechanisms, which are the responsibility of the Layer Profiles and the underlying Bitcoin / Taproot Assets layers.

Conformance to this Profile is not a guarantee that a given deployment is secure. A BDO Consumer MUST independently verify Integrity, authenticity, and ownership, and MUST NOT treat Type, Metadata, or Capability declarations as evidence of any of them. The security considerations of STAS-01 apply in full.

---

# Privacy Considerations

Representing ownership and provenance for independent verification may expose historical and correlational information. Layer Profiles used with this Profile SHOULD minimize unnecessary exposure of ownership history, addressing, and correlational metadata, consistent with the privacy considerations of STAS-01, while preserving the independent verifiability this Profile requires.

---

# References

## Normative

- STAS-01 v1.0 — Shared Taproot Assets Standard
- RFC-0012 — Profiles
- RFC-0003 — Identity
- RFC-0006 — Integrity
- RFC-0013 — Extension Model
- RFC-0015 — Versioning and Compatibility
- RFC-0016 — Conformance

## Informative

- BDO-01 v1.0 — Bitcoin Digital Objects
- `../../bitcoin-digital-objects` — the Bitcoin Digital Objects repository
- BDO ↔ STAS-01 consistency mapping (bitcoin-digital-objects `docs/bdo-stas-mapping.md`)
