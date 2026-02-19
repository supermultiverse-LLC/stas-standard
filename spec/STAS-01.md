# STAS-01 — Supermultiverse Taproot Asset Standard

Version 1.0  
Status: Draft  
Extends: Taproot Assets Protocol (Lightning Labs)

---

# 1. Abstract

STAS-01 defines an open standard for issuing, representing, transferring, and evolving digital assets on Bitcoin using Taproot Assets.

The standard specifies:

- An immutable Core layer.
- A structured Profile system (e.g., Card v1).
- An optional verifiable State layer.
- A strict metadata commitment model (`stas-01-envelope`).
- Lightning-compatible transfer semantics.

STAS-01 does not redefine Taproot Assets. It defines how metadata, profiles, and state must be structured and validated on top of them.

---

# 2. Design Principles

1. Bitcoin-first — ownership anchored in Taproot Assets.
2. Verifiability over trust — all external resources MUST be hash-verified.
3. Immutable identity — core asset identity cannot change.
4. Evolvable utility — optional cryptographically verifiable state layer.
5. Lightning-native — assets are designed for Lightning-based transfers.
6. Interoperability — wallets can implement without issuer coordination.

---

# 3. Layered Architecture

STAS-01 defines three logical layers:

## 3.1 Core Layer (Immutable)

Bound to the Taproot Asset commitment at mint time.

Never changes.

## 3.2 Profile Layer (Structured Representation)

Defines how the asset is interpreted and rendered.

Examples:

- card-v1
- ticket-v1 (future)
- badge-v1 (future)
- game-item-v1 (future)

Profiles are extensible.

## 3.3 State Layer (Optional, Evolvable)

Defines dynamic fields that MAY change over time.

State updates MUST be cryptographically verifiable.

---

# 4. Core Metadata Schema

The canonical STAS-01 metadata JSON MUST include:

```json
{
  "standard": "stas-01",
  "version": "1.0",
  "profile": "card-v1",
  "issuer_id": "string",
  "collection_id": "string",
  "asset_name": "string",
  "serial_number": "string",
  "rarity": "common|uncommon|rare|epic|legendary|mythic",
  "supply": 1
}
```

## 4.1 Immutable Fields

The following fields MUST NEVER change:

* issuer_id
* collection_id
* asset_name
* serial_number
* rarity
* supply
* profile
* version

If any immutable field changes, a new asset MUST be minted.

The cryptographic commitment to metadata is defined exclusively by the `stas-01-envelope` embedded in the Taproot Asset genesis meta bytes.  
The Core metadata schema itself does not contain hash commitments.

---

# 5. Taproot Asset Metadata Commitment (`stas-01-envelope`)

## 5.1 Purpose

STAS-01 requires a cryptographic binding between:

* The Taproot Asset
* The metadata URI
* The expected metadata hash

This is achieved through a committed envelope embedded in the Taproot Asset genesis meta bytes.

Wallets MUST NOT derive metadata_uri from meta_hash or any implicit resolver pattern.

## 5.2 Envelope Location

The issuer MUST embed a UTF-8 JSON document into:

`asset_genesis.meta`

Taproot Assets commits to these bytes via:

`asset_genesis.meta_hash = SHA256(meta_bytes)`

Wallets MUST extract and validate this envelope from the proof.

## 5.3 Envelope Format

The envelope MUST be:

```json
{
  "schema": "stas-01-envelope",
  "version": "1",
  "metadata_uri": "https://issuer.example.com/metadata/asset.json",
  "metadata_hash": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "content_type": "application/json"
}
```

### Required Fields

* `schema` MUST equal `"stas-01-envelope"`
* `version` MUST equal `"1"`
* `metadata_uri` MUST be a valid URI
* `metadata_hash` MUST be 64-character lowercase hex SHA-256
* `content_type` MUST equal `"application/json"`

## 5.4 Wallet Validation Pipeline

Wallets MUST:

1. Verify Taproot Asset proof.
2. Extract genesis meta bytes.
3. Parse and validate the envelope.
4. Fetch metadata from `metadata_uri`.
5. Canonicalize metadata JSON (sorted keys, NFC strings, no whitespace).
6. Compute SHA-256 of canonical JSON.
7. Require equality with `metadata_hash`.
8. Validate STAS-01 schema.
9. Display collectible only if all checks pass.

If any step fails, the collectible MUST be shown as Unresolved.

---

# 6. Resource URI Rules

Allowed URI schemes:

* https://
* ipfs://
* nostr:// (reserved)

All external resources MUST include SHA-256 hashes.

Wallets MUST verify hashes before rendering.

Wallets MAY reject assets missing hashes.

---

# 7. Profile: Card v1

Card v1 defines a collectible representation optimized for mobile-first consumer UIs.

## 7.1 Media Fields

Defined under:

```json
"profile": {
  "card_v1": { ... }
}
```

### Required

* `title`
* `front_image_uri`
* `front_image_hash`

