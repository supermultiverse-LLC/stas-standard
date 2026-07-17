# STAS — Shared Taproot Assets Standard

STAS is an open, vendor-neutral standard for the interoperable representation of Bitcoin Digital Objects (BDOs) using the Taproot Assets protocol.

Its purpose is to enable Bitcoin Digital Objects to be created, exchanged, verified, and understood across independent wallets, platforms, and applications without dependence on a specific vendor or implementation.

STAS-01 is the first technical specification developed under the STAS standard.

STAS-01 defines how Bitcoin Digital Objects are represented.

It does not define what a Bitcoin Digital Object is. The conceptual model of Bitcoin Digital Objects is maintained independently by the [Bitcoin Digital Objects project](https://github.com/supermultiverse-LLC/bitcoin-digital-objects).

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

STAS-01 specifies the technical representation of Bitcoin Digital Objects using Taproot Assets.

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
decisions/
    Architecture Decision Records (ADRs)

docs/
    Informative architecture and supporting documentation

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