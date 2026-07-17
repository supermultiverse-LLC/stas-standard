# STAS-01 — Shared Taproot Assets Standard

Status: Draft
Category: Standards Track
Version: 1.0 (draft)

## Abstract

STAS-01 defines the normative representation of Bitcoin Digital Objects.

This specification establishes the requirements that conforming implementations must follow to represent, identify, exchange, verify, and preserve Bitcoin Digital Objects interoperably, independently of any specific vendor, wallet, platform, or application.

STAS-01 is compiled from the accepted STAS RFCs. Only the text incorporated into this released specification defines conformance. The RFCs remain the source and rationale for each requirement and are listed as normative references.

STAS-01 evolves through the governance and RFC processes defined by the STAS project.

---

## 1. Introduction

### 1.1 Purpose

STAS-01 enables Bitcoin Digital Objects to be created, exchanged, verified, and understood across independent wallets, platforms, and applications without dependence on a specific vendor.

It defines a common object model, a technical information pipeline, a profile mechanism for concrete interoperability, an extension model for additive evolution, and rules for versioning, compatibility, and conformance.

### 1.2 Relationship to Bitcoin Digital Objects

The ecosystem is layered:

```text
Applications
      ▲
Bitcoin Digital Objects   (open ownership category — the conceptual model)
      ▲
STAS-01                   (open interoperability specification — this document)
      ▲
Taproot Assets
      ▲
Bitcoin
```

Bitcoin Digital Objects (BDOs) define the concepts: what an object is, its identity, ownership, verification, capabilities, lifecycle, metadata, and issuers. STAS-01 defines one interoperable representation of those concepts. STAS-01 implements the BDO model; it does not redefine it, and it intentionally does not define ownership semantics, which belong to the BDO layer.

### 1.3 Scope

STAS-01 does not prescribe:

- a particular wallet;
- a specific custody model;
- a marketplace implementation;
- a user interface;
- commercial terms;
- application-specific business logic.

These remain free for implementers, so that vendors may compete on experience while preserving interoperability.

### 1.4 Relationship to the RFCs

Each normative section of this specification consolidates one or more accepted STAS RFCs, identified at the start of the section. Where this specification and an RFC appear to differ, this released specification governs conformance; the RFC governs rationale and any detail not reproduced here.

---

## 2. Terminology and Requirements Language

### 2.1 Requirements Language

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **MAY**, and **OPTIONAL** in this specification are to be interpreted as described in RFC 2119 and RFC 8174, and only when they appear in capital letters.

These key words express requirement levels. They do not by themselves assign responsibility to a party; the applicable Conformance Target and Conformance Class determine to whom a requirement applies.

### 2.2 Terms

- **STAS Object** — the canonical interoperable representation of a Bitcoin Digital Object within the STAS ecosystem.
- **Logical Object** — a STAS Object considered independently of any representation.
- **Type** — the component that defines the semantic category of an object.
- **Identity** — the component that uniquely distinguishes an object.
- **Content** — the primary type-specific information carried by an object.
- **Metadata** — descriptive information about an object.
- **Integrity** — the property of consistency between an object's relevant state and an expected state within a determinable scope.
- **Capabilities** — the component declaring the semantic possibilities associated with an object.
- **Representation** — a structured expression of a Logical Object that preserves its semantics.
- **Serialized Form** — the ordered result of Serialization.
- **Encoded Form** — the result of Encoding, suitable for transport, storage, or processing.
- **Transport** — conveyance of an Encoded Form across technical boundaries.
- **Storage** — preservation of an Encoded Form across time.
- **Profile** — a named, versioned specification that selects, constrains, or combines permitted behavior for a defined interoperability purpose.
- **Extension** — a namespaced, versioned unit of additional information or behavior attached at a defined extension point.
- **Version** — a revision of an artifact within a single version domain.
- **Released Version** — a version of this specification that has completed governance and defines conformance.

---

## 3. Conformance

This section consolidates RFC-0016.

Conformance is never a global property. A Conformance Target conforms to a specific Version, in a specific role, for a specific scope.

