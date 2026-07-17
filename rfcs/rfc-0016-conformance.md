# RFC-0016 — Conformance

- Status: Accepted
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This RFC defines the **conformance model** of STAS.

It establishes the normative requirements language used across STAS specifications, what may be a conformance target, how conformance is scoped to a Version and a role, the distinction between artifact and implementation conformance, and the requirements for conformance claims, evidence, and validation.

This RFC does not define conformance for any single layer or Profile. It defines the common model that every STAS specification, Profile, and Extension uses to state and evaluate conformance.

---

# Motivation

A standard is only interoperable if "conforming" means the same thing everywhere.

Each STAS specification already states that an artifact or implementation conforms when it satisfies every applicable **SHALL** requirement. That local statement is necessary but not sufficient: the ecosystem also needs a shared definition of what a requirement is, what conforms, against which Version conformance is measured, what roles conformance applies to, and what a conformance claim may and may not assert.

Without a common conformance model, claims become incomparable, partial implementations are presented as complete, and validation cannot be reasoned about across implementations.

This RFC provides that common model.

---

# Scope

This RFC defines:

- Requirements Language
- Conformance
- Conformance Target
- Conformance Scope
- Normative Requirement
- Mandatory and Optional Requirements
- Conformance Class
- Artifact Conformance
- Implementation Conformance
- Producer and Consumer Conformance
- Conformance Dependency Closure
- Conformance Claim
- Conformance Evidence
- Validation
- Test Suites
- Partial Conformance
- Non-Conformance

This RFC does not define:

- layer-specific conformance requirements;
- Profile-specific conformance classes beyond their relationship to this RFC;
- a certification program;
- a specific test framework;
- governance or accreditation authority.

---

# Requirements Language

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **MAY**, and **OPTIONAL** in STAS specifications are to be interpreted as described in RFC 2119 and RFC 8174, and only when they appear in capital letters.

These key words express requirement levels. They do not, by themselves, assign responsibility to a particular party; the applicable Conformance Target and Conformance Class determine to whom a requirement applies.

A STAS specification SHALL use these key words consistently to express its normative requirements.

---

# Conformance

**Conformance** is the property of a Conformance Target satisfying every applicable mandatory requirement of a specified Version, for a stated role, together with its Conformance Dependency Closure.

Conformance SHALL be evaluated against a specific Version, as required by RFC-0015.

Conformance SHALL be evaluated for a specific Conformance Target and, where a specification defines more than one, a specific Conformance Class.

Conformance is not a global property. An entity conforms to a specific Version, in a specific role, for a specific scope.

---

# Conformance Target

A **Conformance Target** is the entity whose conformance is evaluated.

A Conformance Target MAY be:

- an artifact;
- an implementation;
- a Profile;
- an Extension.

A conformance statement SHALL identify its Conformance Target. A requirement applicable to one Conformance Target SHALL NOT be assumed to apply to another.

---

# Conformance Scope

A **Conformance Scope** identifies exactly what is being evaluated.

A Conformance Scope SHALL identify:

- the Conformance Target;
- the applicable specification or Profile and its Version;
- the applicable Conformance Class, when one is defined;
- the applicable Conformance Dependency Closure.

Silence SHALL NOT be interpreted as a requirement. A requirement outside the stated Conformance Scope SHALL NOT be used to determine conformance within it.

---

# Normative Requirement

A **Normative Requirement** is a requirement expressed with a requirements-language key word that determines conformance.

A specification SHALL express every conformance-determining requirement as a Normative Requirement.

Informative material — examples, motivation, diagrams, and guidance — SHALL NOT determine conformance.

Where informative and normative text appear to conflict, the Normative Requirement governs.

---

# Mandatory and Optional Requirements

A **Mandatory Requirement** SHALL be satisfied for a Conformance Target to conform within its Conformance Scope.

An **Optional Requirement**:

- MAY be satisfied;
- SHALL have defined behavior when implemented;
- SHALL NOT be required for baseline conformance unless the applicable specification states otherwise.

