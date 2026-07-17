# RFC-0012 — Profiles

- Status: Accepted
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This RFC defines a **Profile** as a named, versioned, and independently identifiable specification that constrains one or more extension points of STAS for a defined interoperability purpose.

Profiles transform the implementation-independent architecture established by STAS into concrete, testable interoperability agreements without redefining the semantics of the Core Object Model.

This RFC establishes the responsibilities, structure, identification, dependency, compatibility, composition, conformance, and lifecycle requirements of STAS Profiles.

---

# Motivation

The STAS Core Object Model and its technical pipeline intentionally avoid prescribing a single representation structure, serialization format, encoding technology, transport protocol, storage system, or platform implementation.

This separation preserves implementation independence and allows STAS Objects to remain durable across technologies.

However, interoperability between independent implementations requires more than abstract architectural compatibility. Implementations must agree on concrete technical choices such as:

- which Representation rules apply;
- which Serialization rules apply;
- which Encoding rules apply;
- which Transport rules apply;
- which optional constraints are required;
- which extension points are supported;
- how conformance is declared and tested.

Profiles provide this agreement.

A Profile selects and constrains permitted choices for a defined purpose while preserving the architectural boundaries and semantic rules established by the STAS RFCs on which it depends.

---

# Scope

This RFC defines:

- Profile
- Profile Identifier
- Profile Version
- Profile Scope
- Profile Requirements
- Profile Dependencies
- Profile Composition
- Profile Compatibility
- Profile Conformance
- Profile Discovery
- Profile Lifecycle

This RFC does not define:

- a concrete Representation Profile;
- a concrete Serialization Profile;
- a concrete Encoding Profile;
- a concrete Transport Profile;
- a concrete Storage Profile;
- a platform binding;
- application business logic;
- object Type semantics;
- implementation-specific APIs;
- a global profile registry.

---

# Profile

A **Profile** is a specification that selects, constrains, or combines permitted behavior defined by one or more STAS specifications.

A Profile SHALL:

- have a stable Profile Identifier;
- have an explicit Profile Version;
- define its scope;
- identify every normative STAS specification on which it depends;
- state every mandatory requirement it introduces;
- state every optional feature it permits;
- preserve the semantics defined by the applicable STAS specifications;
- preserve the architectural boundaries defined by the applicable STAS specifications;
- define the conditions under which an implementation may claim conformance.

A Profile SHALL NOT:

- redefine the Core Object Model;
- redefine the semantics of an existing Type;
- silently weaken an applicable SHALL requirement;
- merge responsibilities assigned to separate architectural layers;
- imply implementation support beyond its declared scope;
- imply compatibility with another Profile unless compatibility is established;
- depend on undocumented behavior.

---

# Profile Purpose

Every Profile SHALL define a specific interoperability purpose.

A Profile purpose MAY include:

- interoperable object exchange;
- deterministic representation;
- deterministic serialization;
- canonical encoding;
- constrained transport;
- archival preservation;
- wallet interoperability;
- marketplace interoperability;
- platform integration;
- constrained-device operation;
- testing or validation.

A Profile SHALL NOT claim general STAS interoperability when its requirements apply only to a narrower purpose.

---

# Profile Scope

A **Profile Scope** identifies the architectural responsibilities governed by a Profile.

A Profile MAY apply to one or more of the following:

- Type constraints;
- Representation;
- Serialization;
- Encoding;
- Transport;
- Storage;
- discovery;
- validation;
- conformance testing;
- extension use.

A Profile SHALL explicitly distinguish:

- requirements it defines;
- requirements inherited from dependencies;
- requirements outside its scope.

Silence SHALL NOT be interpreted as a requirement.

---

# Layer Profiles

A **Layer Profile** constrains one architectural layer.

Examples include:

- Representation Profile;
- Serialization Profile;
- Encoding Profile;
- Transport Profile;
- Storage Profile.

A Layer Profile SHALL preserve the input and output responsibilities of the layer it profiles.

A Layer Profile SHALL NOT redefine the responsibilities of another layer.

For example:

- a Serialization Profile SHALL NOT define object semantics;
- an Encoding Profile SHALL NOT redefine serialization rules;
- a Transport Profile SHALL NOT redefine the Encoded Form;
- a Storage Profile SHALL NOT redefine Transport delivery semantics.

---

# Composite Profiles

A **Composite Profile** combines requirements from multiple Layer Profiles or other compatible Profiles.

