# RFC-0017 — BDO Type Vocabulary

- Status: In Review
- Author: STAS Working Group
- Created: 2026-08-16

---

# Abstract

This RFC establishes the normative **BDO Type Vocabulary**: the named Types a
Bitcoin Digital Object may declare, the semantic each name carries, and the
rules for extending the vocabulary.

It formalizes the four Types already deployed in practice — `collectible`,
`ticket`, `membership`, `redeemable` — and adds a fifth: **`certificate`**, an
inert Type for certificates of authenticity.

Until this RFC, no STAS document defined which Types exist: STAS-01 §4.1 and
RFC-0002 define what the Type *component* is, and BDO RFC-0011 (A5, in the
Bitcoin Digital Objects repository) ratified per-Type Content definitions —
but the vocabulary itself lived only in implementations. An amendment that
adds a Type must first give the vocabulary a normative home. This RFC is that
home.

---

# Motivation

The Type declared inside the signed canonical document determines how the
real world treats the object — above all, whether presenting the object
**consumes** it. A ticket is stamped and refused the second time; a
collectible is displayed forever. That distinction was learned in production:
objects minted without a declared Type defaulted to `collectible`, and doors
re-admitted entries that should have been consumed.

Two properties follow:

1. The vocabulary is **semantics, not decoration**. A scanner, a door, or a
   redemption counter acts on the Type name. Two implementations must read
   the same name and reach the same consumption behavior.
2. The vocabulary must be **closed but extensible**: an unknown Type name has
   no agreed behavior, so implementations must be able to reject or degrade
   it deterministically, and new Types must arrive through review — not
   through a string appearing in the wild.

A certificate of authenticity is the immediate motivating extension: an
object whose entire purpose is to be **presented and verified, never
consumed**, and whose primary information is a declaration *about something
else* — the certified item — rather than the object's own media.

---

# The Vocabulary

A BDO Object declares exactly one Type from this vocabulary in its canonical
document. The declaration is covered by the object's Integrity evidence and
by any authorship attestation, so the Type is fixed by the issuer's own
signature and immutable after genesis
(`urn:stas:profile:bdo-taproot-binding`).

| Type | Consumption | Content (per the BDO RFC-0011 A5 pattern) |
|------|-------------|-------------------------------------------|
| `collectible` | **Inert** — never consumed | the media |
| `ticket` | **Consumable** — consumed on admission | the admission entitlement (event, ticket type, validity); media is Metadata |
| `membership` | **Inert** — checked, never consumed | the membership grant (access scope, validity) |
| `redeemable` | **Consumable** — consumed per redemption, up to its declared count | the redeemable promise (what may be redeemed, and how many times) |
| `certificate` | **Inert** — presented and verified, never consumed | the certification statement (see below) |

## Consumption semantics

- A Consumer acting on a **Consumable** Type MAY record a consumption against
  the object according to the Type's semantics (one admission for `ticket`;
  one redemption per declared unit for `redeemable`). What constitutes a
  consumption record is deployment-defined; the Type defines only that
  consumption is meaningful.
- A Consumer MUST NOT consume an **Inert** Type. Presenting a `collectible`,
  `membership`, or `certificate` MUST NOT diminish, invalidate, or mark the
  object.
- A Consumer encountering a Type name outside this vocabulary MUST NOT guess
  its consumption semantics. It SHALL treat the object as **Inert for safety**
  (display-only) or reject it, and SHALL NOT consume it.

## `certificate` — definition

A `certificate` attests a fact about a **subject** — typically the
authenticity, provenance, or condition of a physical or digital item — on the
authority of its issuer.

- **Content** is the certification statement: the identification of the
  certified subject (e.g. the item, its serial or reference) and the issuer's
  declaration about it. Media (an image of the item or of the certificate) is
  Metadata.
- A `certificate` is **Inert**: verification never consumes it. Its lifetime
  follows the claim it makes, not a redemption count.
- The certificate's own trustworthiness is carried the same way as every BDO
  Object's: Integrity fixes *what was declared*; an authorship Attestation
  (`urn:stas:ext:bdo-attestation`, `creator` role) establishes *who declared
  it*. A certificate without a valid attestation is an unattributed claim,
  and a Verifier SHOULD present it as such.
- A `certificate` binds a declaration to a subject; it does not establish
  ownership of the subject, and transferring the certificate transfers the
  certificate only. (BDO-01 Trust Model: evidence, not a verdict.)

---

# Extending the Vocabulary

- A new Type SHALL be added only by an RFC amending this vocabulary, stating
  the name, the consumption semantics, and the Content definition.
- A Type name SHALL be lowercase, stable, and never reused for different
  semantics. Removing a Type SHALL follow deprecation (RFC-0015); objects
  already declaring it remain valid.
- A Profile MAY restrict which vocabulary Types it supports for its purpose
  (RFC-0012); a Profile SHALL NOT redefine a Type's semantics.

---

# Compatibility

**Backward Compatible.** This RFC names and fixes semantics already deployed
for the four existing Types — no existing object changes meaning — and adds
one new Type. Existing consumers that do not recognize `certificate` already
satisfy the unknown-Type rule by treating it as Inert or rejecting it, both
of which are safe for an Inert Type.

Conformance impact downstream (reference implementation first, then clients):
issuance surfaces and mint APIs that validate the Type name against a closed
list must accept `certificate`; consumption surfaces need no change (Inert).

---

# Relationship to Existing Documents

- STAS-01 §4.1 / RFC-0002 define the Type component; this RFC defines the
  vocabulary of its values for BDO Objects.
- BDO RFC-0011 (Bitcoin Digital Objects repository), decision A5, ratified
  the Content-per-Type definitions this RFC incorporates; `certificate`
  extends that pattern.
- `urn:stas:profile:bdo` requires the Type to identify the object as a BDO
  and to define its Content and Capabilities semantics; a future compatible
  revision of that Profile SHOULD reference this vocabulary once this RFC is
  Accepted.

---

# Security Considerations

The Type drives real-world behavior at consumption points, which is why it
travels inside the signed, genesis-committed document rather than in any
mutable record. The unknown-Type rule (inert-for-safety or reject, never
consume) prevents a fabricated Type name from inducing a consumption an
issuer never authorized. A `certificate` asserts a claim; validating its
attestation establishes who made the claim, never that the claim is true.

---

# References

- STAS-01 v1.0 — §4.1 (Type), §6 (Profiles), §7 (Extension Model)
- RFC-0002 — Type
- RFC-0012 — Profiles
- RFC-0015 — Versioning and Compatibility
- `urn:stas:profile:bdo-taproot-binding` — genesis commitment of the canonical document
- `urn:stas:ext:bdo-attestation` — authorship attestations
- BDO RFC-0011 — Taproot Binding and Canonical Conformance (A5), Bitcoin Digital Objects repository
