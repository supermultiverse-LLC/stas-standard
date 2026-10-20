# RFC-0018 — Generation Provenance Attribute (`art_generated`)

- Status: Draft
- Author: STAS Working Group
- Created: 2026-10-20

---

# Abstract

This RFC reserves one Metadata attribute, **`art_generated`**, through which
the issuer of a Bitcoin Digital Object declares whether the media the object
presents was produced by a generative AI model, with generative assistance,
by a human without generative tools, or by a non-trained algorithm. It fixes
the trait name, a closed set of values, an optional companion attribute
aligned with the IPTC Digital Source Type vocabulary, and the rules consumers
follow when the attribute is present, absent, or unrecognized.

The attribute is a **declaration by the issuer**, sealed inside the signed
canonical document. It is not a detection result, not a machine-readable
watermark, and not a verdict about the media.

---

# Motivation

Objects declaring AI-generated media already exist on Bitcoin mainnet. The
first ones carry the free-form attribute `art_generated: ai`, chosen by one
issuer for its own collections. Nothing in STAS names that attribute, so a
second issuer could spell it differently, use other values, or mean something
else by the same string. A consumer that wants to present "the issuer declares
this media as AI-generated" has no agreed field to read.

Two external developments make a shared convention useful now:

1. **Disclosure duties.** Regulation (EU) 2024/1689 (the AI Act), Article 50,
   obliges deployers who publish artificially generated or manipulated image,
   audio or video content to disclose that fact, with a lighter notice for
   evidently artistic or creative works (applicable from 2 August 2026). An
   issuer who wants that disclosure to travel with the object, immutably and
   under its own signature, needs a stable place to put it.
