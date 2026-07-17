# RFC-0015 — Versioning and Compatibility

- Status: Accepted
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This RFC defines the **versioning and compatibility model** of STAS.

It establishes the independent version domains within the ecosystem, the meaning of a Version, the distinction between compatible and breaking change, the requirements for backward and forward compatibility, and the way compatibility is evaluated and declared.

This RFC does not version any specific artifact. It defines the rules that every version domain in STAS follows so that the ecosystem can evolve without silently breaking interoperability, verifiability, or implementation independence.

---

# Motivation

An open standard intended to last must evolve. Specifications are clarified, layers gain capabilities, Types are refined, Profiles are revised, and Extensions are introduced.

Without a disciplined versioning and compatibility model, evolution produces silent breakage: an artifact that was valid becomes invalid, an implementation that conformed no longer conforms, or two implementations claiming the same version fail to interoperate.

STAS already separates concerns into independent architectural layers and into Profiles and Extensions, each of which evolves at its own pace. This RFC gives those independently evolving parts a common set of rules for expressing versions and reasoning about compatibility.

---

# Scope

This RFC defines:

- Version Domains
- Version
- Version Identifier
- Compatibility
- Compatible Change
- Breaking Change
- Backward Compatibility
- Forward Compatibility
- Compatibility Evaluation
- Compatibility Declaration
- Specification Versioning
- Released Version
- Deprecation
- Supersession
- Withdrawal

This RFC does not define:

- a specific version-numbering syntax;
- a version-negotiation protocol;
- Profile versioning rules beyond their relationship to this RFC;
- Extension versioning rules beyond their relationship to this RFC;
- Type semantics;
- a governance process;
- implementation release management.

---

# Version Domains

A **Version Domain** is an independently versioned axis of the STAS ecosystem.

The following version domains are distinct:

- the STAS specification;
- an individual STAS RFC;
- a Type;
- an object instance;
- each architectural layer (Representation, Serialization, Encoding, Transport, Storage);
- a Profile;
- an Extension;
- an implementation.

A change in one version domain SHALL NOT be assumed to require a change in another.

Every normative reference between artifacts SHALL identify the applicable version domain explicitly.

A version expressed in one domain SHALL NOT be interpreted as a version in another domain.

---

# Version

A **Version** identifies a particular revision of an artifact within a single version domain.

A Version SHALL:

- be explicit;
- be associated with exactly one versioned artifact;
- identify a stable set of requirements or behavior;
- distinguish incompatible revisions;
- support unambiguous compatibility decisions.

A Version SHALL NOT be reused to denote a different set of requirements for the same artifact.

---

# Version Identifier

A **Version Identifier** expresses a Version in a form that can be compared within its version domain.

A Version Identifier MAY use:

- a numeric version;
- a semantic version;
- a date-based version;
- a content-derived identifier;
- another deterministic scheme.

The selected scheme SHALL define how two Version Identifiers in the same domain are ordered and how compatibility between them is evaluated.

This RFC does not prescribe a single version-numbering syntax.

---

# Compatibility

**Compatibility** is a relationship between two Versions in the same version domain, evaluated for a stated purpose.

Two Versions are **compatible** for a stated purpose when an artifact or implementation conforming to one can be used with the other without violating a mandatory requirement of either Version.

Compatibility SHALL be evaluated relative to:

- the stated purpose;
- the applicable direction of use;
- the relevant feature set;
- the applicable dependency versions;
- the applicable conformance class, when one is defined.

Compatibility SHALL NOT be inferred solely from:

- a shared identifier;
- similar version numbers;
- common implementation technology;
- partial feature overlap;
- common authorship.

---

# Compatible Change

A **Compatible Change** is a change from an earlier Version to a later Version that preserves compatibility for the stated purpose.

A Compatible Change MAY:

- clarify an existing requirement without altering its meaning;
- add an optional feature;
- add a constraint that affects only a newly introduced optional feature;
- add an Extension point;
- expand informative guidance.

