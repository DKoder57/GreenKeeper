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
│   └── _layout.tsx
│
├── core/
│   └── database/
│       ├── database.ts
│       ├── migrations.ts
│       ├── schema.ts
│       └── types.ts
│
├── features/
│   └── plants/
│       ├── repository/
│       │   └── plant.repository.ts
│       │
│       └── types.ts
│
├── shared/
│
└── store/
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

Exemplos:

* Componentes compartilhados
* Hooks genéricos
* Utilitários

Atualmente a pasta está reservada para crescimento futuro.

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

## Store

**Localização**

```text
src/store
```

Reservada para estados globais quando necessários.

Atualmente não possui responsabilidades implementadas.

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

### Regras

* App não acessa SQLite diretamente.
* SQL permanece isolado nos repositórios.
* Features não dependem diretamente de outras features.
* Core não depende de features.
* Componentes de interface não executam consultas SQL.
* Toda persistência passa pelo repositório correspondente.

```
```