A Composite Profile SHALL:

- identify every included Profile;
- identify the exact compatible version or version range of every included Profile;
- define any additional constraints introduced by the composition;
- resolve every optional choice required for interoperability within its stated purpose;
- preserve all applicable requirements of its dependencies.

A Composite Profile SHALL NOT silently override a requirement of an included Profile.

When two included Profiles conflict, the Composite Profile is non-conforming unless the conflict is resolved through a new compatible version of one or more dependencies.

---

# Profile Identifier

A **Profile Identifier** uniquely identifies a Profile independently of its version.

A Profile Identifier SHALL:

- be stable;
- be globally distinguishable within its intended interoperability domain;
- identify one Profile definition;
- remain unchanged across compatible revisions of that Profile.

A Profile Identifier SHALL NOT be reused for an unrelated Profile.

This RFC does not prescribe a specific identifier syntax.

A future specification MAY define a canonical Profile Identifier format.

---

# Profile Version

A **Profile Version** identifies a particular revision of a Profile.

A Profile Version SHALL:

- be explicit;
- be associated with exactly one Profile Identifier;
- identify a stable set of normative requirements;
- distinguish incompatible revisions;
- support unambiguous conformance claims.

A Profile Version MAY use:

- a numeric version;
- a semantic version;
- a date-based version;
- another deterministic versioning scheme.

The selected scheme SHALL define how compatibility is evaluated.

---

# Profile Reference

A **Profile Reference** identifies a Profile and the version requirements applicable to a particular use.

A Profile Reference SHALL include:

- a Profile Identifier;
- an exact version or an explicitly defined version constraint.

A Profile Reference MAY include:

- a human-readable label;
- a location hint;
- an integrity reference;
- a discovery hint.

A location hint SHALL NOT be treated as the Profile Identifier unless the applicable specification explicitly defines it as such.

---

# Profile Requirements

A Profile Requirement is a normative constraint introduced or selected by a Profile.

A Profile SHALL classify every requirement using the normative terms defined by the STAS specification or by an explicitly referenced standards vocabulary.

A Profile Requirement MAY:

- select one permitted option;
- prohibit an otherwise optional option;
- require an optional feature;
- constrain a value range;
- define a canonical technical form;
- define validation behavior;
- define error behavior;
- define interoperability limits.

A Profile Requirement SHALL NOT contradict an applicable requirement in a dependency.

A Profile MAY strengthen a dependency requirement when the dependency permits further restriction.

A Profile SHALL NOT weaken an applicable dependency requirement.

---

# Mandatory and Optional Features

A Profile SHALL distinguish mandatory features from optional features.

A mandatory feature:

- SHALL be implemented to claim full conformance;
- SHALL be testable within the Profile scope.

An optional feature:

- MAY be implemented;
- SHALL have defined behavior when implemented;
- SHALL NOT alter the meaning of mandatory features;
- SHALL NOT be required for baseline interoperability unless the Profile says otherwise.

A Profile MAY define conditional requirements.

Every conditional requirement SHALL define the condition that activates it.

---

# Profile Dependencies

A **Profile Dependency** is a normative specification or Profile required for interpretation, implementation, or conformance.

A Profile SHALL identify:

- each normative STAS RFC on which it depends;
- each normative external specification on which it depends;
- each Profile on which it depends;
- the applicable version or version constraint for each dependency.

A Profile SHALL NOT depend normatively on mutable, unidentified, or unverifiable requirements.

Informative references SHALL be distinguished from normative dependencies.

---

# Dependency Closure

The **Dependency Closure** of a Profile is the complete set of direct and transitive normative dependencies required to interpret that Profile.

A Profile definition SHALL permit its Dependency Closure to be determined.

An implementation claiming conformance SHALL satisfy every applicable requirement in the Dependency Closure.

A dependency conflict anywhere in the Dependency Closure invalidates the affected conformance claim unless the conflict is resolved by an applicable specification.

---

# Profile Composition

Profiles MAY be composed when their requirements are compatible.

Composition SHALL preserve:

- semantic meaning;
- layer separation;
- mandatory dependency requirements;
- declared version constraints;
- conformance boundaries.

Composition SHALL NOT infer compatibility merely because Profiles govern different layers.

Cross-layer assumptions SHALL be declared explicitly.

For example, a Transport Profile that accepts only one Encoded Form SHALL declare its dependency on the applicable Encoding Profile.

---