A Compatible Change SHALL NOT alter the meaning of an existing mandatory requirement.

---

# Breaking Change

A **Breaking Change** is a change that does not preserve compatibility for the stated purpose.

A change is breaking when it:

- invalidates a previously conforming mandatory behavior;
- changes the meaning of an existing mandatory field, operation, or requirement;
- converts a previously optional or unsupported feature into an unconditional mandatory feature;
- removes or redefines an established semantic guarantee;
- changes the responsibilities of an architectural layer;
- weakens an established Integrity, Identity, or security guarantee.

A Breaking Change SHALL be expressed as a new incompatible Version within its version domain.

A Breaking Change SHALL NOT be published as a compatible revision of an existing Version.

---

# Backward Compatibility

A later Version is **backward compatible** with an earlier Version when every artifact or operation valid under the earlier Version, for the stated purpose, remains valid under the later Version, except where explicitly excluded by the earlier Version.

A backward-compatible revision preserves the ability of the later Version to accept what the earlier Version produced.

A backward-compatible revision SHALL NOT rely on behavior that a conforming earlier producer could not have provided.

---

# Forward Compatibility

An earlier Version is **forward compatible** with a later Version when an artifact or operation produced under the later Version can be handled safely by the earlier Version without misinterpreting unknown information.

Forward-compatibility behavior MAY include:

- ignoring unknown optional information;
- preserving unknown information without interpreting it;
- rejecting unsupported mandatory information;
- negotiating a supported Version.

Forward compatibility SHALL NOT require an implementation to interpret information it does not understand.

Unknown information marked as requiring understanding SHALL be rejected rather than ignored, consistent with the processing requirements defined by RFC-0013.

---

# Compatibility Evaluation

Compatibility SHALL be evaluated between two specific Versions in the same version domain, for a stated purpose and direction of use.

An evaluation SHALL account for:

- the mandatory requirements of both Versions;
- the applicable dependency versions;
- the applicable conformance class, when defined;
- the direction in which artifacts flow.

The absence of a detected incompatibility SHALL NOT be treated as proof of compatibility unless the evaluation covers every applicable mandatory requirement.

---

# Compatibility Declaration

A **Compatibility Declaration** states that two Versions are compatible for a stated purpose.

A Compatibility Declaration SHALL identify:

- the version domain;
- the two Versions;
- the stated purpose;
- the applicable direction of use;
- the applicable conformance class, when defined.

A Compatibility Declaration SHALL NOT imply compatibility for a purpose or direction it does not state.

A Compatibility Declaration SHALL NOT be treated as proof of interoperability without validation or trusted evidence.

---

# Specification Versioning

The STAS specification is itself a version domain.

A specification Version SHALL:

- be explicit;
- identify the normative requirements in force for that Version;
- distinguish incompatible revisions of the specification.

An RFC is a proposal within its own version domain. An RFC does not define conformance until it is incorporated into a Released Version of the specification.

The specification Version is distinct from the numbers assigned to individual RFCs.

---

# Released Version

A **Released Version** is a specification Version that has completed the applicable governance process and defines conformance.

A Released Version SHALL:

- identify the RFCs incorporated into it;
- state the normative requirements in force;
- be identifiable by a stable Version Identifier.

Only a Released Version defines conformance requirements. Draft material, RFCs under review, and informative documents SHALL NOT be treated as normative solely because they exist in the repository.

A change between Released Versions SHALL be classified as compatible or breaking according to this RFC.

---

# Deprecation

A Version MAY be deprecated.

Deprecation indicates that new implementations should prefer another Version.

A deprecation notice SHOULD identify:

- the reason for deprecation;
- the recommended replacement;
- the expected migration path;
- any security or interoperability implications.

Deprecation SHALL NOT retroactively invalidate prior conformance.

---

# Supersession

A Version MAY be superseded by another Version.

A supersession declaration SHALL identify:

- the superseding Version;
- whether compatibility is preserved;
- any migration requirements;
- any behavior that is no longer supported.

Supersession SHALL NOT imply backward compatibility unless explicitly stated.

