# RFC-0013 — Extension Model

- Status: Draft
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This RFC defines the **STAS Extension Model**: the mechanism by which new information or behavior is introduced into a STAS Object through defined extension points, without redefining the Core Object Model and without fragmenting interoperability.

An Extension adds; it never redefines.

This RFC establishes what an Extension is, where Extensions may be attached, how Extensions are identified and versioned, how a processor handles an Extension it does not understand, and how Extensions relate to Integrity, Identity, Representation, Serialization, and Profiles.

---

# Motivation

A standard that cannot evolve either stagnates or fragments into vendor-specific dialects.

STAS requires a disciplined way to add new information and behavior over time while preserving the semantic guarantees of the Core Object Model, the verifiability guarantees of Integrity, and the stability guarantees of Identity.

The Extension Model provides decentralized, additive evolution:

- new information MAY be attached to an Object without changing its Type semantics;
- independent parties MAY define Extensions without coordinating through the Core;
- a processor that does not understand an Extension MAY still verify, preserve, and safely relay the Object;
- an Extension that must be understood cannot be silently ignored.

This complements Profiles. A Profile constrains permitted behavior for interoperability; an Extension introduces new behavior through a defined extension point.

---

# Scope

This RFC defines:

- Extension
- Extension Point
- Extensible Component rules
- Extension Definition
- Extension Reference
- Extension Identifier
- Extension Namespace
- Namespace Authority
- Extension Version
- Processing Requirement
- Processing Requirement Monotonicity
- Fail-Closed Default
- Processor States
- Unknown and Unsupported Extension Handling
- Preservation
- the normative obligation on Representation and Serialization mechanisms that support Extensions

This RFC does not define:

- a concrete Extension for any specific purpose;
- a global Extension registry;
- a canonical Extension Identifier syntax;
- a concrete namespace-authority verification mechanism;
- Type semantics;
- Profile requirements beyond their relationship to Extensions.

---

# Extension

An **Extension** is a named, versioned, and independently identifiable unit of additional information or behavior attached to a STAS Object at a defined extension point.

An Extension SHALL:

- have a stable Extension Identifier;
- belong to a collision-resistant Extension Namespace;
- have an explicit Extension Version;
- declare a Processing Requirement;
- attach only at a permitted extension point;
- have a definition accessible to the parties that rely on it.

An Extension SHALL NOT:

- redefine the Core Object Model;
- redefine the semantics of an existing Type;
- redefine Identity or Integrity semantics;
- weaken an applicable SHALL requirement of any specification in scope;
- require reinterpretation of information the processor is otherwise required to preserve unchanged.

---

# Extension versus Profile

An Extension and a Profile are complementary and distinct.

- A **Profile** selects, constrains, or combines behavior that is already permitted, for a defined interoperability purpose.
- An **Extension** introduces new information or behavior through a defined extension point.

A Profile MAY select, require, forbid, or further constrain Extensions.

Requiring an Extension does not make that Extension part of the STAS Core Object Model.

---

# Root Invariant

An Extension adds; it never redefines.

Every requirement in this RFC derives from this invariant. Any mechanism that would allow an Extension to alter the established meaning of an Object, rather than add to it, is non-conforming.

---

# Extension Point

An **Extension Point** is a location, declared by an applicable specification, Type, or Profile, at which an Extension MAY be attached.

Extension Points SHALL be declared, not ambient. An Extension SHALL NOT be attached where no Extension Point is declared.

A declared Extension Point SHALL define:

- the component it belongs to;
- whether more than one Extension MAY be attached;
- any constraints on the Extensions it accepts.

---

# Extensible Components

The components of the Core Object Model defined in RFC-0001 are governed by the following rules.

