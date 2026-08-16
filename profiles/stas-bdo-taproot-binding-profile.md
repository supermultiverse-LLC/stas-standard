# STAS Binding Profile — Bitcoin Digital Objects on Taproot Assets

- Status: Draft
- Profile Identifier: `urn:stas:profile:bdo-taproot-binding`
- Profile Version: 0.2.0
- Category: Binding (RFC-0012 §Relationship to Bindings), defined with the identification, versioning, and conformance apparatus of a Profile
- Author: STAS Working Group
- Created: 2026-07-25

---

# Abstract

This Binding Profile maps the STAS Object model, as constrained by the composite **STAS Profile — Bitcoin Digital Objects** (`urn:stas:profile:bdo`), onto the **Taproot Assets protocol**.

It defines how a BDO Object's Identity, Integrity, and ownership are realized by a Taproot Asset: the asset's genesis identifier is the object's Identity; the asset's meta payload carries a commitment to the object's Encoded Form; the Taproot Assets proof chain anchored to Bitcoin is the object's on-chain Integrity evidence; and control of the asset under the Taproot Assets protocol is the verifiable basis of ownership.

In RFC-0012 vocabulary this document is a **Binding**: it realizes the requirements of the Profiles it depends on in a specific protocol environment and does not redefine them. It closes the gap identified by BDO RFC-0011 (*Taproot Binding and Canonical Conformance*): without it, independent implementations anchoring BDOs on Taproot Assets have no shared, normative answer to what the Identity is, which bytes Integrity covers, or how the object binds to the chain.

---

# Profile Purpose

The purpose of this Binding Profile is that two independent implementations, given the same Taproot Asset, resolve the **same** BDO Object — the same Identity, the same canonical bytes, the same Integrity verdict — using only the Taproot Assets protocol, Bitcoin, and the published STAS Profiles, with no dependence on any issuer, platform, or private canonicalisation.

---

# Profile Scope

This Binding Profile applies to:

- the binding of a BDO Object's Identity to a Taproot Asset genesis identifier;
- the placement of a commitment to the object's Encoded Form in the Taproot Asset meta payload;
- the Integrity scopes a Verifier evaluates, and the evidence each scope uses;
- the separation of Authenticity attestations from Integrity;
- the preservation of Identity and object bytes across mint and transfer.

This Binding Profile does not apply to:

- the structure, serialization, or encoding of the object itself (the composed Layer Profiles);
- the Taproot Assets protocol's own rules, which it uses but does not define;
- the storage or transport system from which an Encoded Form is retrieved (Storage/Transport layers);
- the concrete format of Authenticity attestations (a separate Extension specification);
- ownership semantics beyond what the Taproot Assets protocol establishes.

Silence in this Binding Profile SHALL NOT be interpreted as a requirement.

---

# Dependencies

This Binding Profile depends normatively on:

- **STAS-01 v1.0** — in particular RFC-0003 (Identity), RFC-0006 (Integrity), RFC-0012 (Profiles), RFC-0013 (Extension Model), RFC-0015 (Versioning), RFC-0016 (Conformance).
- **`urn:stas:profile:bdo` v0.3.0 (or a later compatible revision)** — the composite BDO Profile, together with its pinned Layer Profiles (`bdo-representation` 0.2.0, `bdo-serialization-cbor` 0.2.0, `bdo-encoding-cbor` 0.1.0). The **Encoded Form** referenced throughout this document is the `application/cbor` Encoded Form those Layer Profiles produce.
- **The Taproot Assets protocol** — asset issuance, meta payloads, proofs, and transfers, as defined by its own specification. This is an external normative dependency; this Binding Profile uses its guarantees and does not restate them.
- **Bitcoin** — as the anchoring substrate, via Taproot Assets.

Informative: BDO-01 v1.0; BDO RFC-0011 — Taproot Binding and Canonical Conformance (the motivating alignment).

---