- Conformance SHALL be evaluated against a specific Released Version.
- A **Conformance Target** is the entity evaluated: an artifact, an implementation, a Profile, or an Extension. A conformance statement SHALL identify its Conformance Target.
- A **Conformance Class** identifies a role (for example producer, consumer, encoder, decoder, validator, store, retriever). Where more than one is defined, a conformance claim SHALL identify the applicable Conformance Class.
- **Artifact conformance** and **implementation conformance** SHALL be evaluated independently. **Producer conformance** SHALL NOT be inferred from **consumer conformance**, or vice versa.
- A Conformance Target SHALL satisfy every applicable mandatory requirement in its **Conformance Dependency Closure** (its direct and transitive normative dependencies).
- A **Conformance Claim** SHALL identify the Conformance Target, the specification or Profile and its Version, the applicable Conformance Class when defined, and any required optional-feature declarations. A claim SHALL NOT be treated as proof of conformance without validation or trusted evidence.
- Partial implementation SHALL NOT be described as full conformance. Failure to satisfy an applicable mandatory requirement within a scope constitutes non-conformance within that scope.
- Consumer conformance includes the Extension-handling behavior defined in Section 7: correct application of each Extension's Processing Requirement, rejection of an Extension that must be understood but is not, and preservation of an Extension that may be ignored.
- Only a Released Version of this specification defines conformance. Draft material, RFCs under review, and informative documents SHALL NOT be treated as normative solely because they exist.

Conformance to this specification SHALL NOT be interpreted as proof that a Conformance Target is secure, authentic, authorized, or correct in every deployment context.

---

## 4. Core Object Model

This section consolidates RFC-0001 through RFC-0007.

A STAS Object is the canonical interoperable representation of a Bitcoin Digital Object. Every STAS Object is conceptually composed of six logical components:

| Component | Responsibility |
|-----------|----------------|
| Type | Defines the semantic category of the object. |
| Identity | Enables unique identification of the object. |
| Content | Represents the primary information carried by the object. |
| Metadata | Provides descriptive information about the object. |
| Integrity | Allows verification that the object's state is consistent with an expected state. |
| Capabilities | Declares optional semantic possibilities associated with the object. |

These components define the logical architecture of a STAS Object independently of how any component is represented, serialized, encoded, stored, transported, or verified. The model is implementation-, serialization-, transport-, and storage-independent, extensible by design, and interoperable by default.

### 4.1 Type

The Type identifies the semantic class of a STAS Object independently of its serialization or implementation. A conforming STAS Object:

- MUST define exactly one Type;
- MUST expose its Type independently of its serialization format;
- MUST NOT assign conflicting semantic meanings to the same Type;
- SHOULD use stable Type definitions over time;
- MAY introduce additional Types through the extension mechanism of Section 7.

The Type defines what an object represents. It does not define identifiers, metadata, integrity, permissions, serialization, or encoding. Applications SHOULD NOT rely solely on the declared Type when making trust or authorization decisions.

### 4.2 Identity

The Identity uniquely distinguishes one STAS Object from every other, independently of serialization, storage, transport, or implementation. A conforming STAS Object:

- MUST define exactly one Identity;
- MUST have an Identity that uniquely identifies the object within its intended scope;
- MUST NOT reuse the same Identity for different logical objects;
- SHOULD preserve its Identity throughout the lifetime of the object;
- MAY support multiple identifier representations through a Profile or future specification, provided they resolve to the same logical Identity.

Identity defines which object is referenced. It does not define identifier format, encoding, resolution, metadata, integrity, ownership, or permissions. Identity alone does not establish authenticity, ownership, or integrity.

> Note: A Profile representing Bitcoin Digital Objects is expected to strengthen these requirements to global uniqueness and to a MUST-level permanence of Identity, consistent with the BDO Identity model. This strengthening is a Profile-layer obligation and is not imposed on the general core.

### 4.3 Content

Content is the primary type-specific information represented by a STAS Object, interpreted according to the object's Type. A conforming STAS Object:

- MUST define exactly one logical Content component;
- MUST interpret its Content according to the semantics of its Type;
- MUST preserve the distinction between Content and Metadata;
- MUST NOT use Content as a substitute for the object's Identity;
- MUST NOT treat Content as proof of integrity, authenticity, ownership, or authorization;
- SHOULD include in Content only information required to express the object's type-specific meaning or function;
- MAY contain structured, unstructured, or composite Content when permitted by its Type.

Content cannot be interpreted interoperably without understanding the object's Type; implementations MUST NOT interpret Content independently of Type. Content may originate from untrusted sources; implementations MUST NOT assume Content is authentic or safe to execute, render, resolve, or process solely because it is present, and SHOULD validate Content according to its Type before processing.

### 4.4 Metadata

