STAS-01 — Draft v0.2
Status: Draft
Type: Standards Track
Created: 2026-01-25
Updated: 2026-01-26
Author: Supermultiverse
License: CC0
________________________________________
1. Abstract
STAS-01 specifies an open standard for issuing, representing, transferring, and trading digital collectible assets on Bitcoin using Taproot Assets.
The standard defines a wallet-agnostic, non-custodial, Bitcoin-only model in which issuers create Taproot Assets with verifiable metadata, users retain full custody through compatible wallets, and marketplaces operate exclusively as coordinators rather than custodians.
STAS-01 is designed to ensure long-term interoperability, user sovereignty, and permissionless participation across issuers, wallets, and marketplaces.
________________________________________
2. Motivation
Digital collectibles have historically suffered from structural limitations:
1.	Custodial dependence, where platforms retain control over user assets.
2.	Platform lock-in, preventing assets from being used outside their original ecosystem.
3.	Lack of durable settlement, where asset validity depends on issuer availability.
Bitcoin uniquely enables digital assets with properties previously exclusive to physical collectibles: ownership persistence, cryptographic verifiability, and independence from issuers.
Taproot Assets extend Bitcoin by enabling asset issuance and transfer anchored to Taproot outputs. However, Taproot Assets alone do not define metadata conventions, wallet behavior, or non-custodial market interaction.
STAS-01 addresses these gaps by defining a minimal, open, and forward-compatible standard for a shared Taproot Assets ecosystem.
________________________________________
3. Design Principles
STAS-01 is governed by the following principles:
3.1 Bitcoin-only
The standard is exclusively built on Bitcoin and Taproot Assets.
3.2 User Sovereignty
Users always retain final custody of their assets.
3.3 Wallet Agnosticism
No wallet implementation is privileged or required.
3.4 Non-custodial Markets
Marketplaces coordinate discovery and execution but never custody assets or keys.
3.5 Permissionless Issuance
Issuers may mint assets without approval from wallets or marketplaces.
3.6 Interoperability by Convention
Shared conventions are favored over rigid enforcement.
3.7 Forward Compatibility
The standard evolves through versioning without invalidating existing assets.
________________________________________
4. Terminology
•	Asset
A Taproot Asset issued on Bitcoin.
•	asset_id
A unique identifier of a Taproot Asset as defined by Taproot Assets implementations.
•	Issuer
An entity that mints Taproot Assets and defines associated metadata.
•	Issuer-as-a-Service
Managed infrastructure that performs minting and distribution on behalf of Issuers.
•	User
The final owner of an asset.
•	Wallet
A non-custodial application capable of receiving, verifying, displaying, and transferring Taproot Assets.
•	Proof
Cryptographic data required to verify the validity and provenance of a Taproot Asset.
•	Universe
A system for discovery and synchronization of Taproot Asset proofs.
•	Metadata URI
A resolvable identifier pointing to structured metadata describing an asset.
•	Marketplace Coordinator
A service that facilitates discovery and trade coordination without custody.
•	RFQ (Request for Quote)
A buyer request for a time-bounded, non-self-executing price quote.
•	Settlement
The final exchange of an asset for bitcoin.
________________________________________
5. System Overview
STAS-01 defines a modular system composed of independent actors.
5.1 Issuer
Issuers define assets, mint Taproot Assets, attach metadata, transfer assets to user-provided Taproot Asset addresses, and ensure proof availability.
5.2 Issuer-as-a-Service
Issuer-as-a-Service MAY perform operational minting and distribution but:
•	MUST NOT require user secrets, wallet seeds, or signing delegation
•	MUST NOT retain custody beyond initial distribution
•	MUST transfer assets exclusively to user-provided Taproot Asset addresses
5.3 Wallet
Wallets generate Taproot Asset addresses, receive assets, verify proofs, resolve metadata, and authorize transfers.
5.4 Universe
Universes store and serve proofs. They are sources of data, not trust.
5.5 Marketplace Coordinator
Marketplace Coordinators facilitate listings, RFQs, and execution coordination without custody or signing authority.
________________________________________
6. Asset Lifecycle
6.1 Off-chain Representation
Assets MAY exist off-chain prior to tokenization.
6.2 Minting
Issuers mint Taproot Assets using standard Taproot Assets mechanisms.
6.3 Metadata Attachment
At mint time, assets MUST be associated with a Metadata URI and metadata hash.
6.4 Initial Transfer
Assets MUST be transferred to a user-provided Taproot Asset address, establishing user custody.
6.5 Proof Publication
Issuers MUST ensure proofs are available via Universes or direct delivery.
6.6 Wallet Discovery and Verification
Wallets retrieve proofs, verify validity, and resolve metadata.
6.7 Transfer and Trade
Users MAY transfer or trade assets via wallet-authorized actions only.
________________________________________
7. Metadata Specification
7.1 Binding
Each asset MUST include:
•	metadata_uri
•	metadata_hash
7.2 Metadata URI Requirements
The URI MUST be publicly resolvable and MUST NOT require authentication.
7.3 Metadata Hash
The hash MUST be a lowercase hex-encoded SHA-256 digest (64 characters) computed over the canonical metadata bytes.
7.4 Canonicalization Rules
Metadata MUST be canonicalized as follows:
•	UTF-8 encoding
•	JSON object with lexicographically sorted keys
•	No insignificant whitespace
•	Unicode normalization NFC
•	Integers allowed; floating-point numbers MUST NOT be used
The hash MUST be computed over the canonical representation.
7.5 Metadata Format
Metadata MUST be valid UTF-8 JSON.
Required Fields
Field	Type	Requirement
schema	string	MUST equal "stas-01"
version	string	MUST equal "1.0"
name	string	MUST be non-empty
issuer	string	MUST be non-empty
asset_type	string	MUST equal "collectible"
Optional Fields
Optional fields MAY include description, image, collection, rarity, attributes, external_url, supply, id.
Unknown fields MUST be ignored by wallets.
________________________________________
8. Wallet Requirements
Wallets MUST:
•	generate Taproot Asset addresses
•	retrieve and verify proofs
•	resolve and verify metadata
•	require explicit user authorization for transfers and trades
Wallets MUST remain functional without any specific Marketplace Coordinator or Universe.
________________________________________
9. Marketplace Interaction Model
Listings are off-chain declarations of intent to sell.
•	Listings MUST include asset_id, amount, price, and expiration.
•	Listings MUST NOT lock assets or transfer custody.
Settlement MUST be wallet-authorized.
9.1 Settlement Paths
•	Preferred: Lightning-based asset swaps
•	Fallback: on-chain PSBT settlement
________________________________________
10. Security Considerations
•	Wallets retain exclusive signing authority
•	Proof verification is mandatory
•	Metadata is untrusted input
•	Coordinators MUST NOT custody assets
________________________________________
11. Compatibility and Versioning
•	Backward compatibility MUST be preserved
•	Breaking changes require a new schema identifier
•	Wallets SHOULD tolerate unknown fields and versions
________________________________________
12. Rationale
STAS-01 favors open conventions, non-custodial design, and wallet sovereignty to align with Bitcoin’s long-term security and decentralization goals.
________________________________________
13. Copyright
This document is released under CC0.