# Profile Compatibility

Two Profile Versions are **compatible** for a stated purpose when an implementation conforming to one can interoperate with an implementation conforming to the other without violating the mandatory requirements of either Profile Version.

Compatibility SHALL be evaluated relative to:

- the interoperability purpose;
- the applicable direction of exchange;
- the relevant feature set;
- the dependency versions;
- the required conformance class.

Compatibility SHALL NOT be inferred solely from:

- a shared Profile Identifier;
- similar version numbers;
- common implementation technology;
- partial feature overlap;
- common authorship.

---

# Backward Compatibility

A Profile Version is **backward compatible** with an earlier version when every artifact or operation valid under the earlier version remains valid for the same purpose under the later version, except where explicitly excluded by the earlier version.

A backward-compatible revision MAY:

- clarify existing requirements;
- add optional features;
- add constraints that affect only newly introduced optional features;
- expand informative guidance.

A backward-compatible revision SHALL NOT:

- invalidate previously conforming mandatory behavior;
- change the meaning of an existing mandatory field or operation;
- convert a previously optional unsupported feature into an unconditional mandatory feature;
- change layer responsibilities.

---

# Forward Compatibility

A Profile Version MAY define forward-compatibility behavior.

Forward-compatibility rules MAY include:

- ignoring unknown optional information;
- preserving unknown information;
- rejecting unsupported mandatory information;
- negotiating supported Profile Versions;
- using extension namespaces.

Forward compatibility SHALL NOT require an implementation to interpret unknown semantics.

---

# Profile Negotiation

Implementations MAY negotiate Profile support.

Negotiation MAY determine:

- supported Profile Identifiers;
- supported Profile Versions;
- supported optional features;
- preferred compatible Profile;
- failure when no compatible Profile exists.

Profile negotiation is distinct from Profile definition.

A negotiation mechanism SHALL NOT modify the requirements of the negotiated Profile.

This RFC does not define a negotiation protocol.

---

# Profile Discovery

A Profile MAY define how its specification, dependencies, or conformance resources can be discovered.

Discovery information MAY include:

- documentation locations;
- machine-readable descriptors;
- registries;
- catalogs;
- manifests;
- integrity references.

Discovery failure SHALL NOT alter the identity or requirements of an already identified Profile.

A discovery location SHALL NOT be treated as authoritative unless the applicable governance or registry rules establish that authority.

---

# Profile Declaration

A **Profile Declaration** states that an artifact, implementation, endpoint, or operation uses or supports a Profile.

A Profile Declaration SHALL identify:

- the Profile Identifier;
- the applicable Profile Version or version constraint;
- the subject of the declaration.

A Profile Declaration MAY identify:

- a conformance class;
- supported optional features;
- implementation limitations;
- test evidence;
- dependency information.

A Profile Declaration SHALL NOT be treated as proof of conformance without independent validation or trusted evidence.

---

# Conformance Classes

A Profile MAY define multiple **Conformance Classes** for distinct implementation roles.

Examples include:

- producer;
- consumer;
- sender;
- receiver;
- encoder;
- decoder;
- validator;
- holder;
- marketplace;
- wallet.

Each Conformance Class SHALL:

- have a stable name within the Profile;
- define its applicable mandatory requirements;
- define its optional requirements;
- define its testable behavior.

An implementation MAY conform to one Conformance Class without conforming to another.

A conformance claim SHALL identify the applicable Conformance Class when the Profile defines more than one.

---

# Profile Conformance

An implementation conforms to a Profile when it satisfies every applicable mandatory requirement in:

- the Profile;
- its declared Conformance Class;
- its Dependency Closure;
- every mandatory feature activated by its implementation choices.

A conforming implementation MAY implement additional behavior provided that the additional behavior:

- does not violate the Profile;
- does not alter defined semantics;
- does not prevent required interoperability;
- is not misrepresented as Profile-defined behavior.

Partial implementation SHALL NOT be described as full Profile conformance.

---

# Artifact Conformance

An artifact conforms to a Profile when it satisfies every applicable artifact requirement defined by the Profile and its Dependency Closure.

Artifact conformance SHALL be evaluated independently from implementation conformance.

A conforming artifact does not prove that its producer is fully conforming.

A conforming implementation does not guarantee that every artifact it processes is conforming.

---

# Conformance Claims

A **Conformance Claim** asserts conformance to a Profile.

A Conformance Claim SHALL identify:

