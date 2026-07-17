# RFC-0003 — Identity

- Status: Accepted
- Author: STAS Contributors
- Created: 2026-07-17

---

# Summary

This RFC defines the purpose and normative requirements of the Identity
component within the STAS Core Object Model.

The Identity uniquely distinguishes one STAS Object from every other STAS
Object, independently of serialization, storage, transport, or
implementation.

---

# Motivation

Reliable interoperability requires that every STAS Object can be uniquely
identified.

Identity enables independent implementations to reference, exchange,
compare, and verify objects without ambiguity.

---

# Requirements

A conforming STAS Object:

- MUST define exactly one Identity.
- MUST have an Identity that uniquely identifies the object within its intended scope.
- MUST NOT reuse the same Identity for different logical objects.
- SHOULD preserve its Identity throughout the lifetime of the object.
- MAY support multiple identifier representations through future specifications, provided they resolve to the same logical Identity.

---

# Scope

The Identity defines which STAS Object is being referenced.

It does not define:

- the identifier format
- identifier encoding
- identifier resolution
- metadata
- integrity
- ownership
- permissions

Those responsibilities belong to separate RFCs.

---

# Rationale

Separating Identity from representation allows future specifications to
introduce different identifier formats without changing the conceptual
meaning of object identity.

---

# Security Considerations

Identity alone does not establish authenticity, ownership, or integrity.

Implementations MUST use appropriate verification mechanisms defined by
other specifications before making trust decisions.

---

# Compatibility

This RFC specifies the Identity component introduced by RFC-0001.