# Arquitetura

## Visão Geral

O GreenKeeper é um aplicativo mobile desenvolvido com React Native e Expo para gerenciamento de plantas e registro de cuidados.

A arquitetura segue uma abordagem orientada a funcionalidades (*Feature-Based Architecture*) com separação clara de responsabilidades entre interface, domínio e infraestrutura.

### Princípios Arquiteturais

* Separação de Responsabilidades (*Separation of Concerns*)
* Princípio da Responsabilidade Única (*Single Responsibility Principle*)
* Organização por Funcionalidade (*Feature-Based Organization*)
* Fluxo Unidirecional de Dados
* Tipagem Forte com TypeScript
* Baixo Acoplamento
* Alta Coesão

---

# Estrutura Atual do Projeto

```text
src/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   │
│   ├── dev-preview.tsx
│   └── _layout.tsx
│
├── core/
│   ├── database/
│   │   ├── database.ts
│   │   ├── migrations.ts
│   │   ├── schema.ts
│   │   └── types.ts
│   │
│   └── theme/
│       ├── tokens.ts
│       ├── useAppColorScheme.ts
│       └── index.ts
│
├── features/
│   └── plants/
│       ├── repository/
│       │   └── plant.repository.ts
│       │
│       └── types.ts
│
├── shared/
│   └── components/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── EmptyState.tsx
│       └── index.ts
│
└── store/
    └── themeStore.ts
```

---

# Responsabilidades das Camadas

## App

**Localização**

```text
src/app
```

### Responsabilidades

* Definição de rotas
* Navegação
* Composição de telas
* Inicialização da aplicação

### Restrições

* Não executar SQL
* Não acessar banco diretamente
* Não conter regras de negócio

---

## Features

**Localização**

```text
src/features
```

### Responsabilidades

* Organização por domínio
* Tipos da funcionalidade
* Repositórios
* Regras de negócio

Exemplo:

```text
features/plants
```

Centraliza tudo relacionado ao gerenciamento de plantas.

---

### Repository

**Localização**

```text
features/plants/repository
```

### Responsabilidades

* Executar operações no SQLite
* Inserir registros
* Buscar registros
* Remover registros

Exemplo:

```text
PlantRepository
```

O repositório é a única camada do domínio que conhece consultas SQL.

---

## Shared

**Localização**

```text
src/shared
```

### Responsabilidades

Recursos reutilizáveis entre funcionalidades.

### Components

**Localização**

```text
src/shared/components
```

Componentes de UI reutilizáveis, estilizados com `StyleSheet` do React Native e consumindo o tema global (`src/core/theme`) via hook `useAppColorScheme`.

Componentes atuais:

```text
Button      — variantes primary, secondary, outline, danger; suporta loading e disabled
Card        — container com borda, radius e padding do tema
Input       — campo de texto com label e estado de erro
EmptyState  — estado vazio com título, descrição e ação opcional (usa Button)
```

### Restrições

* Não acessam repositórios ou SQLite diretamente
* Não contêm regras de negócio de domínio
* Recebem dados e callbacks via props

---

## Core

**Localização**

```text
src/core
```

### Responsabilidades

Infraestrutura global da aplicação.

Exemplos:

* Inicialização do SQLite
* Migrations
* Schemas SQL
* Tema global
* Configurações globais

---

### Database

**Localização**

```text
src/core/database
```

### Responsabilidades

#### database.ts

Responsável pela criação e acesso à conexão SQLite.

#### schema.ts

Responsável pela definição das tabelas.

#### migrations.ts

Responsável pela execução automática das migrations.

#### types.ts

Responsável por tipos relacionados à infraestrutura do banco.

---

### Theme

**Localização**

```text
src/core/theme
```

### Responsabilidades

Define o tema visual global do aplicativo (cores, spacing, radius) para os modos claro e escuro, e expõe o hook de consumo do tema.

#### tokens.ts