- the Profile Identifier;
- the Profile Version;
- the applicable Conformance Class, when defined;
- the claiming implementation or artifact;
- any required optional-feature declarations.

A Conformance Claim SHOULD identify:

- the test suite or validation method used;
- the date or build to which the claim applies;
- known limitations;
- applicable dependency versions.

A Conformance Claim SHALL NOT imply certification unless issued under a defined certification process.

---

# Validation

A Profile SHOULD define validation requirements sufficient to evaluate conformance within its scope.

Validation MAY include:

- structural validation;
- constraint validation;
- dependency validation;
- round-trip validation;
- interoperability testing;
- negative testing;
- security-relevant validation.

Validation SHALL NOT infer semantic authority, authenticity, ownership, or trust unless those properties are explicitly within the validated Profile scope.

---

# Profile Test Suites

A Profile MAY define or reference a test suite.

A normative test suite SHALL:

- identify the Profile Version it tests;
- identify the Conformance Classes it covers;
- distinguish mandatory tests from optional tests;
- define expected outcomes;
- avoid requirements not present in the Profile or its Dependency Closure.

Passing a test suite is evidence of tested conformance but does not establish correctness beyond the test scope.

---

# Extensions Within Profiles

A Profile MAY permit extensions.

When extensions are permitted, the Profile SHALL define:

- how extensions are identified;
- whether unknown extensions may be ignored, preserved, or rejected;
- whether extensions may introduce mandatory behavior;
- how extension conflicts are handled;
- how extension semantics are referenced.

An extension SHALL NOT redefine existing Profile semantics.

An extension SHALL NOT weaken mandatory Profile requirements.

---

# Private Profiles

A Profile MAY be private or organization-specific.

A private Profile SHALL satisfy the same architectural and identification requirements as a public Profile when it claims STAS compatibility.

A private Profile MAY define constraints for a closed interoperability domain.

Use of a private Profile SHALL NOT be represented as universal STAS interoperability.

---

# Public Profiles

A **Public Profile** is published for implementation by independent parties.

A Public Profile SHOULD provide:

- stable public documentation;
- a change history;
- normative dependency references;
- testable requirements;
- conformance guidance;
- security and privacy considerations.

Publication alone does not make a Profile part of the STAS standard.

A Profile becomes a normative STAS Profile only through the applicable STAS governance process.

---

# Profile Lifecycle

A Profile Version MAY have one of the following lifecycle states:

- Draft;
- In Review;
- Accepted;
- Deprecated;
- Superseded;
- Withdrawn.

A Profile SHALL identify its lifecycle state.

A lifecycle-state change SHALL NOT silently change the normative requirements of an existing Profile Version.

---

# Deprecation

A Profile Version MAY be deprecated.

Deprecation indicates that new implementations should prefer another Profile Version or Profile.

A deprecation notice SHOULD identify:

- the reason for deprecation;
- the recommended replacement;
- the expected migration path;
- any security or interoperability implications.

Deprecation does not retroactively invalidate prior conformance.

---

# Supersession

A Profile Version MAY be superseded by another Profile Version or Profile.

A supersession declaration SHALL identify:

- the superseding Profile Identifier and Version;
- whether compatibility is preserved;
- any migration requirements;
- any behavior that is no longer supported.

Supersession SHALL NOT imply backward compatibility unless explicitly stated.

---

# Withdrawal

A Profile Version MAY be withdrawn when it is unsafe, invalid, incomplete, or no longer maintained.

Withdrawal SHOULD identify the reason and any recommended alternative.

A withdrawn Profile Version remains identifiable for historical interpretation.

Its Profile Identifier and Version SHALL NOT be reused.

---

# Relationship to Type

Type defines the semantic category and interpretation of a STAS Object.

A Profile MAY constrain which Types are supported for a defined interoperability purpose.

A Profile SHALL NOT redefine the semantics of a Type.

A new or changed Type semantic definition requires the applicable Type or extension process, not merely a Profile.

---

# Relationship to Representation

A Representation Profile MAY define:

- concrete structural organization;
- required fields;
- optional fields;
- projection rules;
- canonical representation requirements;
- validation rules.

A Representation Profile SHALL preserve the semantic meaning defined by the Logical Object and its Type.

---

# Relationship to Serialization

A Serialization Profile MAY define:

- a concrete serialization method;
- ordering rules;
- omission rules;
- normalization rules;
- deserialization behavior;
- round-trip requirements.