A specification MAY define conditional requirements. Every conditional requirement SHALL define the condition that activates it. An activated conditional requirement is mandatory within its Conformance Scope.

---

# Conformance Class

A **Conformance Class** identifies a distinct role for which conformance is defined.

Examples include:

- producer;
- consumer;
- sender;
- receiver;
- encoder;
- decoder;
- validator;
- holder;
- store;
- retriever.

Each Conformance Class SHALL:

- have a stable name within its specification;
- define its applicable mandatory requirements;
- define its applicable optional requirements;
- define its testable behavior.

A Conformance Target MAY conform to one Conformance Class without conforming to another. A conformance claim SHALL identify the applicable Conformance Class when more than one is defined.

---

# Artifact Conformance

An **artifact** conforms when it satisfies every applicable artifact requirement of its Conformance Scope.

Artifact Conformance SHALL be evaluated independently of implementation conformance.

A conforming artifact does not prove that its producer is fully conforming. A conforming implementation does not guarantee that every artifact it processes is conforming.

---

# Implementation Conformance

An **implementation** conforms when it satisfies every applicable mandatory requirement of its Conformance Scope and its declared Conformance Class.

A conforming implementation MAY provide additional behavior provided that the additional behavior:

- does not violate an applicable requirement;
- does not alter defined semantics;
- does not prevent required interoperability;
- is not misrepresented as specification-defined behavior.

---

# Producer and Consumer Conformance

Where a specification defines exchange between parties, producer conformance and consumer conformance SHALL be evaluated separately.

A producer conforms when every artifact it emits within its Conformance Scope is conforming.

A consumer conforms when it correctly applies the mandatory requirements for the artifacts it accepts, including the required handling of information it does not understand.

Producer conformance SHALL NOT be inferred from consumer conformance, and consumer conformance SHALL NOT be inferred from producer conformance.

---

# Conformance Dependency Closure

The **Conformance Dependency Closure** of a Conformance Target is the complete set of direct and transitive normative dependencies required to evaluate its conformance.

A Conformance Target claiming conformance SHALL satisfy every applicable mandatory requirement in its Conformance Dependency Closure.

A dependency conflict anywhere in the Conformance Dependency Closure invalidates the affected conformance unless the conflict is resolved by an applicable specification.

---

# Conformance Claim

A **Conformance Claim** asserts conformance of a Conformance Target within a Conformance Scope.

A Conformance Claim SHALL identify:

- the Conformance Target;
- the applicable specification or Profile and its Version;
- the applicable Conformance Class, when defined;
- any required optional-feature declarations.

A Conformance Claim SHOULD identify:

- the validation method or test suite used;
- the date or build to which the claim applies;
- known limitations;
- the applicable dependency versions.

A Conformance Claim SHALL NOT imply certification unless issued under a defined certification process. A Conformance Claim SHALL NOT be treated as proof of conformance without validation or trusted evidence.

---

# Conformance Evidence

**Conformance Evidence** is information supporting a Conformance Claim.

Conformance Evidence MAY include validation results, test-suite results, audit records, or reproducible procedures.

Evidence SHALL identify the Conformance Scope it supports.

The absence of detected non-conformance SHALL NOT be treated as proof of conformance unless the evidence covers every applicable mandatory requirement.

---

# Validation

Validation is the process of evaluating a Conformance Target against its Conformance Scope.

Validation MAY include:

- structural validation;
- constraint validation;
- dependency validation;
- round-trip validation;
- interoperability testing;
- negative testing.

Validation SHALL NOT infer semantic authority, authenticity, ownership, or trust unless those properties are explicitly within the validated Conformance Scope.

---

# Test Suites

A specification or Profile MAY define or reference a test suite.

A normative test suite SHALL:

- identify the Version it tests;
- identify the Conformance Classes it covers;
- distinguish mandatory tests from optional tests;
- define expected outcomes;
- avoid requirements not present in the applicable Conformance Scope.

Passing a test suite is evidence of tested conformance but does not establish correctness beyond the test scope.

---

# Partial Conformance