- **Type** MAY declare or authorize Extension Points. An Extension SHALL NOT redefine an existing Type. Creating a new Type is an evolution of the type system and is outside the Extension Model.
- **Content** MAY be extended only where the applicable Type or Profile authorizes it. An Extension SHALL NOT arbitrarily alter the primary meaning of the Object interpreted through its Type.
- **Metadata** MAY be extended through declared Extension Points.
- **Capabilities** MAY be extended through declared Extension Points, subject to explicit processing rules, because a Capability Extension can introduce operative behavior affecting authorization, security, or compatibility.
- **Identity** SHALL NOT expose direct Extension Points.
- **Integrity** SHALL NOT expose direct Extension Points.

The prohibition on direct Extension Points for Identity and Integrity does not prevent an Extension from affecting their computed values. Any such effect SHALL be determined solely by the applicable Identity and Integrity rules, not unilaterally by the Extension.

---

# Extension Definition

An **Extension Definition** is the authoritative specification of an Extension.

An Extension Definition SHALL define:

- the Extension Identifier and Namespace;
- the Extension Version scheme;
- the minimum Processing Requirement;
- the extension point or points at which the Extension may attach;
- the meaning and structure of the Extension payload;
- any processing rules required to satisfy the Extension.

An Extension Definition establishes the minimum Processing Requirement for the Extension. This minimum cannot be weakened by a Profile, an instance, or an emitter.

---

# Extension Reference

An Extension attached to an Object is carried as an **Extension Reference** with a canonical technical container comprising:

- the Extension Identifier;
- the Extension Version;
- the Processing Requirement;
- the Extension payload.

The container fields — identifier, version, and Processing Requirement — are structural and MAY be canonicalized according to the applicable Representation or Serialization Profile.

The payload is the Extension-defined information. A processor that does not understand the Extension SHALL treat the payload as an opaque octet string.

---

# Extension Identifier

An **Extension Identifier** uniquely identifies an Extension independently of its version.

An Extension Identifier SHALL:

- be stable;
- be globally distinguishable within its intended interoperability domain;
- identify exactly one Extension Definition;
- remain unchanged across compatible revisions of that Extension.

An Extension Identifier SHALL NOT be reused for an unrelated Extension.

This RFC does not prescribe a specific identifier syntax.

---

# Extension Namespace

Every Extension SHALL belong to an **Extension Namespace** that makes its identifier resistant to collision with independently defined Extensions.

An Extension Namespace SHALL provide:

- globally distinguishable identifiers;
- identifier stability;
- non-reuse of retired identifiers;
- a declared Namespace Authority.

A namespace MAY be expressed using an established mechanism such as a URI, a URN, a controlled DNS domain, a DID, a registered identifier, or a cryptographic identifier.

---

# Namespace Authority

A **Namespace Authority** is the party responsible for assigning identifiers within an Extension Namespace.

An Extension SHALL declare its Namespace Authority.

The Core requires a declared authority and collision resistance. The Core does not universally verify who owns a namespace. Verification of namespace authority, where required, is established by an applicable governance process or registry, not by this RFC.

---

# Extension Version

An **Extension Version** identifies a particular revision of an Extension.

An Extension Version SHALL:

- be explicit;
- be associated with exactly one Extension Identifier;
- identify a stable set of requirements;
- distinguish incompatible revisions;
- support unambiguous processing decisions.

Extension Versioning is distinct from STAS specification versioning, Type versioning, object versioning, and Profile versioning.

---

# Processing Requirement

Every Extension Reference SHALL declare a **Processing Requirement** with one of the following values:

- `MUST_UNDERSTAND` — the Extension must be understood for the Object to be processed;
- `MAY_IGNORE` — the Extension may be safely ignored when it is not understood.

`MAY_IGNORE` means the Extension may be left uninterpreted. It never means the Extension may be removed or altered.

---

# Processing Requirement Monotonicity

The Processing Requirement of an Extension MAY be strengthened toward `MUST_UNDERSTAND` and SHALL NOT be weakened below the minimum established by its Extension Definition.

- The Extension Definition establishes the minimum Processing Requirement.
- A Profile MAY strengthen it.
- An instance or emitter MAY strengthen it for a specific Object.
- No Profile, instance, or emitter SHALL weaken it below the defined minimum.

