# STAS Extensions

This directory contains **STAS Extensions**.

An Extension introduces optional semantics or technical behavior through a defined
extension point, under the Extension Model (RFC-0013). Every Extension has a stable
Extension Identifier within a collision-resistant namespace, an explicit Extension
Version, and a declared Processing Requirement (`MUST_UNDERSTAND` or `MAY_IGNORE`).

An Extension is not part of the Core Object Model. A Profile may select or require an
Extension; a consumer that does not understand a `MAY_IGNORE` Extension preserves it
byte-for-byte.

Only text incorporated into a released Extension defines conformance. An Extension in
`Draft` status is a proposal.

## Index

| Extension | Identifier | Version | Processing | Status | Purpose |
|---|---|---|---|---|---|
| [BDO Attestation](stas-bdo-attestation-extension.md) | `urn:stas:ext:bdo-attestation` | 0.1.0 | `MAY_IGNORE` | In Review | Signed authorship/endorsement statements (creator, platform) referencing the object's Meta Commitment — Authenticity, kept separate from Integrity |

## Naming

Extension files use the format `stas-<slug>-extension.md`.

Extension Identifiers use a stable URN of the form `urn:stas:ext:<slug>` within the
`urn:stas:ext` namespace (Namespace Authority: STAS Working Group), independent of
version. An Extension Version is stated explicitly and follows RFC-0015.
