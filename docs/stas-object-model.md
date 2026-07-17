# STAS Object Model

> Informative document.
>
> This document explains the conceptual structure of a STAS Object.
> It is not normative.
> Normative requirements are defined by the STAS specification and RFCs.

---

# Overview

A STAS Object is the canonical interoperable representation of a Bitcoin
Digital Object.

Every STAS Object is composed of six conceptual components.
                         STAS Object
                              │
      ┌───────────────┬────────┴────────┬───────────────┐
      │               │                 │               │
    Type          Identity          Content        Metadata
                                              │
                                              │
                                        Integrity
                                              │
                                              │
                                        Capabilities

Each component has a single architectural responsibility.

Together they define the logical structure of every STAS Object.

---

# Components

## Type

Defines what the object represents.

Examples include collections, items, credentials, tickets, memberships,
or future object classes.

Normative definition:

- RFC-0002

---

## Identity

Defines which object is being referenced.

Identity uniquely distinguishes one STAS Object from every other logical
object.

Normative definition:

- RFC-0003

---

## Content

Represents the primary information carried by the object.

Content contains the information that gives the object its value and
purpose.

Normative definition:

- RFC-0004 (planned)

---

## Metadata

Provides descriptive information about the object.

Metadata enables discovery, presentation, indexing, and user experience.

Normative definition:

- RFC-0005 (planned)

---

## Integrity

Allows independent verification that the object has not been modified.

Integrity mechanisms are defined separately from object identity.

Normative definition:

- RFC-0006 (planned)

---

## Capabilities

Describe optional behaviors supported by the object.

Capabilities enable interoperability while allowing future evolution of
the standard.

Normative definition:

- RFC-0007 (planned)

---

# Relationship between the components

The six components are complementary.

No single component replaces another.

For example:

- Identity does not establish integrity.
- Metadata does not define content.
- Type does not define permissions.
- Capabilities do not modify identity.

Each component has a single responsibility.

This separation reduces coupling and improves interoperability.

---

# References

- ADR-0002 — The STAS Object Model
- RFC-0001 — Core Object Model
- RFC-0002 — Type
- RFC-0003 — Identity

---

## Learn STAS

If you're new to STAS, start here:

- [STAS Object Model](docs/stas-object-model.md)

Then continue with:

- ADR-0002
- RFC-0001
- RFC-0002
- RFC-0003