The Processing Requirement carried in an Extension Reference SHALL be within the scope of Integrity so that its value cannot be altered undetectably.

---

# Fail-Closed Default

If the Processing Requirement of an Extension is absent, unparseable, malformed, or ambiguous, the processor SHALL treat the Extension as `MUST_UNDERSTAND`.

Under ambiguity, the safe outcome is to reject. Ignoring SHALL NOT be assumed to be safe.

---

# Processor States

Relative to a given Extension, a processor is in exactly one of the following states:

- **recognized** — the processor knows the Extension Identifier;
- **supported** — the processor implements the Extension at the applicable Extension Version;
- **understood** — the processor can correctly interpret the concrete instance and satisfy its requirements.

Recognizing an identifier does not imply support for a particular version. Support does not by itself guarantee that a concrete instance is understood.

---

# Unknown and Unsupported Extension Handling

A processor SHALL handle each Extension according to its state and effective Processing Requirement as follows:

- understood — process the Extension according to its semantics;
- recognized but not understood, with `MAY_IGNORE` — preserve the Extension byte-for-byte and ignore it semantically;
- recognized but not understood, with `MUST_UNDERSTAND` — reject the Object;
- unknown, with `MAY_IGNORE` — preserve the Extension byte-for-byte and ignore it semantically;
- unknown, with `MUST_UNDERSTAND` — reject the Object;
- Processing Requirement absent, invalid, or ambiguous — treat as `MUST_UNDERSTAND` and therefore reject the Object unless the Extension is understood.

Rejection is a defined, non-silent outcome.

---

# Preservation

A processor that does not understand an Extension SHALL NOT discard it, alter it, or change its representation.

Preservation applies at two levels.

- The **Extension container** MAY be canonicalized according to the applicable Profile with respect to ordering, framing, and structural fields.
- The **Extension payload** of an Extension the processor does not understand SHALL be treated as an opaque octet string, preserved byte-for-byte, and SHALL NOT be reinterpreted, transformed, or re-canonicalized.

A processor SHALL NOT re-serialize an unknown Extension payload semantically.

---

# Relationship to Integrity

STAS uses a single Integrity scope. This RFC does not introduce a mandatory secondary or dual-hash construction.

An Extension that forms part of the protected Object SHALL be within the scope of Integrity, including its identifier, version, Processing Requirement, and payload.

A processor does not need to understand the semantics of an Extension to verify its integrity. It needs only to preserve and canonicalize the container, and preserve the payload as an opaque octet string, so that its integrity can be verified.

Unknown is not unverifiable. A processor MAY verify that an Extension has not changed without understanding what it means.

A future Profile or advanced integrity construction MAY define additional integrity structure for Extensions, but such structure SHALL NOT be required by this RFC.

---

# Relationship to Identity

An Extension SHALL NOT redefine the Identity semantics of a STAS Object.

Whether adding, removing, or modifying an Extension affects an Object Identifier SHALL be determined by the applicable Identity rules, Type, and Profile.

This RFC does not assume a single identity strategy. Under an assigned-identifier strategy the identifier may remain stable; under a content-derived identity strategy an Extension may legitimately change the identifier. In all cases the governing rules are those of Identity, not those of the Extension.

---

# Relationship to Representation and Serialization

This RFC does not redefine Representation or Serialization. It imposes additional requirements only on mechanisms that claim support for STAS Extensions.

Any Representation or Serialization mechanism claiming support for STAS Extensions SHALL permit each Extension to be independently delimited and SHALL preserve the exact octet sequence of an Extension payload that the processor does not understand.

A processor MAY canonicalize the Extension container according to the applicable Profile, but SHALL NOT reinterpret, transform, or re-canonicalize an unknown Extension payload.

A Representation or Serialization mechanism that cannot satisfy these requirements SHALL NOT claim support for STAS Extensions. A mechanism that does not support Extensions is unaffected by this RFC.

---

# Extension Registration

