# GreenKeeper 🌱

GreenKeeper é um aplicativo mobile desenvolvido com React Native e Expo para auxiliar no gerenciamento de plantas, hortas e pomares domésticos.

O projeto combina monitoramento de cuidados, histórico de crescimento, estatísticas e elementos de gamificação para incentivar a manutenção contínua das plantas.

## Objetivos

* Registrar plantas e frutíferas
* Acompanhar regas, adubações e podas
* Receber lembretes automáticos
* Visualizar histórico de evolução
* Gerar estatísticas de cuidados
* Criar um jardim virtual baseado nas plantas reais do usuário

## Markdown
 #### Como rodar
**Pré-requisitos:**

```
 Node 18+, Expo Go no celular ou emulador Android/iOS 
```

```bash
npm install
npx expo start
```

## Stack 

```bash
* Tecnologia | Framework = > React Native + Expo SDK

* Linguagem = > TypeScript

* Navegação = > Expo Router (file-based)

* Estado Global = > Zustand

* Banco de Dados = > SQLite (expo-sqlite)

* Notificações = > expo-notifications
 ```

### Convenções de Código
* Componentes → PascalCase ex: PlantCard.tsx
* Hooks → prefixo use ex: usePlants.ts
* Stores Zustand → sufixo Store ex: plantStore.ts
* Repositórios → sufixo Repository ex: PlantRepository.ts
* Constantes → UPPER_SNAKE_CASE ex: XP_VALUES
## Branches → 
feat/task-01-init, fix/plant-form-validation
## Regra de Ouro
Nunca acesse o SQLite diretamente nas telas ou nas stores.
### O fluxo correto é: Store (Zustand) → Repository → SQLite.
As stores gerenciam estado em memória. Os Repositories falam com o banco.
## Roadmap
