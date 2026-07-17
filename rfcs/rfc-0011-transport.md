# RFC-0011 — Transport

- Status: Draft
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This RFC defines **Transport** as the process by which an Encoded Form is conveyed between technical boundaries.

Transport enables movement of encoded information without defining, interpreting, or modifying the semantics of the underlying Logical Object.

This RFC establishes the responsibilities, non-responsibilities, independence requirements, delivery concepts, and round-trip expectations of the Transport layer within the STAS architecture.

---

# Motivation

Representation, Serialization, and Encoding prepare information for technical use.

A separate architectural layer is required to convey the resulting Encoded Form between systems, processes, components, devices, storage boundaries, or execution environments.

Without a distinct Transport layer, delivery behavior may become coupled to object semantics, representation rules, serialization formats, or encoding methods.

Transport provides a clear boundary between the preparation of information and its movement.

---

# Scope

This RFC defines:

- Transport
- Transport Operation
- Transport Source
- Transport Destination
- Transport Payload
- Delivery
- Receipt
- Transport Round-Trip
- Transport Independence
- Transport Profiles

This RFC does not define:

- Logical Objects
- Representation
- Serialization
- Encoding
- Semantic interpretation
- Storage
- Specific network protocols
- Specific messaging systems
- Routing infrastructures
- Authentication protocols
- Encryption mechanisms

---

# Transport

**Transport** is the process of conveying a Transport Payload from a Transport Source toward a Transport Destination.

A Transport implementation SHALL operate on an Encoded Form or on a technical envelope containing an Encoded Form.

Transport SHALL:

- preserve the Transport Payload;
- maintain the boundaries of the Encoded Form;
- convey the payload according to the applicable Transport Profile;
- expose success, failure, or indeterminate delivery outcomes when those outcomes are available;
- avoid semantic interpretation of the underlying Logical Object.

Transport SHALL NOT:

- define object semantics;
- interpret object semantics;
- alter Representation rules;
- alter Serialization rules;
- alter Encoding rules;
- reconstruct a Logical Object;
- define persistent storage behavior;
- imply authenticity, integrity, confidentiality, or authorization unless provided by a separate mechanism.

---

# Transport Operation

A **Transport Operation** is an attempt to convey a Transport Payload from a Transport Source to a Transport Destination.

A Transport Operation MAY be:

- synchronous or asynchronous;
- direct or intermediated;
- local or remote;
- transient or durable;
- unicast, multicast, broadcast, or otherwise distributed;
- connection-oriented or connectionless.

These operational models do not change the responsibilities of Transport defined by this RFC.

---

# Transport Source

A **Transport Source** is the technical boundary from which a Transport Operation originates.

A Transport Source MAY be:

- a process;
- an application;
- a service;
- a device;
- a runtime;
- a queue;
- a gateway;
- another technical component.

A Transport Source does not necessarily identify the creator, owner, issuer, or authority associated with the underlying Logical Object.

---

# Transport Destination

A **Transport Destination** is the technical boundary toward which a Transport Operation is directed.

A Transport Destination MAY be:

- a process;
- an application;
- a service;
- a device;
- a runtime;
- a queue;
- a gateway;
- another technical component.

A Transport Destination does not necessarily identify the final consumer, semantic recipient, owner, or authority associated with the underlying Logical Object.

---

# Transport Payload

A **Transport Payload** is the technical unit conveyed by a Transport Operation.

A Transport Payload SHALL contain:

- an Encoded Form; or
- a transport-specific envelope that contains an Encoded Form.

A transport-specific envelope MAY include information required for delivery, routing, framing, correlation, ordering, or operational processing.

Transport-envelope information SHALL NOT modify the semantics of the Encoded Form it contains.

---

# Transport Envelope

A **Transport Envelope** is transport-specific information associated with a Transport Payload.

A Transport Envelope MAY define:

- source and destination addressing;
- routing information;
- framing boundaries;
- correlation identifiers;
- ordering information;
- delivery preferences;
- expiration information;
- retry information;
- transport-level metadata.

Transport Envelope information is external to the Logical Object unless explicitly incorporated into that object through another STAS-defined process.

Removal or modification of a Transport Envelope SHALL NOT modify the semantics of the Encoded Form it contains.

---

# Delivery

