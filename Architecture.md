# Architecture

## Overview

GreenKeeper is a mobile application built with React Native and Expo focused on plant management, care tracking, local data persistence, and future gamification features.

The architecture follows a feature-oriented structure combined with clear separation of responsibilities, aiming to provide scalability, maintainability, and long-term project sustainability.

### Architectural Principles

* Separation of Concerns
* Single Responsibility Principle
* Feature-Based Organization
* Domain Isolation
* Predictable State Management
* Strong Type Safety
* Production-Ready Structure

---

# Project Structure

```text
src/
├── app/
│   ├── (tabs)/
│   ├── plant/
│   └── _layout.tsx
│
├── core/
│   ├── config/
│   ├── database/
│   └── theme/
│
├── features/
│   ├── plants/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── schemas/
│   │   └── types.ts
│   │
│   └── notifications/
│
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
│
└── store/
    └── useUiStore.ts
```

---

# Layer Responsibilities

## App Layer

**Location**

```text
src/app
```

**Responsibilities**

* Route definitions
* Navigation flow
* Screen composition
* Global provider initialization

**Restrictions**

* No business logic
* No direct database access
* No data transformation logic

The App layer should only orchestrate navigation and screen rendering.

---

## Feature Layer

**Location**

```text
src/features
```

**Responsibilities**

* Business rules
* Domain-specific components
* Data access abstractions
* React Query hooks
* Validation schemas

Each feature should be self-contained and independent whenever possible.

Example:

```text
features/plants
```

Contains everything related to plant management.

---

## Shared Layer

**Location**

```text
src/shared
```

**Responsibilities**

Reusable resources available across the application.

Examples:

* Buttons
* Inputs
* Cards
* Generic hooks
* Utility functions

Components in this layer must remain domain-agnostic.

A shared component should not contain business-specific logic.

---

## Core Layer

**Location**

```text
src/core
```

**Responsibilities**

Application-wide infrastructure.

Examples:

* Theme configuration
* Environment configuration
* Database initialization
* Global constants

The Core layer provides foundational services and should not depend on feature modules.

---

## Store Layer

**Location**

```text
src/store
```

**Responsibilities**

Global UI state management.

Examples:

* Theme selection
* Modal visibility
* UI preferences
* Temporary interface state

Business data must not be stored here.

---

# State Management

GreenKeeper separates state according to its purpose and lifecycle.

## Persistent Data

Managed by:

* React Query

Examples:

* Plants
* Care history
* Statistics
* Achievements

Responsibilities:

* Caching
* Synchronization
* Data fetching
* Loading states
* Error states

---

## UI State

Managed by:

* Zustand

Examples:

* Active theme
* Open modals
* Temporary UI controls
* User interface preferences

Responsibilities:

* Fast updates
* Lightweight global state
* Cross-screen UI communication

---

# Data Flow

The application follows a unidirectional data flow.

```text
UI
 ↓
Hooks
 ↓
Services
 ↓
SQLite
```

Detailed flow:

```text
Screen
 ↓
React Query Hook
 ↓
Domain Service
 ↓
Database
```

Database access must occur exclusively through service modules.

---

# Form Validation

All user input must be validated before persistence.

### Recommended Stack

* React Hook Form
* Zod

### Responsibilities

* Input validation
* Type inference
* User feedback
* Invalid submission prevention

Examples:

* Required fields
* Minimum text length
* Numeric limits
* Date validation

Validation must occur before any database operation is executed.

---

# Error Handling

Errors are handled according to the responsibility of each layer.

## Services

Responsibilities:

* Execute database operations
* Return results
* Throw errors when necessary

Services should not display alerts or UI feedback.

---

## Hooks

Responsibilities:

* Manage loading state
* Manage error state
* Expose query status

React Query is responsible for most of this behavior.

---

## UI

Responsibilities:

* Display error states
* Display empty states
* Display loading states
* Provide retry actions

The UI should gracefully recover from failures whenever possible.

---

# Naming Conventions

## Components

**Pattern**

```text
PascalCase
```

**Examples**

```text
PlantCard.tsx
PrimaryButton.tsx
PlantForm.tsx
```

---

## Hooks

**Pattern**

```text
camelCase with "use" prefix
```

**Examples**

```text
usePlants.ts
usePlant.ts
useTheme.ts
```

---

## Services

**Pattern**

```text
camelCase + Service suffix
```

**Examples**

```text
plantService.ts
notificationService.ts
```

---

## Utilities

**Pattern**

```text
camelCase
```

**Examples**

```text
dateFormatter.ts
stringNormalizer.ts
```

---

## Routes and Directories

**Pattern**

```text
lowercase
kebab-case
```

**Examples**

```text
plant/
garden-world/
notifications/
```

---

# Dependency Rules

Allowed dependency flow:

```text
app
 ↓
features
 ↓
shared
 ↓
core
```

### Rules

* Features must not depend directly on other features.
* Shared modules must remain domain-independent.
* Core must not depend on features.
* Database access must occur only through services.
* UI components must not execute SQL operations.

---

# Architectural Goals

The architecture is designed to support:

* Long-term maintainability
* Predictable code organization
* Feature scalability
* Clear ownership of responsibilities
* Ease of onboarding
* Production-ready development practices

All future features should follow the same architectural principles to maintain consistency throughout the project.
