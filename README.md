# Repositório Oficial - Disciplina: Frameworks Front-end
**Instituição:** SENAI  
**Professor:** Me. Deivison S. Takatu  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS)  

---

## 📚 Visão Geral do Repositório
Este documento (`README.md`) consolida os resumos, conceitos práticos e diretrizes de todas as aulas ministradas ao longo do semestre na disciplina de **Frameworks Front-end**. O repositório foi estruturado em grupo para centralizar o histórico de atividades, códigos-fonte de projetos e documentações técnicas.

---

## 📋 Sumário Geral das Aulas
- [Aula 01: Apresentação da Disciplina e Contextualização](#aula-01---apresentação-da-disciplina-e-contextualização)
- [Aula 02: Configuração do Ambiente de Desenvolvimento](#aula-02---configuração-do-ambiente-de-dessenvolvimento)
- [Aula 03: Projetos com Frameworks Front-end](#aula-03---projetos-com-frameworks-front-end)
- [Aula 04: Consumindo APIs no Front-end](#aula-04---consumindo-apis-no-front-end)
- [Aula 05: Criando APIs para o Front-end](#aula-05---criando-apis-para-o-front-end)

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

---

## Aula 04 - Consumindo APIs no Front-end

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

## 🚀 Conclusão e Entrega das Atividades
Todos os projetos práticos desenvolvidos ao longo da disciplina contam com separação entre Back-end (hospedado no Render) e Front-end (hospedado na Vercel), devidamente versionados e documentados neste repositório institucional do SENAI.