### Optional

* `subtitle`
* `description`
* `back_image_uri`
* `back_image_hash`
* `square_image_uri`
* `square_image_hash`
* `animation_uri`
* `animation_hash`
* `attributes`
* `series`
* `edition`
* `serial_number`
* `language`
* `external_url`

## 7.2 Image Ratios

Primary card ratio:

2:3 (portrait)

Square preview:

1:1

Wallets MUST preserve ratio.
Wallets MUST NOT crop.
Wallets MAY letterbox.

## 7.3 Formats

Preferred: WebP
Allowed: PNG, JPG
Animated: WebP animated or MP4 (≤ 5 seconds)

## 7.4 Size Limits

* Front/back image ≤ 2.5 MB
* Square preview ≤ 500 KB
* Animation ≤ 5 MB

## 7.5 Safe Area

Important elements SHOULD remain within 5% margin from each edge.

---

# 8. State Layer (Optional)

## 8.1 State Model Declaration

```json
"state_model": "immutable" | "issuer_signed" | "hybrid_checkpointed"
```

Default: immutable

## 8.2 Issuer-Signed State

```json
{
  "state_version": 3,
  "state_uri": "https://...",
  "state_hash": "sha256",
  "state_signature": "issuer_signature"
}
```

Wallet MUST verify:

* Signature corresponds to issuer_id
* state_hash matches content at state_uri
* state_version increments sequentially

State MUST NOT modify immutable Core fields.

## 8.3 Hybrid Checkpointed Model

Issuer MAY periodically anchor state_hash to Bitcoin via:

* Taproot Asset update
* Separate transaction commitment
* Merkle root anchoring

Anchoring is OPTIONAL but recommended for high-value milestones.

---

# 9. Minting Requirements

STAS-01 assets MUST be minted as valid Taproot Assets.

Issuer MUST:

* Commit a valid `stas-01-envelope` in Taproot Asset genesis meta bytes.
* Ensure `metadata_uri` resolves to canonical STAS-01 JSON.
* Make proofs publicly accessible.

Wallets MUST:

* Verify proof chain (P0 + P1).
* Validate envelope integrity.
* Validate metadata_hash.
* Validate schema compliance.

---

# 10. Transfer Model

Ownership is determined exclusively by Taproot Asset protocol.

STAS-01 assets:

* MUST be transferable via standard Taproot Asset virtual PSBT.
* MUST preserve asset_id and immutable Core fields.
* MUST NOT require custom OP_RETURN scanning.

Transfer MAY update:

* Ownership
* State layer (if issuer_signed model is active)

---

# 11. Settlement Model

## 11.1 On-Chain Settlement (Required)

All STAS-01 assets MUST support on-chain Taproot Asset transfers.

Guarantees:

* Bitcoin-level finality
* Base-layer sovereignty
* Universal compatibility

## 11.2 Lightning Settlement (Recommended)

Lightning-based Taproot Asset transfers are strongly recommended for:

* Secondary markets
* Gaming ecosystems
* Microtransactions
* High-frequency transfers

Lightning is optional for compliance but represents the preferred scalability path.

---

# 12. Royalties (Declarative)

Royalties are informational and voluntary.

Declared under:

```json
"policy": {
  "royalties": {
    "enabled": true,
    "bps": 250,
    "recipient": "user@ln.domain",
    "recipient_type": "ln_address",
    "terms_uri": "https://..."
  }
}
```

Wallets MUST treat royalties as informational.

Marketplaces MAY enforce them voluntarily.

---

# 13. Security Model

Wallets MUST:

* Verify Taproot Asset proof.
* Validate envelope integrity.
* Validate metadata hash.
* Validate media hashes.
* Verify state signatures (if present).
* Reject malformed JSON.
* Reject unknown schema versions.

Wallets SHOULD:

* Indicate mutable state.
* Display resolution errors clearly.

---

# 14. Compliance Levels

## 14.1 Core Compliance

* Proof verification
* Envelope validation
* Metadata validation
* On-chain transfer support

## 14.2 Profile Compliance

* Correct Card v1 rendering
* Media hash verification
* Respect rendering rules

## 14.3 Lightning-Enabled Compliance

* Support Lightning-based Taproot Asset transfers

Lightning support is optional but recommended.

---

# 15. Versioning

Core version changes require:

* New STAS version number
* Backward compatibility statement

Profiles MAY evolve independently.

---

# 16. Future Extensions

Reserved for:

* Royalty enforcement layers
* Zero-knowledge ownership proofs
* Multi-issuer collections
* Decentralized state networks
* Advanced commitment schemes

---

# 17. Conclusion

STAS-01 defines a Bitcoin-native asset standard built on Taproot Assets with Lightning compatibility, immutable identity, structured representation, and optional verifiable evolution.

It is designed for:

* Sovereignty
* Verifiability
* UX coherence
* Enterprise adoption
* Long-term ecosystem growth

```
```