Metadata is descriptive information associated with a STAS Object, supporting presentation, discovery, indexing, categorization, localization, or user experience. A conforming STAS Object:

- MAY include Metadata;
- MUST NOT require Metadata to determine the object's fundamental semantic meaning;
- MUST NOT use Metadata as a substitute for Content;
- MUST NOT use Metadata as proof of identity, integrity, authenticity, ownership, or authorization;
- SHOULD keep Metadata logically independent from Content;
- MAY support multiple Metadata representations through a Profile or future specification.

If removing a piece of information changes what the object fundamentally represents, it belongs in Content; if it only changes how the object is presented, discovered, or organized, it belongs in Metadata. Metadata may originate from untrusted sources; implementations MUST NOT assume Metadata is accurate and MUST NOT use Metadata alone for authorization or trust decisions.

### 4.5 Integrity

Integrity expresses consistency between the relevant state of a STAS Object and an expected state within a determinable scope. A STAS Object:

- MUST define Integrity as a logical component of the object model;
- MUST treat Integrity independently from technical mechanisms;
- MUST preserve the meaning of Integrity across representations;
- MUST allow Integrity to be evaluated within a determinable scope.

Integrity MUST NOT imply authenticity, ownership, authorization, provenance, or trust. Integrity evaluation always operates within a scope, which MAY be the complete object, one or more logical components, a representation, an external resource, or a historical state. An object may possess Integrity while containing incorrect, misleading, or malicious information; consumers remain responsible for evaluating authenticity, authorization, provenance, and policy separately.

### 4.6 Capabilities

Capabilities is the logical component that declares the semantic possibilities associated with a STAS Object, interpreted according to its Type. A STAS Object:

- MUST contain exactly one logical Capabilities component;
- MAY declare zero or more Capabilities;
- MUST interpret its Capabilities according to its Type;
- MUST preserve the semantic meaning of its Capabilities across representations;
- MUST treat Capabilities independently from operation, authorization, and execution mechanisms.

A Capability declares what may be possible. It MUST NOT redefine the object's Type, constitute an executable operation or code, imply authorization, imply current availability, imply implementation support, guarantee successful execution or a particular result, or prove Identity, Integrity, authenticity, ownership, provenance, or trust. The presence of a Capability MUST NOT be interpreted as evidence that an operation is safe, authorized, available, supported, or trustworthy.

---

## 5. Information Pipeline

This section consolidates RFC-0008 through RFC-0011 and RFC-0014.

A Logical Object is prepared for technical use, then moved across space or preserved across time, through the following pipeline. Each layer preserves the semantics expressed by the layer above it and SHALL NOT redefine them.

```text
Logical Object
      ▼
Representation      (§5.1)
      ▼
Serialization  →  Serialized Form   (§5.2)
      ▼
Encoding       →  Encoded Form      (§5.3)
      ▼
      ├──────────► Transport  (across space)  (§5.4)
      └──────────► Storage    (across time)   (§5.5)
```

### 5.1 Representation

A Representation expresses a Logical Object while preserving its semantic meaning. A Representation SHALL preserve the declared Type, every applicable logical component, and semantic meaning, and SHALL NOT create, modify, replace, or reinterpret semantics. A Complete Representation contains all semantic information required to reconstruct a semantically equivalent Logical Object and SHALL support a semantic round-trip. A Logical Object MAY have multiple valid Representations; this specification does not define a single canonical Representation.

### 5.2 Serialization

Serialization transforms a Representation into a Serialized Form. Serialization SHALL preserve the represented information, semantic meaning, and required ordering, and SHALL NOT define or interpret semantics, modify the Representation, perform encoding, or perform transport. A compliant serialization SHALL support a round-trip in which the reconstructed Representation is semantically equivalent to the original.

### 5.3 Encoding

Encoding transforms a Serialized Form into an Encoded Form suitable for storage, transmission, or processing. Encoding SHALL preserve the serialized information and ordering and SHALL NOT define or interpret semantics, modify the Serialized Form, perform transport, or define storage behavior. A lossless Encoding SHALL support decoding that reconstructs the original Serialized Form. Byte-level equality MAY be required by an Encoding Profile but is not required by this specification.

### 5.4 Transport

