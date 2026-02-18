# STAS-01 — Supermultiverse Taproot Asset Standard

Version 1.0
Status: Draft
Extends: Taproot Assets Protocol (Lightning Labs)

---

# 1. Abstract

STAS-01 specifies an open standard for issuing, representing, transferring, and evolving digital assets on Bitcoin using Taproot Assets.

The standard defines:

* An immutable Core layer bound to a Taproot Asset.
* A pluggable Profile system for structured representations (e.g., cards, tickets, badges).
* An optional verifiable State layer for dynamic evolution.
* Lightning-native transfer compatibility.

STAS-01 does not redefine Taproot Assets. It defines how metadata, profiles, and state must be structured and validated on top of them.

---

# 2. Design Principles

1. Bitcoin-first — settlement and ownership anchored in Taproot Assets.
2. Verifiability over trust — all external resources MUST be hash-verified.
3. Immutable identity — core asset identity cannot change.
4. Evolvable utility — optional state layer for real-world use cases.
5. Lightning-native — assets are designed for Lightning-based transfers.
6. Interoperability — wallets can implement without issuer coordination.

---

# 3. Layered Architecture

STAS-01 defines three distinct layers:

## 3.1 Core Layer (Immutable)

Bound to the Taproot Asset commitment at mint time.

Never changes.

## 3.2 Profile Layer (Structured Representation)

Defines how the asset should be interpreted and rendered.

Examples:

* card-v1
* ticket-v1 (future)
* badge-v1 (future)
* game-item-v1 (future)

Profiles are extensible.

## 3.3 State Layer (Optional, Evolvable)

Defines dynamic fields that MAY change over time.

State updates must be cryptographically verifiable.

---

# 4. Core Metadata Schema

The Core metadata MUST include:

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
  "supply": 1,
  "media": {
    "front_image": "uri",
    "front_image_sha256": "hex",
    "back_image": "uri (optional)",
    "back_image_sha256": "hex (optional)"
  },
  "metadata_hash": "sha256 of canonical JSON"
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
* media hashes
* profile
* version

If any of these change, a new asset MUST be minted.

---

# 5. Resource URI Rules

Assets MAY use:

* https://
* ipfs://
* nostr:// (reserved for future use)

All external resources MUST include SHA-256 hash fields.

Wallets MUST verify hashes before rendering.

Wallets MAY reject assets missing hashes.

---

# 6. Profile System

Profiles define representation rules.

The Core only requires:

```json
"profile": "card-v1"
```

Profiles define additional REQUIRED and OPTIONAL fields.

---

# 7. Card Profile v1

## 7.1 Visual Ratio

Recommended ratio:

2.5:3.5 (standard trading card format)

Allowed alternative:

7:10 vertical

Wallets MUST preserve ratio.
Wallets MUST NOT crop.
Wallets MAY letterbox.

## 7.2 Media Requirements

* front_image REQUIRED
* back_image OPTIONAL
* If back_image exists, wallets SHOULD support flip animation
* Minimum resolution: 1024x1434
* Recommended resolution: 2048x2868
* Max image size: 2MB

## 7.3 Recommended Fields

```json
{
  "title": "string",
  "subtitle": "string",
  "description": "string",
  "season": "string",
  "attributes": [
    {
      "trait_type": "string",
      "value": "string|number"
    }
  ]
}
```

Wallets SHOULD render rarity badge.
Wallets SHOULD render serial number prominently.

---

# 8. State Layer (Optional)

STAS-01 supports dynamic evolution via issuer-signed state updates.

Core identity remains immutable.

## 8.1 State Model Declaration

```json
"state_model": "immutable" | "issuer_signed" | "hybrid_checkpointed"
```

Default:

```
immutable
```

## 8.2 Issuer-Signed State

If state_model = issuer_signed:

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

## 8.3 Mutable Fields (Allowed)

State MAY contain:

* stats
* xp
* progress
* season_performance
* status
* unlockables
* dynamic_attributes

State MUST NOT alter:

* rarity
* serial_number
* supply
* issuer_id
* collection_id
* media hashes

---

# 9. Hybrid Checkpointed Model

If state_model = hybrid_checkpointed:

Issuer MAY periodically anchor state_hash to Bitcoin.

Anchoring MAY occur via:

* Taproot Asset update
* Separate transaction commitment
* Merkle root anchoring

Wallets MAY display:

"State anchored at block height X"

Anchoring is OPTIONAL but recommended for high-value milestones.

---

# 10. Minting Requirements

STAS-01 assets MUST be minted as valid Taproot Assets.

Issuer MUST:

* Commit metadata_hash inside Taproot Asset metadata
* Publish proofs to a Universe server
* Ensure metadata_uri resolves to canonical JSON

