# RFC-0005 — Metadata

- Status: Draft
- Author: STAS Contributors
- Created: 2026-07-17

---

# Summary

This RFC defines the purpose and normative requirements of the Metadata
component within the STAS Core Object Model.

Metadata provides descriptive information about a STAS Object without
changing its semantic meaning or functional behavior.

Metadata exists to improve discovery, presentation, indexing, and user
experience while remaining conceptually distinct from Content.

---

# Motivation

Applications frequently require descriptive information to display,
organize, search, and present objects.

Without a common understanding of Metadata, implementations may incorrectly
place essential information outside the object's primary Content, reducing
interoperability.

This RFC establishes Metadata as a separate architectural responsibility.

---

# Definition

Metadata is descriptive information associated with a STAS Object.

Metadata supplements the object by providing information intended for
presentation, discovery, indexing, categorization, localization, or user
experience.

Metadata does not define the essential semantic meaning of the object.

Changing Metadata SHOULD NOT change what the object fundamentally
represents.

---

# Requirements

A conforming STAS Object:

- MAY include Metadata.
- MUST NOT require Metadata to determine the object's fundamental semantic meaning.
- MUST NOT use Metadata as a substitute for Content.
- MUST NOT use Metadata as proof of identity, integrity, authenticity,
  ownership, or authorization.
- SHOULD keep Metadata logically independent from Content.
- MAY support multiple Metadata representations through future specifications.

---

# Metadata and Content

Metadata and Content have different responsibilities.

Content defines the object's primary type-specific meaning.

Metadata describes the object.

If removing a piece of information changes what the object fundamentally
represents, that information belongs in Content rather than Metadata.

If removing a piece of information only changes how the object is presented,
discovered, or organized, that information belongs in Metadata.

---

# Representation Independence

This RFC does not define:

- metadata schemas
- metadata vocabularies
- serialization formats
- encoding
- localization mechanisms
- indexing systems
- external metadata resources

Future specifications may define interoperable Metadata formats without
changing the conceptual responsibility of Metadata.

---

# Non-Goals

This RFC does not define:

- object titles
- descriptions
- images
- media resources
- tags
- categories
- localization
- search indexes
- UI presentation
- metadata validation rules

---

# Security Considerations

Metadata may originate from untrusted sources.

Implementations:

- MUST NOT assume Metadata is accurate.
- MUST NOT use Metadata alone for authorization or trust decisions.
- SHOULD validate externally obtained Metadata according to application
  requirements.
- SHOULD treat externally referenced Metadata as potentially mutable.

---

# Rationale

Separating Metadata from Content preserves the semantic stability of STAS
Objects while allowing descriptive information to evolve independently.

This separation improves interoperability by ensuring that implementations
distinguish between an object's meaning and its presentation.

---

# Compatibility

This RFC specifies the Metadata component introduced by RFC-0001.

It complements RFC-0004 by defining the architectural distinction between
Content and Metadata.