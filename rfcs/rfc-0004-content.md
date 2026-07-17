# RFC-0004 — Content

- Status: Draft
- Author: STAS Contributors
- Created: 2026-07-17

---

# Summary

This RFC defines the purpose and normative requirements of the Content
component within the STAS Core Object Model.

Content represents the primary information carried by a STAS Object and is
interpreted according to the object's Type.

This RFC defines the logical responsibility of Content independently of its
schema, serialization, encoding, storage, or transport.

---

# Motivation

A STAS Object requires a clearly defined location for the information that
gives the object its functional meaning and purpose.

Without a shared distinction between Content and other components,
implementations could place equivalent information in different parts of an
object, reducing interoperability and producing inconsistent interpretations.

This RFC establishes Content as a distinct architectural responsibility.

---

# Definition

Content is the primary type-specific information represented by a STAS
Object.

The meaning of Content is determined by the object's Type.

For example, different Types may use Content to represent different logical
information. This RFC does not define any concrete Type or Content structure.

Content is distinct from:

- Identity, which distinguishes the object;
- Metadata, which describes the object;
- Integrity, which supports verification;
- Capabilities, which describe supported behaviors.

---

# Requirements

A conforming STAS Object:

- MUST define exactly one logical Content component.
- MUST interpret its Content according to the semantics of its Type.
- MUST preserve the distinction between Content and Metadata.
- MUST NOT use Content as a substitute for the object's Identity.
- MUST NOT treat Content as proof of integrity, authenticity, ownership,
  or authorization.
- SHOULD include in Content only information required to express the
  object's type-specific meaning or function.
- MAY contain structured, unstructured, or composite Content when
  permitted by the object's Type.

A Type definition:

- MUST define the semantic meaning of its permitted Content.
- MUST define any type-specific Content constraints required for
  interoperability.
- MUST NOT depend on a particular serialization format unless that
  dependency is established by a separate specification.

---

# Content and Type

Type and Content have separate but complementary responsibilities.

Type defines what kind of object is being represented.

Content defines the primary type-specific information carried by that
object.

Content cannot be interpreted interoperably without understanding the
object's Type.

The same logical Content structure may have different meanings under
different Types. Implementations therefore MUST NOT interpret Content
independently of Type.

---

# Content and Metadata

Content and Metadata are separate components.

Content expresses the object's primary type-specific information.

Metadata provides descriptive information used for purposes such as
presentation, discovery, indexing, or user experience.

Information required to preserve the essential meaning or function of an
object SHOULD be represented as Content rather than Metadata.

Information that only describes or presents the object SHOULD be represented
as Metadata rather than Content.

A future Metadata RFC defines the normative responsibilities of Metadata.

---

# Representation Independence

This RFC defines Content as a logical component.

It does not require Content to be represented:

- inline or externally;
- as text or binary data;
- as a single value or a composite structure;
- using any particular schema;
- using any particular serialization or encoding.

Those representation decisions are defined by separate specifications.

Different representations MAY encode the same logical Content, provided they
preserve equivalent meaning under the object's Type.

---

# Non-Goals

This RFC does not define:

- Content schemas
- serialization formats
- canonical encoding
- media types
- external resource references
- storage mechanisms- transport protocols
- encryption
- compression
- size limits
- mutability
- versioning
- validation syntax

---

# Security Considerations

Content may originate from untrusted sources.

Implementations:

- MUST NOT assume that Content is authentic solely because it is present
  in a STAS Object.
- MUST NOT assume that Content is safe to execute, render, resolve, or
  process.
- SHOULD validate Content according to the requirements of its Type before
  processing it.
- SHOULD apply appropriate protections when Content may contain active,
  executable, externally resolved, or resource-intensive information.

Integrity, authenticity, ownership, and authorization are addressed by
separate specifications.

---

# Rationale

Defining Content independently from its technical representation allows the
same logical object model to support different encodings, storage systems,
transport mechanisms, and implementation environments.

Requiring Content semantics to be defined by Type prevents ambiguous
interpretation while allowing new object classes to introduce their own
type-specific information.

Maintaining a clear separation between Content and Metadata reduces
implementation inconsistency and improves interoperability.

---

# Compatibility

This RFC specifies the Content component introduced by RFC-0001.

It is compatible with RFC-0002 because Content is interpreted according to
the object's Type.

It does not modify the Type or Identity requirements defined by RFC-0002 and
RFC-0003.