# Conformance Classes

- **Binding Producer** — mints a Taproot Asset bound to a BDO Object under this Binding Profile.
- **Binding Consumer** — resolves a Taproot Asset to its BDO Object.
- **Binding Verifier** — independently verifies the binding: Identity, both Integrity scopes, and, where present, attestations.

A conformance claim SHALL identify the applicable Conformance Class.

---

# Identity Binding

The Identity of a BDO Object bound under this Profile **is the Taproot Asset genesis identifier** (`asset_id`) of the asset that carries it.

- A bound object MUST have exactly one Identity, and that Identity MUST be the genesis identifier of exactly one Taproot Asset.
- The Identity is protocol-derived, not content-derived. It satisfies the strengthened Identity requirements of `urn:stas:profile:bdo` (global uniqueness, lifetime stability, independent verifiability) through the guarantees of the Taproot Assets protocol: the genesis identifier is unique to its genesis and is preserved across transfers.
- A Consumer MUST NOT derive Identity from Metadata, Content, a storage locator, or any platform identifier. Such values MAY describe or locate the object; they are not the Identity.
- Ownership changes, storage relocation, and re-encoding MUST NOT change the Identity.

---

# Commitment Binding

The Taproot Asset's **meta payload** binds the asset to the object's canonical bytes.

## Meta Binding Modes

The **Meta Commitment** is the SHA-256 digest of the object's Encoded Form. Every bound
asset's meta payload MUST bind the object's canonical bytes in exactly one of two modes:

- **Inline Mode.** The meta payload octets ARE the Encoded Form; the Meta Commitment is
  derivable from them by any party. Because the Taproot Assets protocol reveals the meta
  payload together with the asset's genesis proof material, every party that holds or
  receives the asset obtains the complete document **with the asset itself** — no Storage
  layer and no third party are required to interpret the object.
- **Commitment Mode.** The meta payload carries the Meta Commitment only. The full
  Encoded Form is preserved and retrieved through the Storage layer (RFC-0014).

### Mode selection

- A Producer whose consumers cannot be assumed to reach a Storage layer — in particular
  **sovereign issuance intended to remain fully interpretable from a node alone** —
  SHOULD use Inline Mode, subject to protocol size limits.
- A Producer using Commitment Mode SHALL ensure the Encoded Form is retrievable through
  an identified Storage arrangement for its intended consumers, and SHOULD identify that
  arrangement in its conformance documentation. Commitment Mode is appropriate for large
  objects and for platform-mediated deployments.
- The integrity semantics are equivalent in both modes: in Inline Mode the protocol's
  genesis commitment covers the Encoded Form directly; in Commitment Mode it covers the
  digest, and a consumer verifies a retrieved Form against that digest.

A Binding Producer MUST fix the Encoded Form **before** genesis: the meta payload participates in the derivation of the genesis identifier, so the commitment — and therefore the object's canonical bytes — cannot be altered after mint without producing a different asset.

> Informative — this is the property that makes the binding self-certifying: because the Taproot Assets protocol commits the meta payload into the genesis identifier, the object's **Identity transitively commits to the object's canonical bytes at genesis**. Content-derived identity is not needed; the protocol-derived Identity already fixes the content.

## Retrieval (Commitment Mode)

- A Binding Consumer that retrieves an Encoded Form from storage MUST recompute its SHA-256 digest and compare it to the Meta Commitment **before** interpreting the object, and MUST reject the retrieved bytes on mismatch (fail closed).
- Failure to retrieve an Encoded Form does not invalidate the object or its Identity (Storage, RFC-0014); it only limits what a Consumer can currently evaluate. A degraded presentation (identifier, type, amount) is a valid state — but a Producer that finds this state unacceptable for its consumers should have selected Inline Mode (see Mode selection).

---

# Integrity Binding

Integrity under this Binding Profile is evaluated in two determinable scopes (RFC-0006):