---

# Withdrawal

A Version MAY be withdrawn when it is unsafe, invalid, incomplete, or no longer maintained.

Withdrawal SHOULD identify the reason and any recommended alternative.

A withdrawn Version remains identifiable for historical interpretation.

Its Version Identifier SHALL NOT be reused for a different set of requirements.

---

# Relationship to Profiles

A Profile is an independent version domain, as established by RFC-0012.

Profile versioning and Profile compatibility are defined by RFC-0012 and SHALL preserve the general requirements of this RFC.

Where RFC-0012 defines more specific Profile compatibility rules, those rules apply to Profiles in addition to, and consistent with, this RFC.

---

# Relationship to Extensions

An Extension is an independent version domain, as established by RFC-0013.

Extension versioning SHALL preserve the general requirements of this RFC.

The forward-compatibility behavior defined here is consistent with Extension processing: an unknown Extension is preserved or rejected according to its Processing Requirement, and is never silently interpreted.

---

# Relationship to Type

A Type is an independent version domain.

A change to Type semantics is versioned within the Type domain and is distinct from a change to the specification, a Profile, or an Extension.

Adding a new Type is a change within the Type domain. It SHALL NOT be treated as a Breaking Change to the specification solely because a new Type exists.

---

# Relationship to Identity and Integrity

Versioning SHALL NOT weaken an established Identity or Integrity guarantee.

A change that would alter how Identity is determined or how Integrity is verified is a Breaking Change unless the applicable Identity or Integrity rules explicitly permit it as compatible.

A Version Identifier is not an Object Identifier. Versioning an artifact SHALL NOT, by itself, assign or alter Object Identity.

---

# Relationship to Conformance

Conformance is always evaluated against a specific Version.

A conformance claim SHALL identify the Version against which it is made.

A conformance claim valid against one Version SHALL NOT be assumed valid against another Version unless the two Versions are declared compatible for the applicable purpose.

---

# Conformance

An artifact, Profile, Extension, or implementation conforms to this RFC when it:

- expresses its Version explicitly within a single version domain;
- classifies changes as compatible or breaking according to this RFC;
- expresses a Breaking Change as a new incompatible Version;
- does not weaken an established Identity, Integrity, or security guarantee through a change declared compatible;
- identifies the Version against which any conformance or compatibility claim is made.

Failure to satisfy an applicable **SHALL** requirement constitutes non-conformance.

---

# Security Considerations

Versioning affects security.

- A downgrade to an earlier Version may reintroduce known weaknesses; implementations SHOULD define whether and how version downgrade is permitted.
- A change presented as compatible that in fact weakens an Integrity, Identity, or security guarantee is a Breaking Change and SHALL be treated as such.
- Version negotiation may be targeted to force use of a weaker Version; negotiation mechanisms SHOULD resist downgrade attacks.

A Version Identifier SHALL NOT be relied upon as evidence of authenticity or integrity by itself.

---

# Privacy Considerations

Version Identifiers exposed by artifacts or implementations may enable fingerprinting or reveal deployment details.

Implementations SHOULD avoid exposing more version detail than a stated purpose requires.

Version metadata SHALL NOT be treated as semantic information about the underlying Logical Object unless a separate specification defines that meaning.

---

# Relationship to Existing Specifications

This RFC builds upon:

- RFC-0001 — Core Object Model
- RFC-0012 — Profiles
- RFC-0013 — Extension Model

It also relates to the architectural layers defined by RFC-0008 through RFC-0011 and RFC-0014, each of which is an independent version domain.

The version domains form a set of independently evolving axes bound by common compatibility rules:

```text
STAS Specification ─┐
RFC                 │
Type                │
Object              │
Representation      │
Serialization       ├── independent version domains,
Encoding            │   common compatibility rules
Transport           │
Storage             │
Profile             │
Extension           │
Implementation ─────┘
```

Future RFCs defining version negotiation, registries, Bindings, or governance processes SHALL preserve the versioning and compatibility requirements established by this RFC.
