# RFC-0007 — Capabilities

- Status: Draft
- Author: STAS Working Group
- Created: 2026-07-17

---

# Abstract

This RFC defines Capabilities as a logical component of the STAS Core Object
Model.

Capabilities declare semantic possibilities associated with a STAS Object
and interpreted according to its Type.

A Capability does not itself define an operation, authorize an actor, execute
behavior, guarantee current availability, or guarantee a successful result.

This specification defines the conceptual meaning of Capabilities only.

It does not define operation models, authorization models, execution
mechanisms, state transitions, representation formats, or platform-specific
implementations.

---

# Motivation

Consumers and implementations of a STAS Object may need to determine what
kinds of behavior or interaction are semantically associated with that
object.

Examples may include transfer, redemption, access, display, evolution, or
association with another object.

The meaning of those possibilities must remain independent from the technical
systems used to authorize, invoke, execute, or enforce them.

Without a logical Capability component, implementations may conflate an
object's semantic possibilities with APIs, executable methods, permission
systems, smart contracts, or platform-specific operations.

STAS therefore defines Capabilities independently from their technical
realization.

---

# Definition

Capabilities is the logical component that declares semantic possibilities
associated with a STAS Object.

A Capability expresses a class of behavior or interaction recognized for the
object.

Capabilities define what may be possible.

They do not define:

- how a possibility is invoked;
- when it is available;
- who may exercise it;
- how it is authorized;
- how it is executed;
- whether execution succeeds;
- how a result is represented.

---

# Requirements

A STAS Object:

- MUST contain exactly one logical Capabilities component.
- MAY declare zero or more Capabilities.
- MUST interpret its Capabilities according to its Type.
- MUST preserve the semantic meaning of its Capabilities across
  representations.
- MUST treat Capabilities independently from operation, authorization, and
  execution mechanisms.

A Capability:

- MUST express a logical possibility associated with the object.
- MUST have semantics defined by the applicable Type or by a referenced STAS
  specification.
- MUST preserve that meaning across compatible implementations.
- MUST NOT redefine the Type of the object.
- MUST NOT itself constitute an executable operation.
- MUST NOT itself constitute executable code.
- MUST NOT imply authorization.
- MUST NOT imply current availability.
- MUST NOT imply implementation support.
- MUST NOT guarantee successful execution.
- MUST NOT guarantee a particular result.
- MUST NOT prove Identity, Integrity, authenticity, ownership, authorization,
  provenance, or trust.

---

# Type-Defined Semantics

The Type of a STAS Object determines how its Capabilities are interpreted.

A Type definition:

- MAY define one or more admissible Capabilities.
- MUST define the semantic meaning of each Capability it introduces.
- MAY define logical constraints on the applicability of those Capabilities.
- MUST NOT require a particular execution mechanism at the logical object
  layer.

An object instance MAY declare the Capabilities applicable to that object
within the rules established by its Type.

An object instance MUST NOT alter the semantic meaning established by its
Type or by the referenced specification defining the Capability.

An object instance MUST NOT introduce undefined Capability semantics.

---

# Capability and Operation

A Capability is not an Operation.

A Capability declares a semantic possibility.

An Operation is a concrete attempt to exercise a possibility.

For example:
Capability:
    The object may be transferred.

Operation:
    Attempt to transfer a particular object between particular participants.

The existence of a Capability does not imply that an Operation is currentlyavailable, authorized, supported, or successful.

Operation models are outside the scope of this RFC.

---

# Capability and Authorization

A Capability is not Authorization.

Capability answers:

> What semantic possibility is associated with the object?

Authorization answers:

> Who may attempt to exercise that possibility and under what conditions?

The declaration of a Capability MUST NOT be interpreted as granting permission
to any actor.

Authorization models, policies, credentials, roles, approvals, and access
control are outside the scope of this RFC.

---

# Capability and Availability

A Capability does not imply current availability.

A semantic possibility may exist while its exercise is unavailable because
of state, time, context, policy, implementation support, external resources,
or other conditions.

For example, an object may remain semantically redeemable even when redemption
is not currently available.

Availability models are outside the scope of this RFC.

---

# Capability and Execution

A Capability does not execute behavior.

Execution is a technical process that may realize a Capability through an
Operation.

