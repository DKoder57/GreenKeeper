# Arquitetura

## Visão Geral

O GreenKeeper é um aplicativo mobile desenvolvido com React Native e Expo voltado para gerenciamento de plantas, registro de cuidados, persistência local de dados e futuras funcionalidades de gamificação.

A arquitetura segue uma abordagem orientada a funcionalidades (*Feature-Based Architecture*) combinada com separação clara de responsabilidades, visando escalabilidade, manutenibilidade e evolução sustentável do projeto.

### Princípios Arquiteturais

* Separação de Responsabilidades (*Separation of Concerns*)
* Princípio da Responsabilidade Única (*Single Responsibility Principle*)
* Organização por Domínio (*Feature-Based Organization*)
* Isolamento de Contextos de Negócio
* Gerenciamento de Estado Previsível
* Tipagem Forte
* Estrutura Preparada para Produção

---

# Estrutura do Projeto

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

# Responsabilidades das Camadas

## Camada App

**Localização**

```text
src/app
```

**Responsabilidades**

* Definição de rotas
* Fluxo de navegação
* Composição de telas
* Inicialização de provedores globais

**Restrições**

* Não conter regras de negócio
* Não acessar o banco de dados diretamente
* Não realizar transformações complexas de dados

A camada App deve atuar apenas como ponto de entrada e orquestração da navegação.

---

## Camada Features

**Localização**

```text
src/features
```

**Responsabilidades**

* Regras de negócio
* Componentes específicos do domínio
* Abstrações de acesso aos dados
* Hooks do React Query
* Esquemas de validação

Cada funcionalidade deve ser autocontida e independente sempre que possível.

Exemplo:

```text
features/plants
```

Contém tudo relacionado ao gerenciamento de plantas.

---

## Camada Shared

**Localização**

```text
src/shared
```

**Responsabilidades**

Recursos reutilizáveis disponíveis para toda a aplicação.

Exemplos:

* Botões
* Inputs
* Cards
* Hooks genéricos
* Funções utilitárias

Os componentes desta camada devem permanecer independentes das regras de negócio.

Um componente compartilhado não deve possuir conhecimento sobre plantas, notificações ou conquistas.

---

## Camada Core

**Localização**

```text
src/core
```

**Responsabilidades**

Infraestrutura global da aplicação.

Exemplos:

* Configuração de temas
* Variáveis de ambiente
* Inicialização do banco de dados
* Constantes globais

A camada Core fornece a base do sistema e não deve depender de módulos de negócio.

---

## Camada Store

**Localização**

```text
src/store
```

**Responsabilidades**

Gerenciamento de estados globais relacionados à interface.

Exemplos:

* Tema ativo
* Controle de modais
* Preferências visuais
* Estados temporários da interface

Dados de negócio não devem ser armazenados nesta camada.

---

# Gerenciamento de Estado

O GreenKeeper separa os estados da aplicação de acordo com sua natureza e ciclo de vida.

## Dados Persistentes

Gerenciados por:

* React Query

Exemplos:

* Plantas cadastradas
* Histórico de cuidados
* Estatísticas
* Conquistas

Responsabilidades:

* Cache
* Sincronização
* Busca de dados
* Estados de carregamento
* Estados de erro

---

## Estado de Interface

Gerenciado por:

* Zustand

Exemplos:

* Tema selecionado
* Modais abertos
* Preferências visuais
* Estados temporários da interface

Responsabilidades:

* Atualizações rápidas
* Compartilhamento de estado visual
* Comunicação entre telas

---

# Fluxo de Dados

A aplicação segue um fluxo unidirecional de dados.

```text
UI
 ↓
Hooks
 ↓
Services
 ↓
SQLite
```

Fluxo detalhado:

```text
Tela
 ↓
Hook React Query
 ↓
Serviço do Domínio
 ↓
Banco de Dados
```

O acesso ao banco deve ocorrer exclusivamente através da camada de serviços.

---

# Validação de Formulários

Toda entrada de dados deve ser validada antes da persistência.

### Stack Recomendada

* React Hook Form
* Zod

### Responsabilidades

* Validação de entradas
* Inferência de tipos
* Feedback ao usuário
* Bloqueio de submissões inválidas

Exemplos:

* Campos obrigatórios
* Tamanho mínimo de texto
* Limites numéricos
* Validação de datas

Nenhuma operação de banco deve ser executada sem validação prévia.

---

# Tratamento de Erros

Os erros são tratados de acordo com a responsabilidade de cada camada.

## Services

**Responsabilidades**

* Executar operações no banco
* Retornar resultados
* Propagar erros quando necessário

Serviços não devem exibir mensagens, alertas ou elementos visuais.

---

## Hooks

**Responsabilidades**

* Gerenciar estados de carregamento
* Gerenciar estados de erro
* Expor o status das operações

Grande parte desse comportamento é controlada automaticamente pelo React Query.

---

## Interface

**Responsabilidades**

* Exibir estados de erro
* Exibir estados vazios
* Exibir carregamentos
* Permitir tentativas de recuperação

A interface deve responder de forma previsível e evitar falhas visíveis ao usuário.

---

# Convenções de Nomenclatura

## Componentes

**Padrão**

```text
PascalCase
```

**Exemplos**

```text
PlantCard.tsx
PrimaryButton.tsx
PlantForm.tsx
```

---

## Hooks

**Padrão**

```text
camelCase com prefixo "use"
```

**Exemplos**

```text
usePlants.ts
usePlant.ts
useTheme.ts
```

---

## Serviços

**Padrão**

```text
camelCase + sufixo Service
```

**Exemplos**

```text
plantService.ts
notificationService.ts
```

---

## Utilitários

**Padrão**

```text
camelCase
```

**Exemplos**

```text
dateFormatter.ts
stringNormalizer.ts
```

---

## Rotas e Diretórios

**Padrão**

```text
minúsculo ou kebab-case
```

**Exemplos**

```text
plant/
garden-world/
notifications/
```

---

# Regras de Dependência

Fluxo permitido:

```text
app
 ↓
features
 ↓
shared
 ↓
core
```

### Regras

* Features não devem depender diretamente de outras features.
* Recursos compartilhados devem permanecer independentes do domínio.
* Core não deve depender de features.
* O banco de dados deve ser acessado apenas por serviços.
* Componentes de interface não devem executar consultas SQL.

---

# Objetivos Arquiteturais

A arquitetura foi projetada para oferecer:

* Facilidade de manutenção
* Organização previsível do código
* Escalabilidade de funcionalidades
* Responsabilidades bem definidas
* Facilidade de aprendizado e onboarding
* Boas práticas compatíveis com ambientes de produção

Toda nova funcionalidade adicionada ao projeto deve seguir os mesmos princípios arquiteturais para preservar a consistência do código ao longo do tempo.
