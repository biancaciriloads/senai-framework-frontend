# Aula 03 — Projetos com Frameworks Front-end

## Objetivo
Apresentar os principais frameworks front-end (React, Vue, Angular, Next.js), diferenciar biblioteca vs framework, demonstrar criação/estrutura de projetos em cada tecnologia e praticar importação de projetos modelos de repositórios externos.

---

## Principais Conceitos e Tecnologias

| Conceito | Descrição |
|---|---|
| **Framework vs Biblioteca** | Biblioteca (React): controle do dev, flexível. Framework (Angular): Inversion of Control, estrutura rígida e padronizada |
| **React** | Biblioteca (Facebook, 2013); componentes, JSX, Virtual DOM, Hooks (`useState`, `useEffect`); `npx create-react-app` ou Vite |
| **Angular** | Framework completo (Google); TypeScript nativo, injeção de dependência, módulos, CLI (`ng new`, `ng serve`) |
| **Vue.js** | Framework progressivo; curva suave, reatividade, Single-File Components (`.vue`); `npm create vue@latest` |
| **Next.js** | Framework full-stack sobre React; SSR, roteamento por arquivos, Server Components, otimizações SEO; `npx create-next-app@latest` |
| **Componentização** | Blocos independentes e reutilizáveis encapsulando lógica e design |
| **Programação Reativa** | Atualização automática da UI em resposta a mudanças de estado |
| **Build/Bundling** | Minificação, transpilação, otimização para navegadores |
| **Importação de Projetos** | GitHub (`git clone`), Vercel Templates, CodeSandbox para templates open source |

---

## Estrutura de Arquivos e Pastas

```
Aula_03_Projetos com Frameworks Front-end/
├── Projeto_02_Vue/                  # Atendimento hospitalar com Vue 3 + TypeScript + Vite
│   ├── src/                         # Components, views, stores, composables
│   ├── package.json / tsconfig.json / vite.config.ts
│   └── README.md
├── Projeto_03_Angular/              # Atendimento hospitalar com Angular 21 + TypeScript + SSR
│   ├── src/app/                     # Components standalone, signals, routes
│   ├── angular.json / package.json / tsconfig*.json
│   └── README.md
├── Projeto_04_Nextjs/               # Atendimento hospitalar com Next.js 16 + App Router + React 19
│   ├── src/app/                     # App Router, pages, components
│   ├── package.json / next.config.js / tsconfig.json
│   └── README.md
├── Resumo_Aula_03                   # Resumo detalhado da aula (sem extensão .md)
├── Aula 03 - Projetos com Frameworks Front-end.pdf  # Slides da aula
└── (Projeto_01_React não presente nesta pasta — ver Aula 02 e Aula 08)
```

---

## Atividade Prática (Grupo)
Desenvolver **quatro projetos Web sobre o mesmo tema** (atendimento hospitalar), aplicando diferentes tecnologias, além de importar um projeto modelo externo:

1. **Projeto 01** — React (ver Aula 02 / Aula 08)
2. **Projeto 02** — Vue.js (`Projeto_02_Vue/`)
3. **Projeto 03** — Angular (`Projeto_03_Angular/`)
4. **Projeto 04** — Next.js (`Projeto_04_Nextjs/`)
5. **Projeto 05** — Cópia/importação de repositório modelo externo

**Requisitos:** Todos versionados com Git, repositórios no GitHub com histórico de commits, relatório comparativo entre tecnologias.

---

## Status / Observações

| Projeto | Tecnologia | Deploy Atual | Observação |
|---|---|---|---|
| Projeto 02 | Vue 3 + TS + Vite | [meu-projeto-vue-pi.vercel.app](https://meu-projeto-vue-pi.vercel.app/) | Deploy anterior era template; versão local adaptada pendente |
| Projeto 03 | Angular 21 + SSR | [meu-app-angular-1.vercel.app](https://meu-app-angular-1.vercel.app/) | Deploy anterior era dashboard clima; versão local adaptada pendente |
| Projeto 04 | Next.js 16 + App Router | [projeto-next-sooty.vercel.app](https://projeto-next-sooty.vercel.app/) | Deploy anterior era template genérico; versão local adaptada pendente |

- **Resumo da aula:** Disponível em `Resumo_Aula_03`
- **Dados:** Fictícios, persistidos em `localStorage` — sem backend, sem dados reais de pacientes
- **Execução local:** Cada projeto tem `README.md` próprio com comandos (`npm install`, `npm run dev`/`npm start`, `npm test`, `npm run build`)

---

## Referências
- Projeto 02 (Vue): [biancaciriloads/meu_projeto_vue](https://github.com/biancaciriloads/meu_projeto_vue) (commit `7c949e9`)
- Projeto 03 (Angular): [biancaciriloads/meu-app-angular](https://github.com/biancaciriloads/meu-app-angular) (commit `84e3cc9`)
- Projeto 04 (Next.js): Deploy anterior [projeto-next-sooty.vercel.app](https://projeto-next-sooty.vercel.app/)
- Ver [README.md raiz](../../README.md) para visão geral do portfólio da disciplina