Execution may depend on:

- a technical implementation;
- authorization;
- current state;
- platform support;
- external systems;
- applicable policy.

Execution mechanisms MUST NOT redefine the semantic meaning of a Capability.

---

# Capability and Operation Result

A Capability does not guarantee that an Operation will succeed.

It also does not guarantee that an Operation will produce a particular
result.

Operation Results belong to a separate architectural responsibility.

This RFC does not define success, failure, rejection, partial completion, or
other execution outcomes.

---

# Relationship to Other Components

## Type

Type defines how Capabilities are interpreted.

A Capability MUST NOT override or contradict the applicable Type definition.

---

## Identity

Identity determines which object is being referenced.

Capabilities declare semantic possibilities associated with that object.

Capabilities do not establish or prove Identity.

---

## Content

Content defines what the object represents.

Capabilities declare possibilities associated with that representation.

Information that fundamentally defines what the object represents belongs in
Content rather than Capabilities.

---

## Metadata

Metadata describes the object or its Capabilities.

Metadata may provide labels, descriptions, presentation information, or
discovery information for a Capability.

Metadata does not create a Capability or define its semantic meaning.

---

## Integrity

Integrity evaluates consistency with an expected state within a determinable
scope.

Integrity may be evaluated over a declaration of Capabilities.

Integrity does not define which Capabilities exist, whether they are
available, or whether they may be exercised.

---

# Capability Sets

A STAS Object MAY declare multiple Capabilities.

This RFC does not assign ordering, priority, dependency, hierarchy, or
composition semantics to a set of Capabilities.

The presence or absence of one Capability MUST NOT imply the presence,
absence, activation, or deactivation of another unless such semantics are
explicitly defined by the applicable Type or another STAS specification.

---

# Changes to Capabilities

The Capabilities applicable to an object may be affected by future state,
lifecycle, or evolution specifications.

This RFC does not define:

- how Capabilities are added;
- how Capabilities are removed;
- how Capabilities are activated;
- how Capabilities are suspended;
- how Capability changes are authorized;
- how Capability history is recorded.

Any future mechanism for changing Capabilities MUST preserve the semantic
constraints established by the applicable Type.

---

# Representation Independence

This RFC does not define how Capabilities are represented.

In particular, it does not prescribe:

- identifiers;
- strings;
- URIs;
- arrays;
- schemas;
- objects;
- manifests;
- methods;
- endpoints;
- executable interfaces;- serialization formats;
- encoding rules.

A future representation specification MAY define concrete Capability
representations, provided they preserve the logical semantics defined here.

---

# Platform Independence

Capabilities are independent from any particular platform, protocol, network,
runtime, or execution environment.

A platform binding MAY define how a Capability is technically realized.

A platform binding MUST NOT redefine the logical meaning of the Capability.

The same logical Capability MAY have different technical realizations across
compatible platforms.

---

# Out of Scope

This RFC does not define:

- Operations;
- invocation;
- actors;
- Authorization;
- permissions;
- policies;
- access control;
- availability;
- state;
- state transitions;
- lifecycle;
- events;
- workflows;
- Execution;
- Operation Results;
- failure handling;
- APIs;
- methods;
- endpoints;
- executable code;
- smart contracts;
- representation formats;
- serialization;
- encoding;
- platform bindings.

These topics belong to separate specifications.

---

# Security Considerations

The presence of a Capability MUST NOT be interpreted as evidence that an
Operation is safe, authorized, available, supported, or trustworthy.

A malicious or misleading object may declare Capabilities that are not
implemented or whose exercise could produce harmful effects.

Consumers and implementations must independently evaluate:

- object Integrity;
- authenticity;
- Authorization;
- policy;
- implementation trust;
- execution risk;
- external dependencies.

Capability declarations alone do not establish any of those properties.

---

# Relationship to Existing Decisions

This RFC follows:

- ADR-0002 — STAS Object Model
- ADR-0003 — Logical and Technical Layer Separation
- ADR-0005 — Capability and Execution Separation

It is also consistent with the separation between logical properties and
technical mechanisms established by ADR-0004.

---

# IANA Considerations

None.

---

# References

ADR-0002

ADR-0003

ADR-0004

ADR-0005