A Serialization Profile SHALL operate on a Representation and SHALL preserve represented information.

---

# Relationship to Encoding

An Encoding Profile MAY define:

- a concrete encoding method;
- canonicalization requirements;
- byte-level constraints;
- identifiers or media types;
- decoding behavior;
- validation rules.

An Encoding Profile SHALL preserve the Serialized Form as required by RFC-0010.

---

# Relationship to Transport

A Transport Profile MAY define:

- a concrete transport protocol;
- envelope structure;
- addressing;
- routing;
- delivery guarantees;
- ordering;
- retry behavior;
- acknowledgements;
- transport-level security.

A Transport Profile SHALL preserve the Encoded Form as required by RFC-0011.

---

# Relationship to Bindings

A **Binding** maps STAS concepts or Profile requirements to a particular platform, protocol, runtime, API, or implementation environment.

A Profile defines interoperability constraints.

A Binding defines how those constraints are realized in a specific technical environment.

A Binding MAY depend on one or more Profiles.

A Binding SHALL NOT redefine the semantics or requirements of the Profiles it implements.

Bindings are outside the scope of this RFC and SHOULD be defined separately.

---

# Relationship to Storage

A Storage Profile MAY define requirements for preserving an Encoded Form or another explicitly identified STAS artifact across time.

A Storage Profile MAY define:

- persistence requirements;
- retrieval requirements;
- retention requirements;
- indexing constraints;
- replication constraints;
- durability expectations.

A Storage Profile SHALL NOT redefine object semantics or Transport delivery semantics.

---

# Relationship to Extensions

Profiles are part of the STAS Extension Model.

A Profile constrains permitted choices for interoperability.

An extension introduces new optional semantics or technical behavior through a defined extension point.

A Profile MAY select or require an extension.

Requiring an extension does not make that extension part of the STAS Core Object Model.

---

# Relationship to Versioning

Profile Versioning is distinct from:

- STAS specification versioning;
- Type versioning;
- object versioning;
- Representation versioning;
- implementation versioning.

A change in one version domain does not automatically require a change in another.

Every normative dependency SHALL use the applicable version domain explicitly.

---

# Security Considerations

Profiles can create security risk when they:

- weaken inherited requirements;
- leave critical options unresolved;
- depend on ambiguous specifications;
- combine incompatible security assumptions;
- claim guarantees outside their scope;
- omit validation behavior;
- allow unsafe extension processing.

A Profile SHALL preserve every applicable security requirement in its Dependency Closure.

A Profile SHOULD define security assumptions, trust boundaries, failure behavior, resource limits, and validation requirements relevant to its scope.

Profile conformance SHALL NOT be interpreted as proof that an implementation is secure in every deployment context.

---

# Privacy Considerations

Profiles may constrain what information is represented, serialized, encoded, transported, stored, logged, or exposed.

A Profile SHOULD minimize unnecessary information exposure.

A Profile SHOULD distinguish:

- semantically required information;
- technically required information;
- optional operational information;
- implementation-private information.

A Profile SHALL NOT claim privacy guarantees that are not established by its mandatory requirements and dependencies.

---

# Conformance

A Profile conforms to this RFC when it satisfies every applicable **SHALL** requirement defined herein.

An implementation claiming Profile conformance SHALL satisfy the applicable requirements of:

- this RFC;
- the claimed Profile;
- the claimed Conformance Class;
- the Profile Dependency Closure.

Failure to satisfy an applicable SHALL requirement constitutes non-conformance.

---

# Relationship to Existing Specifications

This RFC builds upon:

- RFC-0001 — Core Object Model
- RFC-0002 — Type
- RFC-0008 — Representation
- RFC-0009 — Serialization
- RFC-0010 — Encoding
- RFC-0011 — Transport
- ADR-0003 — Logical and Technical Layer Separation
- ADR-0006 — Information Representation Pipeline

Profiles provide the transition from the implementation-independent STAS architecture to concrete interoperability agreements:

```text
STAS Core Semantics
        │
        ▼
Representation
        │
        ▼
Serialization
        │
        ▼
Encoding
        │
        ▼
Transport
        │
        ▼
Profiles constrain permitted choices
        │
        ▼
Concrete interoperable implementations
```

Future RFCs defining Bindings, Storage, Extension Namespaces, Version Negotiation, registries, and concrete Profiles SHALL preserve the requirements and architectural boundaries established by this RFC.