An Extension exists independently of any registry. Registration does not create an Extension; it facilitates discovery, coordination, collision reduction, and public governance.

An unregistered Extension SHALL still have:

- a stable Extension Identifier;
- a collision-resistant Extension Namespace;
- an explicit Extension Version;
- a definition accessible to the parties that rely on it;
- a declared Processing Requirement.

A concrete public registry is outside the scope of this RFC and belongs to the applicable governance process.

---

# Private Extensions

An Extension MAY be private or organization-specific.

A private Extension SHALL satisfy the same identification, namespace, versioning, and processing requirements as a public Extension when it is carried in an Object that claims STAS compatibility.

Use of a private Extension SHALL NOT be represented as universal STAS interoperability.

---

# Public Extensions

A **Public Extension** is published for use by independent parties.

A Public Extension SHOULD provide:

- stable public documentation;
- a change history;
- a declared Namespace Authority;
- a defined Processing Requirement;
- security and privacy considerations.

Publication alone does not make an Extension part of the STAS standard. An Extension becomes normative only through the applicable STAS governance process.

---

# Relationship to Profiles

A Profile MAY permit, require, forbid, or further constrain Extensions within its scope, as established by RFC-0012.

A Profile MAY strengthen an Extension's Processing Requirement. A Profile SHALL NOT weaken it below the minimum established by the Extension Definition.

A Profile that permits Extensions SHALL define how Extensions are identified, whether unknown Extensions may be ignored, preserved, or rejected, and how Extension conflicts are handled, consistent with this RFC.

---

# Conformance

An Extension conforms to this RFC when it satisfies every applicable **SHALL** requirement defined herein.

A processor conforms to this RFC with respect to Extensions when it:

- determines the effective Processing Requirement, applying the Fail-Closed Default;
- rejects an Object carrying an Extension it must understand but does not;
- preserves byte-for-byte any Extension it may ignore;
- keeps every protected Extension within the scope of Integrity;
- neither reinterprets, transforms, nor re-canonicalizes an unknown Extension payload.

Failure to satisfy an applicable SHALL requirement constitutes non-conformance.

---

# Security Considerations

Extensions are an attack surface.

- An Extension may attempt to introduce semantics that contradict the Object's Type; the Root Invariant and the extensible-component rules prohibit this.
- A `MUST_UNDERSTAND` Extension may be used to force rejection; processors SHOULD apply resource limits when evaluating Extensions.
- A weakened or absent Processing Requirement may attempt to downgrade a critical Extension to `MAY_IGNORE`; monotonicity, the Fail-Closed Default, and Integrity protection of the Processing Requirement mitigate this.
- An Extension payload may carry executable or malicious content; ignoring an Extension SHALL mean not interpreting it, never executing it.

A processor SHALL NOT interpret an Extension it is required only to preserve.

---

# Privacy Considerations

Extensions may carry information that enables fingerprinting or unnecessary disclosure.

An Extension SHOULD minimize unnecessary information exposure.

Preservation of an unknown Extension implies that a processor may relay information it does not understand. Emitters SHOULD consider that a `MAY_IGNORE` Extension will be preserved and relayed unchanged, and SHOULD NOT place sensitive information in an Extension expecting intermediaries to strip it.

---

# Relationship to Existing Specifications

This RFC builds upon:

- RFC-0001 — Core Object Model
- RFC-0002 — Type
- RFC-0003 — Identity
- RFC-0004 — Content
- RFC-0005 — Metadata
- RFC-0006 — Integrity
- RFC-0007 — Capabilities
- RFC-0008 — Representation
- RFC-0009 — Serialization
- RFC-0012 — Profiles

RFC-0008 and RFC-0009 are normative dependencies for the technical preservation and processing of Extensions. This RFC does not redefine Representation or Serialization; it establishes additional requirements for any mechanism in those layers that claims support for Extensions.

Future RFCs defining Extension Namespaces in detail, registries, version negotiation, Bindings, and Storage SHALL preserve the requirements and architectural boundaries established by this RFC.
