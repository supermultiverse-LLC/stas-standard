# RFC-0014 — Storage

- Status: Draft
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This RFC defines **Storage** as the process by which an Encoded Form is preserved across time and later retrieved.

Storage enables persistence and retrieval of encoded information without defining, interpreting, or modifying the semantics of the underlying Logical Object.

This RFC establishes the responsibilities, non-responsibilities, independence requirements, persistence and retrieval concepts, and round-trip expectations of the Storage layer within the STAS architecture.

---

# Motivation

Representation, Serialization, and Encoding prepare information for technical use, and Transport conveys the resulting Encoded Form between technical boundaries.

A separate architectural layer is required to preserve an Encoded Form across time so that it can be retrieved later, potentially by a different process, system, or generation of software.

Where Transport moves information across space, Storage preserves it across time.

Without a distinct Storage layer, persistence behavior may become coupled to object semantics, representation rules, serialization formats, encoding methods, or transport delivery. Storage provides a clear boundary between the preservation of information and its meaning.

---

# Scope

This RFC defines:

- Storage
- Storage Operation
- Stored Artifact
- Store
- Retrieve
- Storage Locator
- Persistence
- Durability
- Retention
- Deletion
- Retrieval Outcomes
- Storage Round-Trip
- Storage Equivalence
- Storage Independence
- Storage Profiles

This RFC does not define:

- Logical Objects
- Representation
- Serialization
- Encoding
- Transport
- Semantic interpretation
- Object Identity
- Specific storage technologies
- Specific database or file systems
- Replication or consensus infrastructures
- Indexing or query languages

---

# Storage

**Storage** is the process of preserving a Stored Artifact so that an equivalent Encoded Form can be retrieved at a later time.

A Storage implementation SHALL operate on an Encoded Form or on a technical envelope containing an Encoded Form.

Storage SHALL:

- preserve the Stored Artifact;
- maintain the boundaries of the Encoded Form;
- preserve and retrieve the artifact according to the applicable Storage Profile;
- expose success, failure, or indeterminate outcomes when those outcomes are available;
- avoid semantic interpretation of the underlying Logical Object.

Storage SHALL NOT:

- define object semantics;
- interpret object semantics;
- alter Representation rules;
- alter Serialization rules;
- alter Encoding rules;
- reconstruct a Logical Object;
- define transport delivery behavior;
- assign or redefine Object Identity;
- imply authenticity, integrity, confidentiality, or authorization unless provided by a separate mechanism.

---

# Storage Operation

A **Storage Operation** is an attempt to store, retrieve, or remove a Stored Artifact.

A Storage Operation MAY be:

- synchronous or asynchronous;
- local or remote;
- direct or intermediated;
- transient or durable;
- single-copy or replicated;
- immediate or eventually consistent.

These operational models do not change the responsibilities of Storage defined by this RFC.

---

# Stored Artifact

A **Stored Artifact** is the technical unit preserved by a Storage Operation.

A Stored Artifact SHALL contain:

- an Encoded Form; or

- a storage-specific envelope that contains an Encoded Form.

A storage-specific envelope MAY include information required for persistence, addressing, indexing, retention, or operational processing.

Storage-envelope information SHALL NOT modify the semantics of the Encoded Form it contains. Removal or modification of a storage envelope SHALL NOT modify the semantics of the Encoded Form it contains.

---

# Store

**Store** is the operation that preserves a Stored Artifact for later retrieval.

A Store operation SHALL:

- preserve the Encoded Form contained in the Stored Artifact;
- make the artifact retrievable through a Storage Locator or another mechanism defined by the applicable Storage Profile, when the operation succeeds;
- expose its outcome when that outcome is available.

A Store operation SHALL NOT require interpretation of the underlying Logical Object.

---

# Retrieve

**Retrieve** is the operation that returns a previously stored artifact.

A Retrieve operation SHALL return an Encoded Form equivalent to the one preserved by the corresponding Store operation, or an outcome indicating why retrieval did not occur.

A Retrieve operation SHALL NOT reinterpret, transform, or re-canonicalize the preserved Encoded Form as part of its core responsibility.

---

# Storage Locator

A **Storage Locator** is technical information used to address a Stored Artifact within a storage system.

A Storage Locator MAY be:

- a key;
- a path;
- a handle;
- a content-derived reference;
- another storage-defined address.

A Storage Locator is a technical address. It SHALL NOT be interpreted as the Identity of the underlying Logical Object unless a separate specification explicitly establishes that relationship.

