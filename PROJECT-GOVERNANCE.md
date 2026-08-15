# STAS-01 Project Governance

Status: Active  
Version: 1.1

---

# Purpose

This document defines the governance model of the STAS-01 project.

Its objective is to ensure that the specification evolves through a
transparent, predictable and implementation-independent process.

This governance applies to:

- the specification itself;
- architectural decisions;
- Requests for Comments (RFCs);
- documentation;
- reference implementations;
- future contributors.

---

# Project Scope

STAS-01 is an open interoperability specification.

Its purpose is to define how Bitcoin Digital Objects (BDOs) can be
represented, verified and interpreted consistently across compatible
applications.

STAS-01 does not define the conceptual meaning of a Bitcoin Digital
Object.

That responsibility belongs exclusively to the Bitcoin Digital Objects
Architecture.

---

# Repository Responsibilities

The ecosystem is intentionally divided into independent repositories.

## bitcoin-digital-objects

Defines the conceptual architecture of Bitcoin Digital Objects.

Contains:

- Architecture
- Design Principles
- Architecture Papers (AP)

This repository answers:

> What is a Bitcoin Digital Object?

---

## stas-standard

Defines the technical interoperability specification.

Contains:

- Governance
- Architecture Decisions
- RFCs
- Specification
- Reference documentation
- Examples

This repository answers:

> How should a Bitcoin Digital Object be represented and verified?

---

## Reference Implementations

Reference implementations demonstrate the specification.

They do not define it.

---

## Integrations

Integrations expose STAS-compatible functionality.

They do not define either the architecture or the specification.

---

# Document Types

The STAS project uses seven document classes.

## Architecture Decision Record (ADR)

Location:
decisions/

Purpose:

Record accepted architectural decisions.

An ADR explains:

- context
- decision
- alternatives
- consequences

ADR documents are informative.

They do not define implementation requirements.

---

## Request for Comments (RFC)

Location:
rfcs/

Purpose:

Propose changes to the STAS specification.

RFCs exist before a change is accepted.

Possible status:

- Draft
- In Review
- Accepted
- Rejected
- Withdrawn
- Superseded

An accepted RFC authorizes a specification change.

It is not itself the specification.

---

## Specification

Location:
spec/

Purpose:

Define the normative behavior of STAS-01.

Documents inside spec/ define conformance, together with released Profiles
and released Extensions within their declared scope (see below).

Normative requirements use RFC 2119 terminology:

- MUST
- MUST NOT
- REQUIRED
- SHALL
- SHALL NOT
- SHOULD
- SHOULD NOT
- MAY
- OPTIONAL

---

## Reference Documentation

Location:
reference/

Purpose:

Explain the specification.

Reference documentation is informative.

---

## Examples

Location:
examples/

Purpose:

Provide implementation examples.

Examples are informative unless explicitly referenced by the
specification.

---

## Profiles

Location:
profiles/

Purpose:

Constrain permitted STAS behavior into a concrete, testable
interoperability agreement, as defined by RFC-0012.

A Profile has a stable Profile Identifier (`urn:stas:profile:<slug>`),
an explicit Profile Version, and a lifecycle state:

- Draft
- In Review
- Accepted
- Deprecated
- Superseded
- Withdrawn

A **released** Profile defines conformance within its declared scope.
A Profile in Draft status is a proposal.

A Profile may be a Layer Profile, a Composite Profile, or a **Binding**
(RFC-0012 §Relationship to Bindings): a Binding maps STAS requirements to
a specific protocol environment — for example, the Taproot Assets
binding — and carries the same identification, versioning and conformance
apparatus.

The profiles/ index (README) is the authoritative list of Profiles, their
versions and their states.

---

## Extensions

Location:
extensions/

Purpose:

Introduce optional semantics or technical behavior through a defined
extension point, as defined by RFC-0013.

An Extension has a stable Extension Identifier within the `urn:stas:ext`
namespace (Namespace Authority: STAS Working Group), an explicit
Extension Version, and a declared Processing Requirement
(`MUST_UNDERSTAND` or `MAY_IGNORE`).

A **released** Extension defines conformance for producers and verifiers
of that Extension. An Extension in Draft status is a proposal. A consumer
that does not process a `MAY_IGNORE` Extension preserves it byte-for-byte.

The extensions/ index (README) is the authoritative list of Extensions,
their versions and their states.

---

# Source of Truth

The ecosystem follows a strict hierarchy.

Conceptual Architecture

↓

Bitcoin Digital Objects

↓

STAS-01 Specification

↓

Reference Implementations

↓

Applications

No implementation may redefine the specification.

No specification may redefine the conceptual architecture.

---

# Change Process

Every significant change follows the same process.
Issue

↓

Architecture discussion

↓

RFC

↓

Review

↓

Accepted RFC

↓

Specification update

↓

Reference implementation

↓

Release

No significant change should be introduced directly into the
specification.

---

# Branch Policy

Every significant contribution must use its own branch.

Recommended naming:
adr/0001-short-title

rfc/0001-short-title

spec/feature-name

profiles/short-title

extensions/short-title

docs/short-description

Pull Requests are required before merging significant work.

---

# Compatibility

Every RFC must classify its compatibility impact.

Possible values:

- Backward Compatible
- Conditionally Compatible
- Breaking

Breaking changes require:

- explicit justification;
- migration guidance;
- version impact;
- implementation strategy.

---

# Versioning

The STAS specification follows semantic versioning.

Profiles and Extensions are independent version domains (RFC-0015): each
carries its own version, and a revision of one does not imply a revision
of the specification or of any other Profile or Extension.

Major versions introduce breaking changes.

Minor versions introduce backward-compatible functionality.

Patch versions contain editorial or corrective updates.

---

# Relationship with Bitcoin Digital Objects

Bitcoin Digital Objects define concepts.

STAS-01 defines technical interoperability.

STAS must never redefine:

- identity;
- ownership;
- capabilities;
- verification;
- lifecycle;
- metadata;
- issuer model;
- application model.

If the conceptual architecture changes, the Bitcoin Digital Objects
repository must evolve first.

Only afterwards may STAS define its technical representation.

---

# Guiding Principles

The project follows a small number of permanent principles.

Architecture before implementation.

Interoperability before convenience.

Open standards before proprietary platforms.

Verification before trust.

Ownership before applications.

---

# Final Principle

Bitcoin Digital Objects define what exists.

STAS-01 defines how it interoperates.

Implementations demonstrate that it works.