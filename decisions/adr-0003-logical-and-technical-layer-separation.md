# ADR-0003 — Logical and Technical Layer Separation

- Status: Accepted
- Date: 2026-07-17

---

# Context

STAS defines a logical object model intended to remain stable across
different implementations, representation formats, storage systems,
transport mechanisms, verification mechanisms, and platform technologies.

The logical meaning of a STAS Object must not depend on any particular
technical realization.

As the standard evolves, different technical mechanisms may be introduced
to represent, verify, transport, store, or bind STAS Objects without changing
the conceptual meaning of the object model.

Without an explicit architectural separation between logical concepts and
technical mechanisms, future specifications could unintentionally couple the
core object model to particular formats, algorithms, protocols, platforms,
or implementation technologies.

Such coupling would reduce interoperability, limit future evolution, and make
the logical architecture dependent on technical decisions that may become
obsolete.

---

# Decision

STAS separates logical concepts from their technical realization.

Logical specifications define what a STAS Object is and what its
components mean.

Technical specifications define how those concepts are represented,
encoded, verified, transported, stored, resolved, or implemented.

The semantics of the STAS Core Object Model MUST remain independent from:

- representation formats;
- serialization formats;
- encoding rules;
- identifier formats;
- integrity mechanisms;
- verification algorithms;
- storage systems;
- transport protocols;
- platform bindings;
- implementation technologies.

Technical specifications MAY define one or more realizations of a logical
concept, provided those realizations preserve the semantics established by
the logical object model.

---

# Architectural Layers

STAS organizes responsibilities into the following conceptual layers:
Logical Object Model
        │
        ▼
Representation
        │
        ▼
Evidence
        │
        ▼
Verification
        │
        ▼
Platform Bindings

## Logical Object Model

Defines the conceptual structure and semantics of a STAS Object.

This layer includes components such as:

- Type;
- Identity;
- Content;
- Metadata;
- Integrity;
- Capabilities.

The Logical Object Model does not prescribe how those concepts are encoded
or implemented.

## Representation

Defines how the logical object model is expressed in a concrete technical
form.

Representation specifications may define structures, schemas,
serialization formats, encoding rules, or canonical forms.

A representation MUST preserve the semantics of the logical object model.

## Evidence

Defines information that may support claims about an object or its
representation.

Evidence may support integrity, authenticity, provenance, inclusion, or
other independently defined properties.

Evidence is not itself the logical property that it supports.

## Verification

Defines processes for evaluating an object, representation, or evidence
against specified requirements.

Verification mechanisms consume defined inputs and produce defined results.

Verification does not redefine the logical semantics of the object.

## Platform Bindings

Define how STAS concepts and technical mechanisms integrate with a particular
platform, protocol, network, or technology.

Platform bindings may include Bitcoin-related mechanisms or other compatible
technical environments.

A platform binding MUST NOT redefine the STAS Core Object Model.

---

# Layer Boundaries

Each layer builds upon concepts defined by the preceding layers without
changing their meaning.

A higher layer:

- MAY add technical constraints appropriate to its responsibility;
- MAY define concrete formats, algorithms, or protocols;
- MUST preserve the semantics of lower layers;
- MUST NOT silently redefine a lower-layer concept;
- MUST NOT make the logical object model dependent on a particular platform.

The same logical STAS Object MAY have multiple technically equivalent
representations.The same logical property MAY be supported by multiple evidence or
verification mechanisms.

The same STAS architecture MAY be integrated through multiple platform
bindings.

---

# Examples

This separation applies throughout STAS.

Examples include:

- Identity is independent of identifier formats.
- Content is independent of serialization formats.
- Metadata is independent of presentation technologies.
- Integrity is independent of hashes, signatures, or proof systems.
- Evidence is distinct from the property that it supports.
- Verification is independent of any single verification algorithm.
- Bitcoin bindings are independent of the logical object model.

A UUID, URI, hash, digital signature, Merkle proof, Bitcoin transaction, or
Taproot Assets proof may participate in a technical realization.

None of those mechanisms independently defines the corresponding logical
concept.

---

# Consequences

## Positive Consequences

This decision:

- preserves the long-term stability of the STAS Core Object Model;
- allows multiple interoperable technical implementations;
- reduces coupling between conceptual and technical specifications;
- allows technologies to evolve without redefining logical semantics;
- supports future representation and verification mechanisms;
- allows Bitcoin-specific integrations without embedding Bitcoin mechanics
  directly into the logical object model;
- makes specification responsibilities easier to identify and review.

## Trade-offs

This separation introduces additional specification layers.

Implementers may need to consult more than one document to understand both a
logical concept and its concrete technical realization.

Specifications must explicitly identify the layer in which their
requirements operate.

The additional architectural discipline is accepted because it improves
clarity, interoperability, and long-term maintainability.

---

# Alternatives Considered

## Define the Core Model Through a Concrete Representation

STAS could define the object model directly through a particular schema or
serialization format.

This approach was rejected because it would make logical semantics dependent
on a specific representation technology.

## Define Integrity Through a Specific Cryptographic Mechanism

STAS could define Integrity directly through hashes, signatures, Merkle
structures, or Bitcoin anchoring.

This approach was rejected because Integrity is a logical property, while
those technologies are possible technical mechanisms for supporting or
verifying that property.

## Make Bitcoin Mechanics Part of the Core Object Model

STAS could place Bitcoin transactions, proofs, or Taproot-specific structures
directly inside the logical model.

This approach was rejected because platform-specific mechanics belong in
platform bindings and must not redefine the abstract object architecture.

---

# Relationship to Existing Decisions

ADR-0002 defines the STAS Object Model as an abstract and
implementation-independent model.

This ADR extends that decision by defining the architectural separation
between the logical object model and its technical realization.

Future RFCs and ADRs must preserve this separation.

---

# Status

Accepted.