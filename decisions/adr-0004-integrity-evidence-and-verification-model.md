# ADR-0004 — Integrity, Evidence, and Verification Model

- Status: Accepted
- Date: 2026-07-17

---

# Context

ADR-0003 establishes that STAS separates logical concepts from their
technical realization.

Integrity, Evidence, and Verification are closely related concepts, but they
represent different architectural responsibilities.

Many systems treat hashes, signatures, Merkle proofs, blockchain anchoring,
or other cryptographic mechanisms as synonymous with integrity.

This architectural coupling makes logical semantics dependent upon specific
technologies.

STAS requires a technology-independent model.

---

# Decision

STAS distinguishes four independent concepts:

- Integrity
- Evidence
- Verification
- Verification Result

Each concept has a distinct responsibility.

No concept replaces another.

---

# Integrity

Integrity is a logical property.

Integrity expresses whether the relevant state of a STAS Object remains
consistent with an expected state within a determinable scope.

Integrity does not define how that evaluation is performed.

---

# Evidence

Evidence is information that may support evaluation of Integrity.

Evidence is not Integrity itself.

Evidence may originate from one or more technical mechanisms.

Multiple independent pieces of Evidence may support evaluation of the same
Integrity property.

---

# Verification

Verification is a process.

Verification evaluates available Evidence according to a defined procedure.

Verification consumes Evidence.

Verification evaluates Integrity.

Verification produces a Verification Result.

Verification does not redefine the logical meaning of the object.

---

# Verification Result

Verification Result is the outcome produced by Verification.

At the architectural level STAS recognizes three conceptual outcomes:

- Valid
- Invalid
- Indeterminate

Future specifications may refine these outcomes without changing their
conceptual meaning.

---

# Scope

Every Integrity evaluation operates within a determinable scope.

Examples include:

- the complete object;
- selected logical components;
- a representation;
- an external resource;
- a historical state.

Future specifications define how scope is represented.

---

# Architectural Relationship
             STAS Object
                   │
                   ▼
              Integrity
                   ▲
                   │
              Evidence
                   │
                   ▼
            Verification
                   │
                   ▼
        Verification Result

Integrity remains a logical property.

Evidence and Verification are technical mechanisms surrounding that property.

---

# Consequences

This decision establishes that:

- Integrity is not a hash.
- Integrity is not a digital signature.
- Integrity is not a Merkle proof.
- Integrity is not a Bitcoin transaction.
- Integrity is not a verification algorithm.

Likewise:

- Evidence does not redefine Integrity.
- Verification does not redefine Integrity.
- Verification Result does not redefine Integrity.

Future specifications may introduce different technical mechanisms while
preserving the same logical Integrity model.

---

# Alternatives Considered

## Define Integrity Through Cryptography

Rejected.

Cryptographic mechanisms are possible realizations of Integrity but do not
define the concept itself.

## Merge Evidence Into Integrity

Rejected.

Evidence supports Integrity but is not equivalent to the property.

## Merge Verification Into Integrity

Rejected.

Verification is an evaluation process, not a logical property.

---

# Relationship to Existing Decisions

ADR-0002 defines the abstract STAS Object Model.

ADR-0003 separates logical concepts from technical realization.

This ADR applies those principles specifically to Integrity and the
verification architecture.

Future RFC-0006 must follow this conceptual model.

---

# Status

Accepted.