2. **Industry vocabulary.** The IPTC Digital Source Type NewsCodes define the
   terms the C2PA content-credentials specification uses for the same
   question (C2PA 2.1 §18.12.3: an action's `digitalSourceType` "shall be one
   of the terms defined by the IPTC"). Aligning with that vocabulary lets a
   BDO declaration and a C2PA manifest embedded in the same media be compared
   term by term.

The convention must stay inside what Metadata is allowed to be. RFC-0005
forbids using Metadata as proof of authenticity or as the basis of a trust
decision. This RFC therefore defines a **carrier for a declaration**, and
nothing that would let a consumer treat the declaration as true.

---

# Scope

This RFC applies to objects whose Metadata is expressed through the
`bdo-representation` Profile (`metadata.attributes`, a list of
`{ trait, value }` maps). It defines:

- the reserved trait name `art_generated` and its closed value set;
- the optional companion trait `digital_source_type`;
- the subject of the declaration;
- consumer rules for presence, absence and unrecognized values;
- the relationship to C2PA `digitalSourceType`.

It does not define detection, watermarking, or any verification of the
declaration, and it makes no claim about legal compliance.

---

# The Attribute

## Trait name

The reserved trait name is the exact string `art_generated` (lowercase, ASCII).
An entry in `metadata.attributes` whose `trait` equals that string is a
Generation Provenance declaration. At most one such entry SHOULD be present;
when several are present, consumers SHALL use the first in list order and
SHOULD flag the duplication.

## Values

The `value` SHALL be exactly one of the following strings (lowercase, ASCII):

| Value | Meaning | IPTC Digital Source Type terms covered |
|---|---|---|
| `ai` | The media was created by a generative AI model trained on captured content. | `trainedAlgorithmicMedia` |
| `ai_assisted` | The media was created or edited by a human and includes generative AI elements or generative edits (inpainting, outpainting, composited synthetic parts). | `compositeWithTrainedAlgorithmicMedia`, `compositeSynthetic` |
| `human` | The media was captured or created by a human without generative AI, including non-generative edits and enhancements. | `digitalCapture`, `computationalCapture`, `negativeFilm`, `positiveFilm`, `print`, `humanEdits`, `algorithmicallyEnhanced`, `digitalCreation`, `screenCapture`, `compositeCapture` |
| `algorithmic` | The media was produced purely by an algorithm not based on trained sampled data (for example a formula-generated image) or is data-driven. | `algorithmicMedia`, `dataDrivenMedia` |

Terms the IPTC vocabulary marks as retired (`softwareImage`, `digitalArt`,
`minorHumanEdits`) are not mapped; an issuer SHALL use the current term's
mapping. `virtualRecording` and `composite` are not mapped to a single value;
an issuer SHALL choose the value that describes the generative share of the
media and MAY add the precise term through the companion attribute.

## Companion attribute `digital_source_type` (OPTIONAL)

An issuer MAY add a second entry with trait `digital_source_type` whose value
is one IPTC Digital Source Type term, written as the final path segment of
its NewsCodes URI (for example `trainedAlgorithmicMedia`). When present:

- it SHALL be consistent with the `art_generated` value per the table above;
- a consumer that detects an inconsistency SHALL present both values as
  declared and SHALL NOT silently prefer one.

## Subject of the declaration

The declaration is about the **media the object presents**: for a
`collectible`, `content.media`; for other Types, the primary presentation
media (`metadata.image` and any media the Type's Content carries). It says
nothing about textual fields such as `description`, `certificate.declaration`
or `ticket` entitlements, and nothing about the authorship of the object as a
whole.

## Immutability

Like every field of the canonical document, the declaration is covered by the
object's Integrity evidence and by any authorship Attestation. It is fixed at
genesis and cannot be corrected afterwards; an issuer who discovers an error
issues a new object.

---

# Consumer Rules

1. **Declaration, not verdict.** A consumer that displays the attribute SHALL
   present it as a statement made by the issuer (for example "Declared by the
   issuer: AI-generated"). It SHALL NOT present it as a property verified by
   the consumer, by the platform, or by STAS.
2. **Absence means undeclared.** When no `art_generated` entry is present the
   consumer SHALL treat the question as undeclared. It SHALL NOT infer `human`
   from absence, and SHALL NOT infer `ai` from any other signal under this
   attribute's name.
3. **Unrecognized values.** A value outside the closed set SHALL be treated as
   an unrecognized declaration: a consumer MAY display the raw string, SHALL
   NOT map it to any defined value, and SHALL NOT reject the object on that
   account (RFC-0005: Metadata MUST NOT drive trust decisions).
4. **No trust effect.** The value SHALL NOT change how the object is verified,
   consumed, transferred or valued by any conforming implementation.
5. **Relationship to embedded provenance.** When the media carries a C2PA
   manifest whose `c2pa.created` action declares a `digitalSourceType`, a
   consumer MAY compare it with this attribute using the table above. On
   disagreement the consumer SHALL present both and SHALL NOT resolve the
   conflict on the user's behalf. The attribute is never a substitute for, nor
   evidence of, a machine-readable marking inside the media.

---

# Extending the Values

- A new value SHALL be added only by an RFC amending this vocabulary, stating
  the value, its meaning and its IPTC mapping.
- Values SHALL be lowercase, stable, and never reused for a different meaning.
  Removing a value SHALL follow deprecation (RFC-0015); objects already
  declaring it remain valid.
- A Profile MAY require the attribute for its purpose (for example a media
  profile that mandates disclosure); a Profile SHALL NOT redefine a value.

---

# Compatibility

**Backward Compatible.** Objects already on mainnet with
`art_generated: ai` conform to this RFC without change. Other issuer-specific
attributes that travel with them (for example `author_kind`) are outside this
vocabulary and keep their current, consumer-defined handling.

Reference-implementation impact, in rollout order: the issuance surface offers
the four values as a choice instead of free text; the public verification
view renders the attribute with the "declared by the issuer" wording of
Consumer Rule 1; validators MAY warn on an unrecognized value and SHALL NOT
fail on it.

---

# Relationship to Existing Documents

- RFC-0005 (Metadata) — this attribute is descriptive Metadata and inherits
  every restriction of that RFC; it is not Content and not Integrity.
- RFC-0017 (BDO Type Vocabulary) — same pattern of a closed, extensible
  vocabulary; this RFC applies it to one Metadata attribute.
- `bdo-representation` Profile 0.2.0, `metadata.attributes` — the slot the
  attribute lives in; no change to the Profile's shape.
- RFC-0013 (Extension Model) — an Extension was considered and rejected: a
  Metadata trait is enough for a declaration, needs no Processing
  Requirement, and is already how the first mainnet objects express it.

---

# Security Considerations

The attribute asserts nothing that can be checked from the object alone. A
false declaration produces an object as valid as a true one; validity of the
object never implies truth of the declaration (BDO-01 Trust Model: evidence,
not a verdict). Consumer Rules 1 to 4 exist so that no implementation turns
this Metadata into a trust signal, and Rule 2 prevents the most likely abuse:
reading silence as "human-made". Marks embedded in media can be stripped and
metadata can be edited before issuance; this attribute preserves only what
the issuer chose to declare at genesis, under the issuer's signature.

---

# Alternatives Considered

- A neutral trait name such as `source_type` was considered. `art_generated`
  was kept because objects already carry it on mainnet and the name reads
  naturally for the dominant use (presented media).
- Reusing the IPTC terms directly as the only value set was considered. The
  four-value set was preferred for issuance surfaces and for display; the
  companion attribute keeps the precise term available.

---

# References

- RFC-0005 — Metadata; RFC-0013 — Extension Model; RFC-0015 — Versioning and
  Compatibility; RFC-0017 — BDO Type Vocabulary
- `profiles/stas-bdo-representation-profile.md` 0.2.0 — `metadata.attributes`
- IPTC Digital Source Type NewsCodes — https://cv.iptc.org/newscodes/digitalsourcetype/
- C2PA Technical Specification 2.1, §18.12.2–§18.12.3 (Actions assertion,
  `digitalSourceType`)
- Regulation (EU) 2024/1689 (AI Act), Article 50 — transparency obligations
  for providers and deployers of certain AI systems (informative only; this
  RFC makes no compliance claim)