Different storage systems MAY assign different Storage Locators to equivalent Stored Artifacts.

---

# Persistence

**Persistence** is the property by which a Stored Artifact remains retrievable after the Store operation completes.

A Storage Profile SHALL define the persistence model it provides, including:

- whether persistence is transient or durable;
- the conditions under which a Stored Artifact remains retrievable;
- the observable behavior when persistence cannot be guaranteed.

Persistence SHALL NOT imply semantic validity, authority, or ownership of the underlying Logical Object.

---

# Durability

**Durability** is the degree to which a Stored Artifact survives failure conditions.

Storage does not inherently provide a universal durability guarantee.

A Storage Profile MAY define durability guarantees such as:

- single-copy durability;
- replicated durability within a defined scope;
- durability across defined failure domains;
- best-effort durability.

Any durability guarantee SHALL define its scope, assumptions, and observable failure conditions.

---

# Retention

**Retention** is the policy that determines how long a Stored Artifact is preserved.

A Storage Profile MAY define retention behavior, including:

- minimum or maximum retention periods;
- conditions that trigger expiration;
- behavior when retention expires.

Retention behavior SHALL NOT modify the semantics of a retained Encoded Form.

The expiration or removal of one Stored Artifact SHALL NOT, by itself, invalidate the underlying Logical Object or any other copy of its Encoded Form.

---

# Deletion

**Deletion** is the removal of a Stored Artifact from a storage system.

Deletion of a Stored Artifact removes one technical copy.

Deletion SHALL NOT:

- destroy the Identity of the underlying Logical Object;
- invalidate other copies of the same Encoded Form;
- alter the semantics of any retained copy.

A Storage Profile MAY define whether deletion is logical, physical, reversible, or irreversible, and SHALL define the observable outcome of a deletion request.

---

# Retrieval Outcomes

A Retrieve operation MAY result in:

- successful retrieval;
- not-found;
- expired;
- failed retrieval;
- indeterminate retrieval;
- partial retrieval.

A Storage Profile SHALL define which outcomes it can detect or report.

The absence of a reported failure SHALL NOT be interpreted as proof of semantic validity of the retrieved Encoded Form.

---

# Storage Round-Trip

A lossless Storage implementation SHALL support the following conceptual flow:

```text
Encoded Form
      │
      ▼
Store
      │
      ▼
Stored Artifact
      │
      ▼
Retrieve
      │
      ▼
Encoded Form
```

The Encoded Form recovered by a Retrieve operation SHALL be equivalent to the Encoded Form preserved by the corresponding Store operation.

Storage equivalence does not require identical storage location, envelope information, or internal representation.

---

# Storage Equivalence

Two Storage Operations are storage-equivalent when they preserve and return equivalent Encoded Forms under the requirements of the applicable Storage Profile.

Storage equivalence SHALL NOT require:

- identical storage systems;
- identical Storage Locators;
- identical envelope structure;
- identical durability or replication strategy;
- identical implementation technology.

A Storage Profile MAY define stricter equivalence requirements, including byte-level equality.

---

# Storage Independence

Storage SHALL remain independent of:

- Logical Object semantics;
- Representation structure;
- Serialization rules;
- Encoding rules;
- Transport delivery;
- application business logic;
- implementation language.

Storage MAY depend on technical properties exposed by an Encoding Profile, provided that it does not reinterpret or modify the encoded information.

---

# Relationship to Encoding

Storage preserves an Encoded Form or a technical envelope containing an Encoded Form.

Storage SHALL preserve the encoded information.

Storage SHALL NOT:

- define the Encoding method;
- change the Encoding method;
- decode the Encoded Form as part of its core responsibility;
- infer object semantics from the Encoded Form.

A Storage Profile MAY declare compatibility requirements for one or more Encoding Profiles.

---

# Relationship to Transport

Transport and Storage are separate architectural concerns.

Transport conveys information between technical boundaries. Storage preserves information across time.

A Transport implementation MAY use storage as an implementation detail, and a Storage implementation MAY use transport as an implementation detail, but neither relationship merges their responsibilities.

An Encoded Form retrieved from Storage MAY subsequently be conveyed by Transport, and an Encoded Form delivered by Transport MAY subsequently be preserved by Storage, without either layer redefining the other.

---

# Relationship to Integrity

Storage does not inherently prove that a Stored Artifact is authentic, complete, authorized, or untampered.