Partial implementation SHALL NOT be described as full conformance.

A Conformance Target that satisfies some but not all applicable mandatory requirements of its Conformance Scope is non-conforming within that scope.

A specification MAY define a narrower Conformance Class whose mandatory requirements a Conformance Target does satisfy; conformance MAY then be claimed against that narrower class, explicitly.

---

# Non-Conformance

Failure to satisfy an applicable mandatory requirement within a Conformance Scope constitutes **Non-Conformance** within that scope.

A non-conforming Conformance Target SHALL NOT be represented as conforming.

Detection of non-conformance in one Conformance Scope does not, by itself, determine conformance in another scope.

---

# Relationship to the Specification and Released Versions

Only a Released Version of the specification defines conformance, as established by RFC-0015.

The per-specification "Conformance" section of each STAS RFC states the local conformance rule for that specification. This RFC defines the common model those local rules share.

Where a local conformance statement and this RFC appear to differ, both apply; this RFC governs the general model, and the local statement governs the specific requirements of its specification.

---

# Relationship to Profiles

RFC-0012 defines Profile Conformance, Artifact Conformance, Conformance Classes, Conformance Claims, Validation, and Profile Test Suites for Profiles.

Those Profile-specific rules specialize this RFC and SHALL preserve its general requirements.

A Profile MAY define its own Conformance Classes and test suites consistent with this RFC.

---

# Relationship to Extensions

RFC-0013 defines how a processor conforms with respect to Extensions, including the required handling of Extensions it does not understand.

Consumer conformance under this RFC includes that Extension-handling behavior: correct application of the Processing Requirement, rejection of an Extension that must be understood but is not, and preservation of an Extension that may be ignored.

---

# Relationship to Versioning

Conformance is always evaluated against a specific Version, as required by RFC-0015.

A conformance claim valid against one Version SHALL NOT be assumed valid against another Version unless the two Versions are declared compatible for the applicable purpose and direction.

---

# Relationship to Integrity, Identity, and Security

Conformance to a specification SHALL NOT be interpreted as proof that a Conformance Target is secure, authentic, authorized, or correct in every deployment context.

Conformance evaluation SHALL NOT weaken an established Integrity or Identity guarantee.

Passing validation SHALL NOT establish the semantic integrity, authority, or ownership of a Logical Object unless those properties are explicitly within the validated Conformance Scope.

---

# Conformance

A specification, Profile, or Extension conforms to this RFC when it:

- expresses its normative requirements using the Requirements Language defined herein;
- defines its Conformance Targets and, where applicable, its Conformance Classes;
- scopes conformance to a specific Version;
- distinguishes mandatory from optional requirements;
- distinguishes normative from informative material;
- states its conformance rule consistent with this model.

Failure to satisfy an applicable **SHALL** requirement constitutes non-conformance.

---

# Security Considerations

Conformance claims can be misused.

- A claim may overstate coverage; evidence SHOULD identify exactly which mandatory requirements were evaluated.
- A conforming implementation may still be insecure in a given deployment; conformance is not a security guarantee.
- Validation tooling is itself an attack surface and SHOULD apply resource limits and reject malformed inputs.

A conformance claim SHALL NOT be relied upon as evidence of authenticity or integrity by itself.

---

# Privacy Considerations

Conformance Evidence and validation records may reveal deployment details, implementation characteristics, or operational information.

Publishers of Conformance Evidence SHOULD disclose no more detail than the stated Conformance Scope requires.

Conformance metadata SHALL NOT be treated as semantic information about a Logical Object unless a separate specification defines that meaning.

---

# Relationship to Existing Specifications

This RFC builds upon:

- RFC-0001 — Core Object Model
- RFC-0012 — Profiles
- RFC-0013 — Extension Model
- RFC-0015 — Versioning and Compatibility

It provides the common conformance model referenced by the "Conformance" section of every STAS specification, including RFC-0008 through RFC-0011 and RFC-0014.

Future RFCs defining certification, accreditation, registries, or governance processes SHALL preserve the conformance model established by this RFC.
