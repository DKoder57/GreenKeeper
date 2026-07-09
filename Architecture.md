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