Define os tokens de cor (`palette`, `lightTheme`, `darkTheme`), `spacing` e `radius`. Estilização é feita via `StyleSheet.create` do React Native, sem dependência de bibliotecas externas de CSS.

#### useAppColorScheme.ts

Hook que expõe o tema ativo (`theme`), o modo atual (`colorScheme`, `isDark`) e as ações de troca manual (`setColorScheme`, `toggleColorScheme`). O modo é controlado manualmente pelo usuário (override), não segue o tema do sistema operacional automaticamente. O estado é mantido via Zustand (`src/store/themeStore.ts`).

#### index.ts

Ponto único de exportação do módulo de tema (tokens, tipos e hook).

> Nota histórica: a estilização do app foi inicialmente planejada com NativeWind v5 (Tailwind CSS para React Native). Após instabilidades não resolvidas na versão preview (classes não aplicadas em runtime), o projeto migrou para `StyleSheet` nativo do React Native, eliminando a dependência externa.

---

## Store

**Localização**

```text
src/store
```

Estado global de UI, gerenciado com Zustand. Não armazena dados persistentes de domínio (isso é responsabilidade do SQLite via repositórios).

### themeStore.ts

Armazena o `colorScheme` ativo (`light` | `dark`) e expõe as ações `setColorScheme` e `toggleColorScheme`, consumidas pelo hook `useAppColorScheme`.

---

# Persistência de Dados

A aplicação utiliza SQLite como mecanismo de persistência local.

Fluxo de acesso:

```text
UI
 ↓
Repository
 ↓
SQLite
```

Fluxo detalhado:

```text
Tela
 ↓
PlantRepository
 ↓
getDatabase()
 ↓
SQLite
```

Nenhuma tela deve executar consultas SQL diretamente.

---

# Banco de Dados

## Tabela Plants

Responsável pelo armazenamento das plantas cadastradas.

Campos atuais:

```text
id
name
species
created_at
```

---

## Tabela Activities

Responsável pelo armazenamento de atividades relacionadas às plantas.

A estrutura é criada através das migrations do projeto.

---

# Convenções de Nomenclatura

## Componentes

```text
PascalCase
```

Exemplos:

```text
Button.tsx
Card.tsx
PlantCard.tsx
PlantForm.tsx
```

---

## Repositórios

```text
camelCase + repository
```

Exemplos:

```text
plant.repository.ts
```

---

## Hooks

```text
camelCase com prefixo use
```

Exemplos:

```text
usePlants.ts
useAppColorScheme.ts
```

---

## Stores (Zustand)

```text
camelCase + Store
```

Exemplos:

```text
themeStore.ts
```

---

## Tipos

```text
types.ts
```

Exemplos:

```text
Plant
Activity
Theme
ColorScheme
```

---

## Rotas

```text
minúsculo
```

Exemplos:

```text
plant/
settings/
dev-preview
```

---

# Regras de Dependência

Fluxo permitido:

```text
app
 ↓
features
 ↓
core
```

```text
shared/components
 ↓
core/theme
```

### Regras

* App não acessa SQLite diretamente.
* SQL permanece isolado nos repositórios.
* Features não dependem diretamente de outras features.
* Core não depende de features.
* Componentes de interface não executam consultas SQL.
* Toda persistência passa pelo repositório correspondente.
* Componentes de `shared/components` só dependem de `core/theme`, nunca de `features` ou `core/database`.
* Estilização é feita exclusivamente via `StyleSheet` do React Native; nenhuma dependência externa de CSS/Tailwind é utilizada no projeto.

---

# RFC #14 — Extensão de Monetização, Anúncios e Resiliência (Planejado)

> Seção de decisão arquitetural (ADR). Documenta o que foi definido para a Issue #14, ainda
> **não implementado**. A seção "Estrutura Atual do Projeto" acima continua refletindo apenas
> o que já existe em código — esta seção passa a ser incorporada ali, módulo por módulo,
> conforme cada issue do RFC #14 for implementada e mergeada.

---

