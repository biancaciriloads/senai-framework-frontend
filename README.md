# Repositório Oficial - Disciplina: Frameworks Front-end
**Instituição:** SENAI  
**Professor:** Me. Deivison S. Takatu  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS)  

---

## 📚 Visão Geral do Repositório
Este documento (`README.md`) consolida os resumos, conceitos práticos e diretrizes de todas as aulas ministradas ao longo do semestre na disciplina de **Frameworks Front-end**. O repositório foi estruturado em grupo para centralizar o histórico de atividades, códigos-fonte de projetos e documentações técnicas.

---
## 🔗 Portfólio de Projetos e Atividades Publicadas
Abaixo estão listados os links de acesso direto aos deploys das aplicações desenvolvidas ao longo das aulas, organizados por tecnologia e atividade:

| Aula / Atividade | Projeto / Tecnologia | Link de Acesso (Deploy) |
| :--- | :--- | :--- |
| **Aula 01** | Atividade Prática 01 (Vanilla JS / HTML / CSS) | [Acessar Projeto (Vercel)](https://senai-projeto-vanilla-js-rho.vercel.app/) |
| **Aula 02 / 03** | Projeto React.js | [Acessar Projeto (Vercel)](https://projeto-react-01-three.vercel.app/) · [Código-fonte local](<Aula_02_Configuração do Ambiente de Desenvolvimento/React/>) |
| **Aula 03** | Projeto Vue.js (Vite) | [Deploy anterior (template)](https://meu-projeto-vue-pi.vercel.app/) · [Código-fonte local](<Aula_03_Projetos com Frameworks Front-end/Projeto_02_Vue/>) |
| **Aula 03** | Projeto Angular | [Deploy anterior (dashboard de clima)](https://meu-app-angular-1.vercel.app/) · [Código-fonte local](<Aula_03_Projetos com Frameworks Front-end/Projeto_03_Angular/>) |
| **Aula 03** | Projeto 04 — Next.js | [Deploy anterior (template genérico)](https://projeto-next-sooty.vercel.app/) · [Código-fonte local](<Aula_03_Projetos com Frameworks Front-end/Projeto_04_Nextjs/>) |
| **Aula 05** | Gerenciador de notas (React + Express) | Deploy pendente · [Código e instruções locais](<Aula_05_Consumindo APIs no Front-end/Atividade_aula05/>) |
| **Aula 06** | Projeto Integrador — Atende+ | [Escopo, backlog e Kanban locais](<Aula_06_Projetos_Front-end/Projeto_Integrador_AtendeMais/>) |
| **Aula 07** | Atividade 01 — Box Model e Flexbox | Deploy pendente · [Código e instruções locais](<Aula_07_Frameworks_CSS/Atividade_01_Box_Model_Flexbox/>) |
| **Aula 07** | Atividade 02 — Agenda com Tailwind CSS | Deploy pendente · [Código, evidências e instruções locais](<Aula_07_Frameworks_CSS/Atividade_02_Tailwind/>) |
| **Aula 08** | Projeto React — PixelPlay | Deploy pendente · [Código e instruções locais](<Aula_08_Projeto_React/>) |
| **Aula 09** | Projeto React 02 — Mural Descobertas | Deploy pendente · [Código e instruções locais](<Aula_09_Projeto_React_02/>) |

---

## 📋 Sumário Geral das Aulas
- [Aula 01: Apresentação da Disciplina e Contextualização](#aula-01---apresentação-da-disciplina-e-contextualização)
- [Aula 02: Configuração do Ambiente de Desenvolvimento](#aula-02---configuração-do-ambiente-de-dessenvolvimento)
- [Aula 03: Projetos com Frameworks Front-end](#aula-03---projetos-com-frameworks-front-end)
- [Aula 04: Consumindo APIs no Front-end](#aula-04---consumindo-apis-no-front-end)
- [Aula 05: Criando APIs para o Front-end](#aula-05---criando-apis-para-o-front-end)
- [Aula 06: Projetos Front-end](#aula-06---projetos-front-end)
- [Aula 07: Frameworks CSS](#aula-07---frameworks-css)
- [Aula 08: Projeto React](#aula-08---projeto-react)
- [Aula 09: Projeto React 02](#aula-09---projeto-react-02)

---

## Aula 01 - Apresentação da Disciplina e Contextualização

### Objetivos e Contexto
- **Desenvolvimento Front-end:** Camada de interação direta com o usuário, exigindo arquiteturas escaláveis, interfaces limpas e responsivas.
- **Importância dos Frameworks:** Necessidade de padronização, componentização e produtividade na criação de aplicações web modernas.

### Metodologia e Critérios de Avaliação (100%)
- **55% - Avaliação Docente:**
  - 20% - Desenvolvimento de Projeto
  - 20% - Apresentação do Projeto (Mini TCC / Backlog / Benchmarking)
  - 15% - Realização das Atividades Práticas Semanais
- **35% - Projeto Integrador**
- **10% - Autoavaliação**

---

## Aula 02 - Configuração do Ambiente de Desenvolvimento

### 1. Versionamento x Backup
- **Versionamento:** Histórico detalhado por alteração (autor, data, motivo), permitindo colaboração simultânea com *merge* e reversão granular.
- **Backup:** Cópia pontual do estado atual sem rastreabilidade de autoria ou fusão segura.

### 2. Versionamento Semântico (SemVer)
Padrão **`MAJOR.MINOR.PATCH`**:
- **`MAJOR`:** Mudanças que quebram a compatibilidade com versões anteriores.
- **`MINOR`:** Adição de funcionalidades mantendo a retrocompatibilidade.
- **`PATCH`:** Correção de bugs e ajustes sem alterar a API.

### 3. Ferramentas e Ecossistema
- **Git & GitHub:** Controle de versão distribuído criado por *Linus Torvalds*. Uso de tags leves e anotadas.
- **Visual Studio Code (VS Code):** Editor leve configurado como IDE através de extensões.
- **Node.js & NPM:** Ambiente de execução JavaScript voltado ao backend e gerenciamento automatizado de dependências via `package.json`.
- **Criação de Projetos React:** Inicializados com `npx create-react-app` ou equivalentes modernos, estruturados nas pastas `node_modules`, `public` e `src`.
- **Deploy com Vercel:** Hospedagem otimizada para aplicações estáticas e modernas com integração contínua via Git.

---

## Aula 03 - Projetos com Frameworks Front-end

### 1. Framework vs. Biblioteca
- **Biblioteca (Ex: React):** Flexível, o desenvolvedor controla o fluxo (*Inversion of Control* manual).
- **Framework (Ex: Angular):** Estrutura rígida e padronizada, onde o framework gerencia o ciclo de vida e a execução.

### 2. Visão Geral das Tecnologias
- **React (Biblioteca):** Baseado em componentes, JSX (HTML + JS em `camelCase`), *Virtual DOM* para alta performance e Hooks (`useState`, `useEffect`).
- **Angular (Framework Completo):** Baseado em TypeScript, injeção de dependências, arquitetura robusta para SPAs e CLI avançada (`ng new`, `ng serve`).
- **Vue.js (Framework Progressivo):** Curva de suave aprendizado, reatividade eficiente e *Single-File Components* (`.vue`).
- **Next.js (Framework Full-stack sobre React):** Focado em renderização no servidor (*SSR*), roteamento baseado em arquivos e otimizações de SEO.

## Aula 04 - Consumindo APIs no Front-end

### Atividades documentadas
- [Atividade 01: pesquisa de projetos que consomem APIs](<Aula_04_Consumindo APIs no Front-end/Atividade_01.md>)
- [Atividade 02: API de data e hora com frontend React](<Aula_04_Consumindo APIs no Front-end/Atividade_02/>)

### 1. Conceitos de API e Protocolo HTTP
- **REST:** Estilo arquitetural cliente-servidor *stateless* baseado em URIs e transferência de dados via JSON.
- **Métodos HTTP:**
  - `GET`: Recupera dados (seguro e idempotente).
  - `POST`: Cria novos recursos.
  - `PUT` / `PATCH`: Atualizam recursos (substituição total vs. parcial).
  - `DELETE`: Remove recursos.
- **Endpoint:** URL específica de acesso a um recurso na API.

### 2. Criando um Servidor com Express.js
Framework minimalista para Node.js que simplifica a criação de rotas e middlewares.
```javascript
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({ date: new Date().toLocaleString('pt-BR'), status: 'API Online' });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
```
- **Hospedagem no Render:** Plataforma em nuvem utilizada para simulação e deploy contínuo de Web Services via GitHub.

---

## Aula 05 - Criando APIs para o Front-end

### Atividade documentada
- [Gerenciador de notas: API Express, frontend React, testes e collection Postman](<Aula_05_Consumindo APIs no Front-end/Atividade_aula05/>)
- Os links dos repositórios e deploys serão preenchidos no README da atividade após publicação manual.

### 1. Implementando um CRUD Completo
Evolução do projeto para um aplicativo de notas (*Notes App*) persistido em arquivos locais (`data.json`) utilizando as operações:
- `GET /api/notes` (Listar)
- `POST /api/notes` (Criar)
- `GET /api/notes/:id` (Buscar por ID)
- `PUT /api/notes/:id` (Atualizar)
- `DELETE /api/notes/:id` (Excluir)

### 2. Documentação com Postman
Utilização do Postman para testes manuais, organização de coleções de requisições HTTP, verificação de códigos de status (`200 OK`, `404 Not Found`) e simulação de ambientes.

---

## Aula 06 - Projetos Front-end

### Atividade documentada
- [Projeto Integrador Atende+: escopo, backlog priorizado, histórias, Kanban, branches e Definition of Done](<Aula_06_Projetos_Front-end/Projeto_Integrador_AtendeMais/>)
- O Kanban foi registrado em Markdown no repositório local; nenhum board externo, repositório ou deploy foi criado nesta atividade.

---

## Aula 07 - Frameworks CSS

### Atividade 01 documentada
- [Box Model e vinte demonstrações de Flexbox](<Aula_07_Frameworks_CSS/Atividade_01_Box_Model_Flexbox/>)

### Atividade 02 documentada
- [Agenda Atende+ com Tailwind CSS, funcionalidades, evidências e catálogo de classes](<Aula_07_Frameworks_CSS/Atividade_02_Tailwind/>)
- Os links do repositório e do deploy serão preenchidos no README da atividade após publicação manual.

---

## Aula 08 - Projeto React

### Atividade documentada
- [PixelPlay: biblioteca interativa que demonstra JSX, componentes, props, listas com keys e renderização condicional](<Aula_08_Projeto_React/>)
- Os links do repositório e da aplicação serão preenchidos no README da atividade após publicação manual.

---

## Aula 09 - Projeto React 02

### Atividade documentada
- [Descobertas: mural React com estado, formulário, useEffect, consumo de API e React Router](<Aula_09_Projeto_React_02/>)
- Os links do repositório e da aplicação serão preenchidos no README da atividade após publicação manual.

---

## 🚀 Conclusão e Entrega das Atividades
Os links de repositórios e deploys pendentes serão adicionados aos READMEs das respectivas atividades após a publicação manual.