## Object Integrity

Consistency of the object's canonical bytes with the bytes committed at genesis.

- Evidence: the retrieved Encoded Form and the Meta Commitment.
- Evaluation: recompute SHA-256 over the Encoded Form; the result MUST equal the Meta Commitment.
- Two conforming Verifiers given the same Encoded Form and the same asset MUST reach the same verdict.

## Anchor Integrity

Consistency of the asset — and therefore of the committed object — with the Bitcoin chain.

- Evidence: the Taproot Assets proof material for the asset (genesis and applicable transfers), evaluated under the Taproot Assets protocol against Bitcoin.
- Evaluation is defined by the Taproot Assets protocol; this Binding Profile requires that a full verification include it and adds no protocol rules of its own.

A **full verification** under this Binding Profile comprises both scopes. A Binding Verifier MAY report a partial verification (a single scope) but MUST identify it as partial and MUST NOT represent it as full verification.

---

# Authenticity Separation

Integrity is not Authenticity (RFC-0006). This Binding Profile keeps them disjoint:

- An issuer or creator signature over the object is an **attestation**: an Extension (RFC-0013) that references the Meta Commitment or the Identity. It is evidence of *who vouches for* the object.
- An attestation MUST NOT be used as the Object Integrity mechanism, and the absence of an attestation MUST NOT be reported as an Integrity failure.
- An attestation Extension follows the Extension rules of the composed Profiles: independently delimited, byte-preserved when not understood, processed per its Processing Requirement.
- The concrete attestation format is defined by a separate Extension specification, not by this Binding Profile.

---

# Ownership Binding

Ownership of a bound BDO Object is control of the carrying Taproot Asset under the Taproot Assets protocol.

- A transfer of the asset transfers ownership of the object and MUST preserve the Identity and the committed object bytes; a transfer MUST NOT alter, re-commit, or re-canonicalise the object.
- Ownership is verified through Taproot Assets proof material against Bitcoin, satisfying the requirement of `urn:stas:profile:bdo` that ownership be independently verifiable without trusting any single party.
- Being the issuer, or being named in Metadata, confers no ownership authority (inherited from `urn:stas:profile:bdo`).

---

# Requirements Summary

Defined by this Binding Profile:

- Identity = Taproot Asset genesis identifier (Identity Binding);
- Meta Commitment placement and modes (Commitment Binding);
- fail-closed retrieval verification;
- the two Integrity scopes and the definition of full verification;
- Authenticity as attestation Extensions, disjoint from Integrity;
- Identity and byte preservation across mint and transfer.

Inherited from dependencies (not restated): the object structure, deterministic serialization, and encoding (Layer Profiles); the strengthened Identity/Integrity/ownership requirements (`urn:stas:profile:bdo`); Extension processing (RFC-0013); the Taproot Assets protocol's own validity rules.

Outside scope: storage systems, transport, attestation formats, platform APIs.

---

# Taproot Assets Protocol Compatibility

This Binding Profile consumes the Taproot Assets protocol **exactly as specified by its
maintainers** and does not modify, extend, fork, or reinterpret it.

- The Binding uses only protocol-defined primitives — the genesis identifier, the meta
  payload and its commitment into the genesis identifier, proof material, and transfer
  semantics — each with the meaning the protocol gives it.
- The Binding occupies only the space the protocol leaves **application-defined**: the
  octets placed in the meta payload and the object semantics layered above them. It
  SHALL NOT require any deviation from, or extension of, protocol consensus or
  validation rules, and conformance to this Binding SHALL NOT be claimed for an
  implementation that modifies protocol behavior.
- **Transfer-mechanism agnosticism.** The Binding binds Identity to the genesis
  identifier — never to a transaction output, a holding mechanism, or a network path.
  An asset moved by any protocol-supported mechanism, including on-chain transfers and
  Lightning Network channels, retains its Identity and its committed bytes; this
  Binding is unaffected by the transfer mechanism used.
