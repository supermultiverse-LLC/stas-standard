# ADR-0001 — Separation of Concerns Between Bitcoin Digital Objects and STAS-01

Status: Accepted

Date: 2026-07-16

---

# Context

The Bitcoin Digital Objects (BDO) Architecture defines the conceptual
model for Bitcoin-native digital ownership.

It explains concepts such as:

- identity;
- ownership;
- capabilities;
- verification;
- lifecycle;
- interoperability.

During the initial development of STAS-01, architectural discussions and
technical specification work evolved simultaneously.

This created a risk that conceptual definitions and technical
representation could become coupled.

Such coupling would make both projects harder to evolve independently.

---

# Decision

The ecosystem SHALL be divided into two independent layers.

## Layer 1

Bitcoin Digital Objects

Responsibilities:

- conceptual architecture;
- terminology;
- ownership model;
- conceptual interoperability.

The BDO repository defines what a Bitcoin Digital Object is.

---

## Layer 2

STAS-01

Responsibilities:

- technical representation;
- serialization;
- validation;
- interoperability;
- conformance.

The STAS repository defines how Bitcoin Digital Objects are represented
and interpreted by compatible implementations.

---

# Consequences

This separation allows:

- conceptual evolution without changing technical encodings;
- technical evolution without redefining concepts;
- multiple interoperable implementations;
- independent governance of architecture and specification.

It also prevents implementation-specific decisions from influencing the
conceptual architecture.

---

# Alternatives Considered

## Single Repository

Architecture and specification could have been maintained together.

Rejected.

Reason:

Conceptual evolution and technical evolution have different lifecycles.

Combining them would reduce clarity and make long-term governance more
difficult.

---

## Specification Defines the Architecture

Rejected.

Reason:

The specification should represent concepts, not own them.

A technical specification should remain replaceable without redefining
the conceptual model.

---

# Decision Rationale

Digital ownership should outlive individual specifications.

Specifications should outlive individual implementations.

Implementations should compete without fragmenting the conceptual
architecture.

Separating Bitcoin Digital Objects from STAS-01 establishes clear
responsibilities and enables independent evolution of every layer of the
ecosystem.

---

# Related Documents

PROJECT-GOVERNANCE.md

Bitcoin Digital Objects Architecture

---

# Status History

2026-07-16

Accepted as the foundational architectural decision of STAS-01.