# ADR-0005 — Capability and Execution Separation

- Status: Accepted
- Date: 2026-07-17

---

# Context

ADR-0003 establishes that STAS separates logical concepts from their
technical realization.

As the STAS Core Object Model evolves, Capabilities introduce the notion of
possible behavior associated with a STAS Object.

Without an explicit architectural boundary, Capabilities could become
conflated with executable operations, authorization rules, implementation
mechanisms, or platform-specific behavior.

Such coupling would make the logical object model dependent on execution
technologies.

---

# Decision

A Capability is a logical declaration of a possible behavior associated with
a STAS Object.

A Capability defines what may be possible.

It does not define how, when, by whom, or whether that
possibility is exercised.

Execution belongs to a separate architectural layer.

---

# Architectural Separation

STAS distinguishes the following concepts:
Capability
        │
        ▼
Operation
        │
        ▼
Authorization
        │
        ▼
Execution
        │
        ▼
Operation Result

Each concept has an independent responsibility.

Higher layers may implement lower-layer concepts but must not redefine their
logical meaning.

---

# Capability

A Capability expresses a semantic possibility associated with a STAS Object.

A Capability:

- does not execute behavior;
- does not authorize actors;
- does not guarantee availability;
- does not guarantee successful execution;
- does not prescribe technical implementation.

Capabilities remain part of the logical object model.

---

# Consequences

This decision allows:

- multiple execution models;
- multiple authorization models;
- multiple platform bindings;
- multiple implementation technologies;

while preserving a single logical Capability model.

Future specifications may define Operations, Authorization, Execution,
State, or Lifecycle independently.

---

# Alternatives Considered

## Model Capabilities as Executable Operations

Rejected.

Executable behavior belongs to implementation layers and must not redefine
the logical object model.

## Combine Capabilities and Authorization

Rejected.

Authorization determines who may attempt an operation.

Capabilities define only the semantic possibility.

## Combine Capabilities and Execution

Rejected.

Execution is a technical realization of a Capability and belongs to a
different architectural responsibility.

---

# Relationship to Existing Decisions

This ADR extends:

- ADR-0002 — STAS Object Model
- ADR-0003 — Logical and Technical Layer Separation
- ADR-0004 — Integrity, Evidence, and Verification Model

RFC-0007 must define Capabilities according to this separation.

---

# Status

Accepted.