## 1. Extensão da Estrutura de Pastas

```text
src/
├── core/
│   ├── database/
│   ├── theme/
│   ├── billing/               # NOVO — infraestrutura de faturamento (RevenueCat / Play Billing)
│   │   ├── billing.service.ts
│   │   └── types.ts
│   │
│   ├── remoteConfig/          # NOVO — controle dinâmico de variáveis em runtime (Firebase)
│   │   └── config.service.ts
│   │
│   └── cloud/                 # NOVO — infraestrutura de sincronização em nuvem (Firestore)
│       ├── cloud.service.ts
│       └── types.ts
│
├── features/
│   ├── plants/
│   ├── garden-world/
│   └── monetization/           # NOVO — regras de negócio de faturamento e ads
│       ├── components/
│       │   └── PaywallModal.tsx
│       ├── store/
│       │   └── premiumStore.ts
│       └── types.ts
│
├── shared/
│   └── components/
│       └── RewardedAdButton.tsx   # movido para cá — ver Regra 4
│
└── store/
    └── themeStore.ts
```

---

## 2. Nova Convenção de Nomenclatura: Services

Módulos de infraestrutura em `core/` que encapsulam um SDK externo (billing, remote config,
cloud sync) seguem o padrão:

```text
camelCase + .service.ts
```

Exemplos:

```text
billing.service.ts
config.service.ts
cloud.service.ts
```

**Responsabilidade de um `*.service.ts`:** expor primitivas técnicas do SDK (ex:
`getEntitlements()`, `getRemoteValue(key)`, `syncCollection(name)`). **Nunca** contém decisão
de negócio (ex: "usuário pode acessar X porque é premium" é regra de negócio e pertence à
feature correspondente, não ao service).

---

## 3. Regra: Fonte da Verdade de Entitlement fica no Core

`core/billing/billing.service.ts` é a **única fonte da verdade** sobre o status de assinatura
do usuário (`isPremium()`, `getEntitlements()`). `features/monetization` **consome** essa
informação para orquestrar regras de negócio (quando mostrar paywall, qual oferta exibir) —
não duplica nem recalcula o status por conta própria.

**Motivo:** qualquer feature (`plants`, `garden-world`, etc.) pode depender de `core`
livremente (fluxo já permitido: `features → core`). Se o status de premium vivesse apenas em
`features/monetization`, nenhuma outra feature poderia consultá-lo sem violar a regra
"Features não dependem diretamente de outras features".

```text
garden-world  ──┐
plants        ──┼──→ core/billing.isPremium()   ✅ permitido
monetization  ──┘

garden-world  ────→  features/monetization        ❌ proibido
```

---

## 3.1. Cache de Status de Entitlement — nunca no SQLite

O status de assinatura (premium/free) **não** ganha tabela própria em `core/database`. A
fonte da verdade é o provedor externo (RevenueCat/Play Billing); duplicar isso em SQLite via
repositório cria risco de dessincronia (ex: usuário cancela a assinatura e o SQLite continua
dizendo "premium").

Para resiliência offline, `core/billing/billing.service.ts` mantém um **cache leve** do
último status conhecido usando `expo-secure-store` (ou `AsyncStorage`), nunca uma tabela SQL.
Mesma regra vale para `core/remoteConfig` — o próprio SDK do Firebase já faz cache local
automático, não é necessário replicar isso em SQLite.

```text
core/billing     → cache leve (SecureStore), não SQLite
core/remoteConfig → cache do próprio SDK, não SQLite
core/database     → reservado a dado relacional de domínio (plants, activities, xp_log, ...)
```

---

## 4. Extensão da Regra de Dependência de `shared/components`

Regra atual: `shared/components` só depende de `core/theme`.

**Nova regra:** `shared/components` pode depender de **qualquer módulo de infraestrutura em
`core/`** (`core/theme`, `core/billing`, `core/remoteConfig`, `core/cloud`), mas continua
**nunca** dependendo de `features/` ou `core/database` diretamente.

