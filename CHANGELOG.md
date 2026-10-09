# Changelog

All notable changes to the STAS specifications will be documented in this file.

## [Unreleased]

## [STAS-01 v1.0.1] - 2026-10-09
### Changed
- Editorial revision; no normative changes.
- Title shortened to "STAS-01". The acronym expansion is retained in the repository README as historical traceability; STAS is used as a proper noun.
- Section 1.2 layer diagram: the fixed "Taproot Assets" layer is replaced by "Protocol binding (defined by a Profile)", with the Taproot Assets protocol cited as an informative example, consistent with Section 6 (bindings are out of scope of this specification and are defined separately).

## [STAS-01 v1.0] - 2026-07-17
### Added
- First Released version of the specification, compiled from accepted RFCs 0001–0016. Tagged as `v1.0`. (Entry added retroactively on 2026-10-09; the release predates it.)

## [STAS-01 v0.2] - 2026-01-26
### Added
- Section numbering and consistent RFC-style language.
- Canonical metadata rules (UTF-8, sorted keys, NFC).
- Formal definition of `metadata_hash` (SHA-256, lowercase hex).
- Explicit custody boundaries for Issuer-as-a-Service.
- Minimum marketplace listing requirements.

### Changed
- RFQ clarified as non-self-executing and always requiring explicit user authorization.
- Metadata requirements tightened to remove ambiguity.

## [STAS-01 v0.1] - 2026-01-25
### Added
- Initial draft of the STAS-01 specification.