A Storage Profile MAY apply integrity mechanisms.

Such mechanisms SHALL be treated as storage-level protections unless they are explicitly linked to the Integrity model defined elsewhere in STAS.

Because Storage preserves the Encoded Form, a retrieved artifact remains independently verifiable under the applicable Integrity model. Successful storage-level integrity verification SHALL NOT, by itself, establish the semantic integrity or authority of the underlying Logical Object.

---

# Relationship to Identity

A Storage Locator addresses a technical copy of a Stored Artifact. It is not the Identity of the underlying Logical Object.

Storing, retrieving, replicating, or deleting a Stored Artifact SHALL NOT assign, alter, or redefine Object Identity.

Whether a content-derived Storage Locator coincides with an Object Identifier SHALL be determined by the applicable Identity rules, not by the Storage layer.

---

# Relationship to Confidentiality

Storage does not inherently provide confidentiality.

A Storage Profile MAY apply encryption or another confidentiality mechanism to a Stored Artifact.

Confidentiality mechanisms SHALL NOT modify the semantics of the Encoded Form.

Storage confidentiality SHALL NOT be interpreted as proof of identity, authority, ownership, or semantic validity.

---

# Relationship to Extensions

A Stored Artifact preserves the Encoded Form in full, including any Extensions embedded within it.

A Storage implementation SHALL preserve an embedded Extension as part of the Encoded Form, including an Extension the implementation does not understand, consistent with the preservation requirements of RFC-0013.

Storage SHALL NOT reinterpret, transform, or re-canonicalize an embedded Extension payload.

---

# Storage Profiles

A separate specification MAY define a **Storage Profile**.

A Storage Profile MAY define:

- a concrete storage technology;
- Storage Locator syntax and semantics;
- persistence and durability guarantees;
- retention and expiration behavior;
- deletion behavior;
- replication and consistency models;
- indexing constraints;
- size constraints;
- retrieval and error reporting;
- compatibility with Encoding Profiles;
- storage-level security controls.

A Storage Profile SHALL preserve the requirements and architectural boundaries defined by this RFC.

---

# Conformance

A Storage implementation conforms to this RFC when it satisfies every applicable **SHALL** requirement defined herein.

A Storage Profile conforms to this RFC when:

- it preserves the Stored Artifact;
- it does not redefine the semantics of the Encoded Form;
- it does not assign or redefine Object Identity;
- it explicitly defines its persistence and durability model;
- it explicitly defines any guarantees it claims;
- it preserves the separation between Storage and other architectural layers.

Failure to satisfy an applicable SHALL requirement constitutes non-conformance.

---

# Security Considerations

Stored information may be exposed to unauthorized access, modification, deletion, corruption, replay of stale copies, or denial of retrieval.

Implementations SHALL NOT assume that successful storage or retrieval establishes authenticity, integrity, confidentiality, authorization, or semantic validity.

A retrieved Encoded Form MAY be stale, tampered, or substituted; verification against the applicable Integrity model remains the responsibility of a separate mechanism.

Storage Profiles SHOULD define how corruption, unauthorized access, resource exhaustion, and retention or deletion failures are handled.

Security mechanisms applied by a Storage Profile SHALL preserve the Encoded Form and SHALL NOT redefine the semantics of the underlying Logical Object.

---

# Privacy Considerations

Storage may retain information for extended periods, increasing exposure risk relative to transient processing.

Stored envelopes, Storage Locators, indexing information, and retention metadata may reveal operational or correlational information even when the Encoded Form is encrypted.

Storage Profiles SHOULD minimize unnecessary retention and unnecessary exposure of locators, indexing, and operational metadata, and SHOULD define retention and deletion behavior consistent with applicable privacy requirements.

Storage implementations SHALL NOT add semantic information to a storage envelope unless required by a separate specification.

---

# Relationship to Existing Specifications

This RFC builds upon:

- RFC-0008 — Representation
- RFC-0009 — Serialization
- RFC-0010 — Encoding
- RFC-0011 — Transport
- RFC-0013 — Extension Model
- ADR-0006 — Information Representation Pipeline

Storage and Transport are sibling concerns operating on the Encoded Form:

```text
Logical Object
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
Encoded Form
      ├───────────────► Transport (across space)
      │
      └───────────────► Storage (across time)
```

Future specifications defining Storage Profiles, Bindings, retrieval, replication, synchronization, or archival preservation SHALL preserve the architectural boundaries established by this RFC.