- **Protocol evolution.** A protocol release that preserves the genesis-identifier and
  meta-commitment semantics requires no change to this Binding and is inherited
  automatically. A protocol change to those primitives is a breaking change for this
  Binding and SHALL be addressed as a new incompatible Version (RFC-0015) — never by
  diverging from the protocol.
- **Meta typing.** A Meta Commitment SHOULD be carried with the protocol's opaque meta
  typing. Where a protocol feature requires a structured meta payload, a revision of
  this Binding MAY define a structured carrier for the Meta Commitment; the commitment
  semantics themselves are unchanged by the carrier.

---

# Objects Minted Before This Binding

Taproot Assets carrying BDO-like objects exist whose meta payloads predate this Binding Profile (for example, platform-specific canonicalisations). For such assets:

- a Verifier MAY apply implementation-specific legacy verification, but SHALL NOT claim conformance to this Binding Profile for them;
- a legacy object is not invalidated by this Binding Profile's existence;
- migration guidance (dual verification during a deprecation window, never a hard cut) is given in BDO RFC-0011.

---

# Conformance

An implementation conforms to this Binding Profile when it satisfies every applicable **MUST** requirement of this document and of its Dependency Closure — including `urn:stas:profile:bdo` 0.2.0 with its pinned Layer Profiles — for the applicable Conformance Class.

A conformance claim SHALL identify this Profile Identifier and Version together with the composite Profile version. Partial implementation SHALL NOT be described as full conformance.

---

# Compatibility and Versioning

This Binding Profile is an independent version domain under RFC-0015. Its Profile Identifier `urn:stas:profile:bdo-taproot-binding` is stable across compatible revisions.

This Profile is at version 0.2.0 and is **Draft**. The 0.2.0 revision restructures the
meta binding as two co-equal modes (Inline / Commitment) with explicit mode-selection
guidance — Inline for sovereign, node-only interpretability; Commitment only with an
identified Storage arrangement — replacing 0.1.0's commitment-first wording. Changing
the digest algorithm, the mode semantics, or the Identity binding is a breaking change
and SHALL be expressed as a new incompatible Version. Adding an optional mode is a
compatible change.

---

# Security Considerations

- The binding is only as strong as its weakest evaluated scope: Object Integrity without Anchor Integrity proves bytes but not chain existence; Anchor Integrity without Object Integrity proves an asset but not which object it carries. Full verification requires both.
- A Consumer MUST NOT interpret retrieved bytes before the commitment check; accepting unverified bytes reintroduces exactly the vendor-trust dependency this Binding Profile removes.
- The Meta Commitment binds bytes, not truthfulness: a committed, anchored object may still carry false or malicious information. Authenticity attestations and the Trust Model (BDO-01) address who vouches for the object; conformance here does not.
- The security considerations of STAS-01, the composed Profiles, and the Taproot Assets protocol apply in full.

---

# Privacy Considerations

The genesis identifier, proof material, and ownership history of a Taproot Asset are publicly observable and correlatable. A committed Encoded Form is as public as its storage makes it; Producers SHOULD NOT commit information intended to remain private, and SHOULD apply the data-minimisation guidance of the composed Profiles before genesis, since the commitment is permanent.

---

# References

## Normative

- STAS-01 v1.0 — Shared Taproot Assets Standard (RFC-0003, RFC-0006, RFC-0012, RFC-0013, RFC-0015, RFC-0016)
- `urn:stas:profile:bdo` v0.2.0 — STAS Profile — Bitcoin Digital Objects (and its pinned Layer Profiles)
- The Taproot Assets protocol specification
- FIPS 180-4 — Secure Hash Standard (SHA-256)

## Informative

- BDO-01 v1.0 — Bitcoin Digital Objects
- BDO RFC-0011 — Taproot Binding and Canonical Conformance (`bitcoin-digital-objects`)
