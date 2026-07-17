# STAS Profiles

This directory contains **STAS Profiles**.

A Profile is a named, versioned specification that selects, constrains, or combines the permitted behavior of STAS for a defined interoperability purpose, without redefining the semantics of the Core Object Model. Profiles are defined by RFC-0012.

A Profile turns the implementation-independent STAS architecture into a concrete, testable interoperability agreement. A Profile may constrain one architectural layer (a Layer Profile) or combine several (a Composite Profile), and may strengthen — but never weaken — the requirements of the specifications it depends on.

Only text incorporated into a released specification or a released Profile defines conformance. A Profile in `Draft` status is a proposal.

## Index

| Profile | Identifier | Version | Status | Purpose |
|---|---|---|---|---|
| [Bitcoin Digital Objects](stas-bdo-profile.md) | `urn:stas:profile:bdo` | 0.1.0 | Draft | Interoperable representation of Bitcoin Digital Objects |

## Naming

Profile files use the format `stas-<slug>-profile.md`.

Profile Identifiers use a stable URN of the form `urn:stas:profile:<slug>`, independent of version. A Profile Version is stated explicitly and follows the versioning rules of RFC-0015.
