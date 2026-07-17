# RFC-0002 — Type

- Status: Draft
- Author: STAS Contributors
- Created: 2026-07-17

---

# Summary

This RFC defines the purpose and normative requirements of the Type
component within the STAS Core Object Model.

The Type identifies the semantic class of a STAS Object independently of
its serialization or implementation.

---

# Motivation

Interoperability requires that independent implementations interpret the
same object consistently.

The Type provides the semantic meaning that allows software to determine
how an object should be processed.

---

# Requirements

A conforming STAS Object:

- MUST define exactly one Type.
- MUST expose its Type independently of its serialization format.
- MUST NOT assign conflicting semantic meanings to the same Type.
- SHOULD use stable Type definitions over time.
- MAY introduce additional Types through future extension mechanisms.

---

# Scope

The Type defines what a STAS Object represents.

It does not define:

- identifiers
- metadata
- integrity
- permissions
- serialization
- encoding

Those responsibilities belong to other components of the Core Object Model.

---

# Rationale

Separating semantic identity from technical representation allows different
implementations to exchange objects while preserving their meaning.

---

# Security Considerations

Applications SHOULD NOT rely solely on the declared Type when making trust
or authorization decisions.

Additional verification mechanisms are defined separately.

---

# Compatibility

This RFC specifies the Type component introduced by RFC-0001.