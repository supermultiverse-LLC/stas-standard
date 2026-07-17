# RFC-0006 — Integrity

- Status: Accepted
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This RFC defines Integrity as a logical component of the STAS Core Object
Model.

Integrity expresses whether the relevant state of a STAS Object remains
consistent with an expected state within a determinable scope.

This specification defines the conceptual meaning of Integrity only.

It does not define representation formats, integrity mechanisms,
verification procedures, cryptographic algorithms, or platform-specific
implementations.

---

# Motivation

Consumers of a STAS Object require a way to reason about whether the object,
or part of the object, remains consistent with an expected state.

Different technical mechanisms may be used to evaluate Integrity.

The logical meaning of Integrity must remain independent from those
mechanisms.

---

# Definition

Integrity is a logical property of a STAS Object.

Integrity expresses consistency between the relevant state of the object and
an expected state within a determinable scope.

Integrity does not prescribe how that consistency is established.

---

# Requirements

A STAS Object:

- MUST define Integrity as a logical component of the object model.
- MUST treat Integrity independently from technical mechanisms.
- MUST preserve the meaning of Integrity across representations.
- MUST allow Integrity to be evaluated within a determinable scope.

Integrity:

- MUST NOT imply authenticity.
- MUST NOT imply ownership.
- MUST NOT imply authorization.
- MUST NOT imply provenance.
- MUST NOT imply trust.

---

# Scope

Integrity evaluation always operates within a scope.

Scope MAY include:

- the complete object;
- one or more logical components;
- a representation;
- an external resource;
- a historical state.

Future specifications define how scope is represented.

---

# Relationship to Other Components

Integrity is distinct from:

## Identity

Identity answers:

> Which object is this?

Integrity answers:

> Is the relevant state consistent with the expected state?

Identity and Integrity are independent properties.

---

## Content

Content defines what the object represents.

Integrity evaluates consistency of Content but does not define it.

---

## Metadata

Metadata describes the object.

Integrity may evaluate Metadata but does not define Metadata.

---

## Capabilities

Capabilities define available behaviors.

Integrity does not define or modify Capabilities.

---

# Out of Scope

This RFC does not define:

- hashes;
- digital signatures;
- Merkle structures;
- blockchain anchoring;
- verification procedures;
- evidence models;
- canonical representations;
- serialization formats;
- encoding rules;
- transport protocols.

Those topics belong to separate specifications.

---

# Security Considerations

Integrity alone does not establish trust.

An object may possess Integrity while containing incorrect, misleading, or
malicious information.

Consumers remain responsible for evaluating authenticity, trustworthiness,
authorization, provenance, and policy according to applicable
specifications.

---

# Relationship to Existing Decisions

This RFC follows:

- ADR-0002 — STAS Object Model
- ADR-0003 — Logical and Technical Layer Separation
- ADR-0004 — Integrity, Evidence, and Verification Model

---

# IANA Considerations

None.

---

# References

ADR-0002

ADR-0003

ADR-0004