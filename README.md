# STAS – Supermultiverse Taproot Assets Standard

STAS is an open, Bitcoin-only standard for issuing, holding, and trading collectible assets using Taproot Assets.

The goal of STAS is to define a **wallet-agnostic, non-custodial, and permissionless** model that enables long-lived digital collectibles anchored to Bitcoin.

---

## What is STAS-01?

**STAS-01** is the first specification of the STAS standard.

It defines:
- how collectible assets are issued as Taproot Assets,
- how metadata is attached and verified,
- how wallets should discover and display assets,
- and how marketplaces can enable trading **without custody**.

STAS-01 is a technical specification, not a product.

---

## Design Goals

- Bitcoin-only
- User custody at all times
- Wallet agnostic
- Non-custodial marketplaces
- Interoperability by convention
- Long-term durability of assets

---

## Non-Goals

STAS does **not** define:
- a specific wallet implementation,
- a custodial marketplace,
- proprietary metadata formats,
- or application-level business logic.

---

## Specification

The canonical specification lives here:

- [`spec/STAS-01.md`](spec/STAS-01.md)

Current status: **Draft v0.2**

---

## Status and Process

STAS is published as an open standard.

Changes follow a conservative process:
- editorial fixes and clarifications may be introduced in draft versions,
- breaking changes require a new schema identifier,
- backward compatibility is preserved whenever possible.

Feedback is welcome via issues and pull requests.

---

## License

The STAS specification is released under **CC0**.

Anyone is free to use, implement, and extend it without permission.