**Delivery** is the arrival of a Transport Payload at a Transport Destination or at an intermediary authorized by the applicable Transport Profile to accept it.

Delivery SHALL NOT, by itself, imply:

- semantic processing;
- successful decoding;
- successful deserialization;
- acceptance by an application;
- authorization by a recipient;
- persistence;
- authenticity;
- integrity;
- confidentiality.

A Transport Profile MAY define more specific delivery states.

---

# Receipt

A **Receipt** is transport-level evidence that a Transport Operation reached a defined state.

A Receipt MAY indicate:

- acceptance by a transport intermediary;
- arrival at a destination boundary;
- rejection;
- expiration;
- failure;
- another transport-defined outcome.

A Receipt SHALL identify the state it represents.

A Receipt SHALL NOT be interpreted as semantic acceptance of the underlying Logical Object unless a separate specification explicitly defines that meaning.

---

# Delivery Outcomes

A Transport Operation MAY result in:

- successful delivery;
- failed delivery;
- indeterminate delivery;
- partial delivery;
- duplicate delivery;
- delayed delivery;
- reordered delivery.

A Transport Profile SHALL define which outcomes it can detect or report.

The absence of a reported failure SHALL NOT be interpreted as proof of successful semantic processing.

---

# Delivery Guarantees

Transport does not inherently provide a universal delivery guarantee.

A Transport Profile MAY define guarantees such as:

- at-most-once delivery;
- at-least-once delivery;
- exactly-once delivery within a defined scope;
- ordered delivery;
- best-effort delivery.

Any guarantee SHALL define its scope, assumptions, and observable failure conditions.

A delivery guarantee SHALL NOT imply semantic idempotency.

---

# Duplicate Delivery

A Transport implementation MAY deliver the same Transport Payload more than once.

Applications that require duplicate suppression or idempotent semantic processing SHALL implement those behaviors outside the core Transport layer unless a Transport Profile explicitly provides them.

Transport-level duplicate detection SHALL NOT require interpretation of the underlying Logical Object.

---

# Ordering

A Transport implementation MAY preserve, alter, or leave undefined the order of multiple Transport Payloads.

When ordering is provided, the applicable Transport Profile SHALL define:

- the scope of the ordering guarantee;
- the unit being ordered;
- the conditions under which ordering may be lost.

Transport ordering SHALL NOT define semantic precedence between Logical Objects.

---

# Fragmentation and Reassembly

A Transport Profile MAY divide a Transport Payload into multiple technical fragments.

When fragmentation is used:

- each fragment SHALL remain associated with the same Transport Payload;
- reassembly SHALL reconstruct the original Transport Payload;
- fragmentation SHALL NOT alter the Encoded Form.

Fragment boundaries have no semantic meaning unless separately defined outside this RFC.

---

# Transport Round-Trip

A lossless Transport implementation SHALL support the following conceptual flow:

```text
Encoded Form
      │
      ▼
Transport Packaging
      │
      ▼
Transport Payload
      │
      ▼
Conveyance
      │
      ▼
Transport Receipt
      │
      ▼
Encoded Form
```

The Encoded Form recovered at the receiving boundary SHALL be equivalent to the Encoded Form supplied at the sending boundary.

Transport equivalence does not require identical routing, timing, framing, fragmentation, or envelope information.

---

# Transport Equivalence

Two Transport Operations are transport-equivalent when they deliver equivalent Encoded Forms to equivalent destination boundaries under the requirements of the applicable Transport Profile.

Transport equivalence SHALL NOT require:

- identical routes;
- identical intermediaries;
- identical timing;
- identical fragmentation;
- identical envelope structure;
- identical protocol implementation.

A Transport Profile MAY define stricter equivalence requirements.

---

# Transport Independence

Transport SHALL remain independent of:

- Logical Object semantics;
- Representation structure;
- Serialization rules;
- Encoding rules;
- application business logic;
- storage implementation;
- implementation language.

Transport MAY depend on technical properties exposed by an Encoding Profile, provided that it does not reinterpret or modify the encoded information.

---

# Relationship to Encoding

Transport operates on an Encoded Form or on a technical envelope containing an Encoded Form.

Transport SHALL preserve the encoded information.

Transport SHALL NOT:

- define the Encoding method;
- change the Encoding method;
- decode the Encoded Form as part of its core responsibility;
- infer object semantics from the Encoded Form.