Transport conveys an Encoded Form, or an envelope containing one, across technical boundaries. Transport SHALL preserve the payload and the boundaries of the Encoded Form and SHALL NOT define or interpret object semantics, alter Representation, Serialization, or Encoding rules, reconstruct a Logical Object, or imply authenticity, integrity, confidentiality, or authorization unless a separate mechanism provides them. Delivery by itself SHALL NOT imply semantic processing, persistence, or authenticity. A Transport Profile defines concrete protocols, delivery guarantees, and ordering, and SHALL preserve these boundaries.

### 5.5 Storage

Storage preserves an Encoded Form, or an envelope containing one, across time and later retrieves it — the sibling concern of Transport. Storage SHALL preserve the stored artifact and the boundaries of the Encoded Form and SHALL NOT reconstruct a Logical Object, redefine Transport delivery, assign or redefine Object Identity, or imply authenticity, integrity, confidentiality, or authorization unless a separate mechanism provides them. A Retrieve operation SHALL return an Encoded Form equivalent to the one stored, or an outcome indicating why retrieval did not occur, and SHALL NOT reinterpret, transform, or re-canonicalize the preserved Encoded Form. A Storage Locator is a technical address, not Object Identity. Deletion or expiry of one stored copy SHALL NOT invalidate the Logical Object or any other copy. A Storage Profile defines concrete storage technologies, persistence, durability, retention, and deletion behavior.

---

## 6. Profiles

This section consolidates RFC-0012.

A Profile is a named, versioned, independently identifiable specification that selects, constrains, or combines permitted behavior of STAS for a defined interoperability purpose, without redefining the semantics of the Core Object Model.

A Profile SHALL have a stable Profile Identifier and an explicit Profile Version, define its scope and purpose, identify every normative STAS specification and Profile on which it depends, state every mandatory requirement and every optional feature it introduces, and define the conditions under which conformance may be claimed. A Profile SHALL NOT redefine the Core Object Model, redefine the semantics of an existing Type, silently weaken an applicable requirement, or merge responsibilities assigned to separate architectural layers.

A Profile MAY strengthen a dependency requirement where the dependency permits further restriction, and SHALL NOT weaken an applicable dependency requirement. A **Layer Profile** constrains one architectural layer (Representation, Serialization, Encoding, Transport, or Storage) and SHALL preserve that layer's responsibilities. A **Composite Profile** combines compatible Profiles and SHALL resolve every optional choice required for interoperability within its purpose. Bindings — mappings of Profile requirements to a specific platform, protocol, or runtime — are out of scope of this specification and are defined separately.

---

## 7. Extension Model

This section consolidates RFC-0013.

An Extension is a namespaced, versioned unit of additional information or behavior attached to a STAS Object at a declared extension point. The root invariant is: **an Extension adds; it never redefines.**

Extension points are declared, not ambient. Type MAY declare or authorize extension points but is not redefined; Content MAY be extended only where the applicable Type or Profile authorizes it; Metadata and Capabilities MAY be extended through declared extension points; Identity and Integrity SHALL NOT expose direct extension points. Any effect of an Extension on Identity or Integrity SHALL be determined solely by the applicable Identity and Integrity rules.

Every Extension SHALL have a stable Extension Identifier within a collision-resistant Extension Namespace with a declared Namespace Authority, an explicit Extension Version, and a declared **Processing Requirement** of `MUST_UNDERSTAND` or `MAY_IGNORE`. The minimum Processing Requirement is set by the Extension definition; it MAY be strengthened by a Profile, instance, or emitter and SHALL NOT be weakened below that minimum. If the Processing Requirement is absent, unparseable, or ambiguous, the processor SHALL treat the Extension as `MUST_UNDERSTAND` (fail-closed).

A processor handles each Extension by its state (recognized / supported / understood) and effective Processing Requirement:

- understood — process it;
- not understood with `MAY_IGNORE` — preserve it byte-for-byte and ignore it semantically;
- not understood with `MUST_UNDERSTAND` — reject the object.

An Extension the processor does not understand SHALL be treated as an opaque octet string, preserved byte-for-byte, and SHALL NOT be reinterpreted, transformed, or re-canonicalized. Every protected Extension SHALL be within the scope of Integrity; unknown is not unverifiable. Any Representation or Serialization mechanism claiming support for STAS Extensions SHALL permit each Extension to be independently delimited and SHALL preserve the exact octet sequence of an unknown Extension payload.

---

## 8. Versioning and Compatibility

This section consolidates RFC-0015.

The ecosystem has distinct, independently versioned **version domains**: this specification, an individual RFC, a Type, an object, each architectural layer, a Profile, an Extension, and an implementation. A change in one domain SHALL NOT be assumed to require a change in another, and every normative cross-reference SHALL identify the applicable version domain explicitly.

