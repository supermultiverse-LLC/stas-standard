# STAS-01 — Wallet Implementation Specification  
**Supermultiverse Wallet (Hybrid Non-Custodial Model)**

## 1. Purpose

This document describes how **Supermultiverse Wallet** implements the STAS-01 standard as a concrete, production-grade wallet.

The goal is to provide:
- Full user custody
- Interoperability with any STAS-01 compliant issuer and wallet
- Native support for Taproot Assets
- Non-custodial marketplace participation
- Scalability for mass adoption

This document is **non-normative** and does not modify the STAS-01 specification.

---

## 2. Design Principles

1. **User custody first**  
   Private keys are always controlled by the user.  
   Supermultiverse never signs transactions on behalf of users.

2. **Bitcoin-only**  
   No altchains, no wrapped assets, no external settlement layers.

3. **Interoperability by default**  
   Assets minted by any STAS-01 issuer must be visible and usable.

4. **Separation of concerns**  
   - Wallet ≠ Issuer  
   - Wallet ≠ Marketplace  
   - Wallet ≠ Universe

5. **Hybrid model for scalability**  
   Client-side signing combined with non-custodial backend services.

---

## 3. Custody Model

Supermultiverse Wallet follows a **hybrid non-custodial architecture**.

### 3.1 What the wallet DOES
- Generates and stores private keys locally (client-side).
- Signs Taproot Asset and Bitcoin transactions locally.
- Verifies proofs and metadata.
- Displays assets and balances.

### 3.2 What the wallet DOES NOT do
- Custody user funds.
- Hold private keys.
- Act as a trusted intermediary.
- Sign transactions for the user.

### 3.3 Backend services (non-custodial)
Backend services may:
- Provide blockchain and Universe synchronization
- Coordinate RFQs for marketplace trades
- Relay unsigned transactions or PSBTs
- Provide public LN swap endpoints

Backend services **never** require private keys.

---

## 4. Asset Reception Flow (STAS-01 Compliant)

1. The wallet generates a Taproot Asset address.
2. The user provides this address to an issuer (or tenant platform).
3. The issuer mints and transfers the asset to the provided address.
4. Asset proofs are published to one or more Universes.
5. The wallet synchronizes proofs and verifies ownership.
6. The asset is displayed as verified.

At no point does Supermultiverse act as custodian.

---

## 5. Asset Discovery & Verification

### 5.1 Proof Synchronization
- The wallet connects to one or more Universes.
- Proofs are fetched and verified locally.
- Invalid or incomplete proofs are rejected.

### 5.2 Metadata Resolution
- Metadata is resolved via the URI specified in the asset.
- The wallet verifies content hashes.
- Rendering occurs only after verification.

### 5.3 Trust Model
- Universes are treated as **untrusted sources**.
- Verification is always client-side.

---

## 6. Marketplace Participation

Supermultiverse Wallet supports **non-custodial trading** via an RFQ-based model.

### 6.1 Listing
- Listings are published off-chain.
- The wallet never locks or escrows assets.

### 6.2 RFQ Flow
1. Buyer requests a quote.
2. Marketplace coordinator returns a time-bounded quote.
3. User explicitly approves the trade.

### 6.3 Settlement
Preferred settlement mechanisms:
1. **Lightning swaps** (atomic, instant)
2. **PSBT-based settlement** (fallback)

The wallet always signs locally.

---

## 7. Interoperability with External Wallets

Supermultiverse Wallet does not enforce exclusivity.

- Any STAS-01 compliant asset is supported.
- Users may transfer assets to other Taproot Asset wallets.
- Marketplace participation is optional and non-binding.

The wallet competes on UX, not lock-in.

---

## 8. Multi-Issuer & Multi-Tenant Support

The wallet supports:
- Multiple issuers
- Multiple collections
- Overlapping Universes

Assets are grouped and filtered by:
- Issuer
- Collection
- Asset type
- Verification status

Issuer trust is informational, not enforced.

---

## 9. Security Considerations

- All signing occurs client-side.
- Backend services are treated as untrusted.
- Proof verification is mandatory before display.
- No hidden approvals or implicit permissions.

---

## 10. Non-Goals

Supermultiverse Wallet explicitly does NOT aim to:
- Be a custodial exchange
- Be a gatekeeper of assets
- Enforce issuer exclusivity
- Replace the STAS-01 standard

---

## 11. Future Extensions

Potential future additions:
- Multi-Universe aggregation
- Hardware wallet support
- Advanced LN swap routing
- Watch-only modes

These extensions must preserve the custody model.

---

## 12. Summary

Supermultiverse Wallet is a **reference-grade implementation** of STAS-01 that prioritizes:
- Bitcoin-native ownership
- User sovereignty
- Open interoperability
- Long-term scalability

It is designed to coexist with other wallets, issuers, and marketplaces in the STAS-01 ecosystem.