A Transport Profile MAY declare compatibility requirements for one or more Encoding Profiles.

---

# Relationship to Storage

Transport and Storage are separate architectural concerns.

Transport conveys information between technical boundaries.

Storage preserves information across time.

A Transport implementation MAY use temporary or durable storage as an implementation detail, but such use does not make Storage part of the Transport semantics.

A stored Transport Payload remains subject to the requirements of the applicable Transport Profile.

---

# Relationship to Integrity

Transport does not inherently prove that a Transport Payload is authentic, complete, authorized, or untampered.

A Transport Profile MAY apply integrity mechanisms.

Such mechanisms SHALL be treated as transport-level protections unless they are explicitly linked to the Integrity model defined elsewhere in STAS.

Successful transport-level integrity verification SHALL NOT, by itself, establish the semantic integrity or authority of the underlying Logical Object.

---

# Relationship to Confidentiality

Transport does not inherently provide confidentiality.

A Transport Profile MAY apply encryption or another confidentiality mechanism.

Confidentiality mechanisms SHALL NOT modify the semantics of the Encoded Form.

Transport confidentiality SHALL NOT be interpreted as proof of identity, authority, ownership, or semantic validity.

---

# Relationship to Authentication and Authorization

Transport-level authentication MAY identify or authenticate a technical source, destination, intermediary, session, or connection.

Transport-level authorization MAY control whether a Transport Operation is permitted.

These controls SHALL NOT, by themselves, determine:

- the identity of the Logical Object;
- the authority of the object issuer;
- the validity of object capabilities;
- ownership of the object;
- semantic acceptance of the object.

Those concerns belong to other architectural layers or application policies.

---

# Transport Profiles

A separate specification MAY define a **Transport Profile**.

A Transport Profile MAY define:

- a concrete transport protocol;
- addressing rules;
- routing rules;
- framing rules;
- envelope structure;
- payload-size constraints;
- timeout behavior;
- retry behavior;
- delivery guarantees;
- ordering guarantees;
- fragmentation and reassembly;
- receipts and acknowledgements;
- compatibility with Encoding Profiles;
- transport-level security controls;
- error reporting.

A Transport Profile SHALL preserve the requirements and architectural boundaries defined by this RFC.

---

# Conformance

A Transport implementation conforms to this RFC when it satisfies every applicable **SHALL** requirement defined herein.

A Transport Profile conforms to this RFC when:

- it preserves the Transport Payload;
- it does not redefine the semantics of the Encoded Form;
- it explicitly defines its delivery model;
- it explicitly defines any guarantees it claims;
- it preserves the separation between Transport and other architectural layers.

Failure to satisfy an applicable SHALL requirement constitutes non-conformance.

---

# Security Considerations

Transport crosses technical trust boundaries and may therefore be exposed to interception, modification, replay, duplication, delay, reordering, injection, redirection, or denial of service.

Implementations SHALL NOT assume that successful delivery establishes authenticity, integrity, confidentiality, authorization, or semantic validity.

Transport Profiles SHOULD define how malformed envelopes, unsupported payloads, oversized payloads, replay conditions, and resource-exhaustion risks are handled.

Security mechanisms applied by a Transport Profile SHALL preserve the Encoded Form and SHALL NOT redefine the semantics of the underlying Logical Object.

---

# Privacy Considerations

Transport may expose information through payload size, timing, source and destination addressing, routing, correlation identifiers, envelope metadata, and delivery patterns.

Encryption of the Transport Payload does not necessarily conceal this operational information.

Transport Profiles SHOULD minimize unnecessary exposure of addressing, correlation, routing, and operational metadata.

Transport implementations SHALL NOT add semantic information to a Transport Envelope unless required by a separate specification.

---

# Relationship to Existing Specifications

This RFC builds upon:

- RFC-0008 — Representation
- RFC-0009 — Serialization
- RFC-0010 — Encoding
- ADR-0006 — Information Representation Pipeline

The resulting architectural sequence is:

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
Serialized Form
      │
      ▼
Encoding
      │
      ▼
Encoded Form
      │
      ▼
Transport
      │
      ▼
Receiving Boundary
```

Future specifications defining Transport Profiles, Bindings, Storage, discovery, synchronization, or application-level exchange SHALL preserve the architectural boundaries established by this RFC.
