# STAS

STAS is an open, vendor-neutral standard for the interoperable representation of Bitcoin Digital Objects (BDOs).

Its purpose is to enable Bitcoin Digital Objects to be created, exchanged, verified, and understood across independent wallets, platforms, and applications without dependence on a specific vendor or implementation.

STAS-01 is the first technical specification developed under the STAS standard.

STAS-01 defines how Bitcoin Digital Objects are represented.

It does not define what a Bitcoin Digital Object is. The conceptual model of Bitcoin Digital Objects is maintained independently by the [Bitcoin Digital Objects project](https://github.com/supermultiverse-LLC/bitcoin-digital-objects).

---

## Name and Numbering

STAS is used as a proper noun. The name originated as an acronym of "Shared Taproot Assets Standard"; the expansion is retained here for historical traceability only. The specification core is protocol-independent: bindings to a concrete platform or protocol — such as the Taproot Assets protocol — are out of scope of the core specification and are defined separately through Profiles.

STAS-XX numbering indicates specification sequence. Binding to a concrete protocol does not produce a new specification; it is defined through a Profile of an existing one.

---

## Design Principles

STAS is guided by the following long-term principles:

- Bitcoin-native architecture
- Open specification
- Vendor neutrality
- Interoperability by default
- Implementation independence
- Backward compatibility
- Extensibility without fragmentation
- Public verifiability

These principles take precedence over the requirements or convenience of any individual implementation.

---

## Scope

STAS-01 specifies the technical representation of Bitcoin Digital Objects. Bindings to a specific platform or protocol are defined separately through Profiles.

The specification may define:

- object identifiers;
- canonical data structures;
- metadata representation;
- integrity and verification requirements;
- capability representation;
- interoperability and conformance requirements.

STAS-01 does not prescribe:

- a particular wallet;
- a specific custody model;
- a marketplace implementation;
- a user interface;
- commercial terms;
- application-specific business logic.

Implementations may build different products and experiences while remaining interoperable at the specification layer.

---

## Relationship with Bitcoin Digital Objects

The Bitcoin Digital Objects project defines the conceptual architecture of a Bitcoin Digital Object.

STAS defines the technical representation used by interoperable implementations.

In simple terms:

- Bitcoin Digital Objects define what a BDO is.
- STAS defines how a BDO is represented.

The projects are maintained separately so that the conceptual model can remain implementation-independent and the technical standard can evolve through its own governance process.

---

## Repository Structure
archive/
    Superseded material retained for traceability

decisions/
    Architecture Decision Records (ADRs)

docs/
    Informative architecture and supporting documentation

extensions/
    Namespaced, versioned extensions attached at defined extension points

profiles/
    Profiles that select, constrain, or combine STAS behavior for concrete interoperability purposes, including protocol bindings

reference/
    Informative reference material for implementers

rfcs/
    Requests for Comments proposing changes to the specification

spec/
    Normative STAS specifications

Additional repository-level documents include:
PROJECT-GOVERNANCE.md
    Governance, document roles, and change process

CHANGELOG.md
    Record of relevant repository and specification changes

---

## Specification

The normative STAS-01 specification is maintained in:

- [`spec/STAS-01.md`](spec/STAS-01.md)

Only text incorporated into a released specification defines conformance.

Architecture papers, ADRs, RFCs, examples, and reference materials are informative unless explicitly incorporated into the normative specification.

---

## Governance

STAS follows an open and traceable governance model.

The repository distinguishes between:

- Architecture Decision Records, which document significant architectural decisions;
- Requests for Comments, which propose concrete changes to the specification;
- Normative specifications, which define implementation and conformance requirements.

An accepted RFC authorizes a specification change but does not itself define conformance. A change becomes normative only when incorporated into a released specification.

The complete governance model is defined in [`PROJECT-GOVERNANCE.md`](PROJECT-GOVERNANCE.md).

---

## Contributing

Contributions, implementation feedback, and technical review are welcome.

Before proposing architectural or specification changes, contributors should review:

- [`PROJECT-GOVERNANCE.md`](PROJECT-GOVERNANCE.md)