A Version SHALL be explicit, identify a stable set of requirements, and distinguish incompatible revisions. Two Versions are **compatible** for a stated purpose when an artifact or implementation conforming to one can be used with the other without violating a mandatory requirement of either. Compatibility SHALL NOT be inferred from a shared identifier, similar version numbers, common technology, partial overlap, or common authorship.

A **Compatible Change** preserves compatibility and MAY clarify requirements, add optional features, add an extension point, or expand guidance. A **Breaking Change** invalidates previously conforming mandatory behavior, changes the meaning of an existing mandatory requirement, converts an optional feature into an unconditional mandatory one, removes a semantic guarantee, changes a layer's responsibilities, or weakens an Integrity, Identity, or security guarantee; a Breaking Change SHALL be expressed as a new incompatible Version. Forward-compatibility behavior SHALL NOT require interpreting unknown information, and unknown information marked as requiring understanding SHALL be rejected rather than ignored. Only a Released Version defines conformance.

---

## 9. Security Considerations

The following consolidates the security considerations of the underlying RFCs.

- The Core Object Model establishes no trust by itself. Type, Content, Metadata, Identity, and Capabilities declarations MUST NOT be treated as evidence of authenticity, ownership, authorization, or safety. Consumers MUST evaluate Integrity, authenticity, authorization, and policy through the applicable mechanisms.
- Content and Metadata may originate from untrusted sources and MUST NOT be assumed authentic or safe to execute, render, or resolve.
- Integrity indicates consistency within a scope only; an object may possess Integrity while carrying malicious information.
- The pipeline layers (Representation, Serialization, Encoding, Transport, Storage) perform no authentication, authorization, or confidentiality by themselves. Successful transport, delivery, storage, or retrieval MUST NOT be interpreted as establishing authenticity, integrity, or semantic validity. A retrieved Encoded Form may be stale, tampered, or substituted; verification remains a separate responsibility.
- Extensions are an attack surface: a `MUST_UNDERSTAND` Extension may force rejection (apply resource limits); an absent or weakened Processing Requirement is mitigated by the fail-closed default, monotonic strengthening, and Integrity protection of the requirement; ignoring an Extension means not interpreting it, never executing it.
- Versioning: a change presented as compatible that weakens an Integrity, Identity, or security guarantee is a Breaking Change; negotiation mechanisms SHOULD resist downgrade attacks.
- Conformance is not a security guarantee.

---

## 10. Privacy Considerations

- Representations, Serialized Forms, and Encoded Forms may reveal the same information as the Logical Object unless a confidentiality mechanism is applied.
- Transport may expose addressing, correlation, routing, timing, and envelope metadata even when the payload is encrypted; Storage may retain such information over time. Profiles SHOULD minimize unnecessary exposure and retention.
- Extensions may carry information enabling fingerprinting; a `MAY_IGNORE` Extension will be preserved and relayed unchanged, so emitters SHOULD NOT place sensitive information in an Extension expecting intermediaries to strip it.
- Version identifiers may enable fingerprinting; implementations SHOULD expose no more version detail than a stated purpose requires.
- Metadata SHOULD minimize unnecessary personal or sensitive information.

---

## 11. References

### 11.1 Normative References — STAS RFCs

- RFC-0001 — Core Object Model
- RFC-0002 — Type
- RFC-0003 — Identity
- RFC-0004 — Content
- RFC-0005 — Metadata
- RFC-0006 — Integrity
- RFC-0007 — Capabilities
- RFC-0008 — Representation
- RFC-0009 — Serialization
- RFC-0010 — Encoding
- RFC-0011 — Transport
- RFC-0012 — Profiles
- RFC-0013 — Extension Model
- RFC-0014 — Storage
- RFC-0015 — Versioning and Compatibility
- RFC-0016 — Conformance

### 11.2 Normative References — External

- RFC 2119 — Key words for use in RFCs to Indicate Requirement Levels
- RFC 8174 — Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words

### 11.3 Informative References

- Bitcoin Digital Objects (BDO) — conceptual ownership model represented by STAS-01
- ADR-0002 — STAS Object Model
- ADR-0003 — Logical and Technical Layer Separation
- ADR-0004 — Integrity, Evidence, and Verification Model
- ADR-0005 — Capability and Execution Separation
- ADR-0006 — Information Representation Pipeline