**Motivo prático:** componentes de anúncio genéricos (`RewardedAdButton`) precisam ser
reaproveitados por múltiplas features (ex: `garden-world` oferecendo "assista um anúncio
para reduzir o cooldown de XP"). Se esse componente ficasse preso em
`features/monetization/components/`, nenhuma outra feature poderia usá-lo sem quebrar a regra
de baixo acoplamento entre features.

- `PaywallModal.tsx` **permanece** em `features/monetization/components/` — só a própria
  feature decide quando exibir paywall, não é reaproveitado por outras.
- `RewardedAdButton.tsx` **move-se** para `shared/components/` — é um trigger "burro" (recebe
  `onReward` via prop), sem regra de negócio embutida, consumindo `core/billing` ou um futuro
  `core/ads` apenas para disparar o SDK do anúncio.

---

## 5. Stores por Feature (extensão da convenção de Stores)

Regra atual: Zustand vive em `src/store/` como estado **global de UI**, sem dados persistentes
de domínio.

**Nova regra:** quando o estado é específico do domínio de uma feature (ex: status de premium
em cache reativo, não a fonte de verdade — que é `core/billing`), o store pode viver **dentro
da própria feature**, em `features/<feature>/store/`.

```text
src/store/                          → estado global de UI, cross-cutting (tema, etc.)
features/<feature>/store/           → estado reativo específico daquela feature
```

Convenção de nome (`camelCase + Store`) permanece igual em ambos os casos.

---

## 6. Banco de Dados em Nuvem: Firestore, não MongoDB

Para sincronização guest→Google e resiliência offline, o projeto adota **Firebase Firestore**
em vez de um banco autogerenciado (ex: MongoDB).

**Motivo:** MongoDB exigiria um backend próprio hospedado para mediar o acesso do app
(nenhum SDK cliente seguro para mobile), o que contradiz diretamente o objetivo de
"manutenção zero" do RFC #14. Firestore oferece SDK cliente oficial para Expo/React Native,
integra nativamente com o mesmo login Google já usado no onboarding (via Security Rules, sem
middleware de autorização próprio) e elimina a necessidade de qualquer servidor mantido pelo
time.

`core/cloud/cloud.service.ts` expõe as primitivas de sincronização (leitura/escrita de
coleções, resolução de timestamp) usadas pelo fluxo de migração guest→Google já desenhado
anteriormente — sem conter regra de negócio de qual dado sincronizar primeiro ou como resolver
conflito (isso permanece na camada de feature/tela que orquestra a migração).

---

## 7. Regras de Dependência — Diff

Regras atuais mantidas, com os seguintes acréscimos:

```diff
  * App não acessa SQLite diretamente.
  * SQL permanece isolado nos repositórios.
  * Features não dependem diretamente de outras features.
  * Core não depende de features.
  * Componentes de interface não executam consultas SQL.
  * Toda persistência passa pelo repositório correspondente.
- * Componentes de `shared/components` só dependem de `core/theme`, nunca de `features` ou `core/database`.
+ * Componentes de `shared/components` podem depender de qualquer módulo de infraestrutura em
+   `core/` (theme, billing, remoteConfig, cloud), nunca de `features` ou `core/database`.
  * Estilização é feita exclusivamente via `StyleSheet` do React Native; nenhuma dependência externa de CSS/Tailwind é utilizada no projeto.
+ * `core/billing` é a única fonte da verdade sobre status de assinatura (entitlement); features consomem, não duplicam.
+ * Stores Zustand específicos de domínio podem viver em `features/<feature>/store/`; `src/store/` permanece reservado a estado global de UI.
+ * Sincronização em nuvem (Firestore) fica isolada em `core/cloud`; a lógica de conflito/ordem de migração pertence à camada de tela/hook que orquestra a feature de auth.
+ * Status de entitlement (billing) e valores de remote config usam cache leve (SecureStore/SDK), nunca tabela própria em `core/database`.
```