Wallets MUST:

* Verify proof chain (P0 + P1)
* Validate metadata_hash
* Validate schema compliance

---

# 11. Transfer Model

Transfers follow Taproot Asset protocol.

Preferred settlement:

Lightning-based asset transfers.

Fallback:

On-chain virtual PSBT.

STAS-01 does not redefine transfer logic.

---

# 12. Security Model

Wallets MUST:

* Verify Taproot Asset proof
* Verify metadata hash
* Verify image hashes
* Verify issuer signatures for state updates
* Reject malformed JSON
* Reject unknown schema versions

Wallets SHOULD:

* Display version history
* Warn users if state is mutable
* Indicate if state is anchored

---

# 13. Versioning

Core version changes require:

* New STAS version number
* Backward compatibility statement

Profiles MAY evolve independently.

Example:

card-v1
card-v2

---

# 14. Compliance Checklist

An asset is STAS-01 compliant if:

* Valid Taproot Asset proof
* Metadata matches metadata_hash
* Schema validates
* Profile rules respected
* State rules respected (if present)

---

# 15. Future Extensions

Reserved for:

* Royalty mechanism
* On-chain attribute commitments
* Zero-knowledge ownership proofs
* Multi-issuer collections
* Decentralized state networks

---

# 16. Conclusion

STAS-01 defines a Bitcoin-native asset standard built on Taproot Assets with Lightning compatibility, immutable identity, structured representation, and optional verifiable evolution.

It aims to balance:

* Sovereignty
* Verifiability
* UX coherence
* Enterprise adoption
* Long-term ecosystem growth

---
## Media Requirements (Card v1)

This section standardizes media so wallets and marketplaces can render STAS-01 cards consistently.

### Recommended image ratios

- **Card (primary)**: **2:3** aspect ratio (portrait).
  - Recommended sizes: **1024×1536** or **2048×3072**
- **Square preview (grid/thumbnail)**: **1:1**
  - Recommended size: **1024×1024**

### Formats

- Preferred: **WebP**
- Allowed: **PNG**, **JPG**
- Animated (optional): **WebP animated** or **MP4** short loop (see `animation_uri`)

### Size limits (recommendations)

- Card front/back: ≤ **2.5 MB** each
- Square preview: ≤ **500 KB**
- Animation: ≤ **5 MB**, ≤ **5 seconds**

### Safe area

To prevent cropping by different UIs, creators should keep key elements within a centered safe area:
- Safe margins: **5%** from each edge (top/bottom/left/right).

---
## Profile: Card v1

Card v1 defines a collectible representation optimized for consumer UIs (mobile-first).

### Fields

The Card v1 profile is embedded in metadata under `profile.card_v1`.

#### Required
- `title` (string, 1–64 chars)
- `front_image_uri` (string, HTTPS URL)
- `front_image_hash` (string, hex SHA-256 of the front image bytes)

#### Optional
- `subtitle` (string, 0–80 chars)
- `description` (string, 0–500 chars)
- `back_image_uri` (string, HTTPS URL)
- `back_image_hash` (string, hex SHA-256)
- `square_image_uri` (string, HTTPS URL) — for grids
- `square_image_hash` (string, hex SHA-256)
- `animation_uri` (string, HTTPS URL) — short loop / holo / flip
- `animation_hash` (string, hex SHA-256)
- `attributes` (array of `{ trait_type, value }`)
- `series` (string) — e.g., "SatoSeries"
- `edition` (string) — e.g., "Gold", "Genesis"
- `serial_number` (string) — e.g., "12/100"
- `language` (BCP-47 string) — e.g., "en", "es"
- `external_url` (string, HTTPS URL) — project page

### Rendering rules (non-normative)

- If `back_image_uri` exists, wallets MAY offer a flip interaction.
- If `square_image_uri` exists, wallets SHOULD use it for grids.
- If `animation_uri` exists, wallets MAY play it with user interaction.

---

## Royalties (Declarative)

STAS-01 supports a **declarative royalty policy** intended for voluntary marketplace enforcement.
Bitcoin base layer does not enforce royalties; this field exists to standardize creator compensation across compatible venues.

### Fields

Royalties are declared under `policy.royalties`.

- `enabled` (boolean)
- `bps` (integer) — basis points (e.g., 250 = 2.5%)
- `recipient` (string) — recommended: Lightning Address or BOLT12 offer
- `recipient_type` (enum) — `ln_address` | `bolt12` | `btc_address`
- `terms_uri` (string, HTTPS URL) — optional human-readable policy

### Notes

- Wallets MUST treat royalties as informational.
- Marketplaces MAY enforce royalties as part of their listing/trade rules.
