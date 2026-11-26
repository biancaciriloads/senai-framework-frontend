# Resumo da Aula 09: Projeto React 02 — Mural Descobertas
**Instituição:** SENAI  
**Disciplina:** Frameworks Front-end  
**Professor:** Me. Deivison S. Takatu  

---

## 1. Sumário da Aula
- Desenvolvimento de uma aplicação React de **mural comunitário** (*Descobertas*)
- Prática avançada: estado complexo, formulários controlados, `useEffect` para consumo de API, **React Router** (SPA com rotas aninhadas)
- Integração com API pública **JSONPlaceholder** (`/posts`)
- Validação de formulário, estados de carregamento/erro/vazio, layout responsivo e acessível

---

## 2. Objetivo da Atividade
Construir uma Single Page Application (SPA) que permita:
- Visualizar um feed de publicações carregadas de uma API externa
- Buscar publicações por título/descrição
- Criar novas publicações via formulário controlado com validação
- Navegar para página de detalhes de cada publicação (rota dinâmica `/posts/:postId`)
- Gerenciar estados assíncronos (loading, erro, sucesso) com `useEffect` e limpeza de requisições

---

## 3. Principais Conceitos e Tecnologias Aplicados

| Conceito | Aplicação no Projeto |
|---|---|
| **State (`useState`)** | Controla: lista de posts, termo de busca, campos do formulário (`title`, `body`), status de envio (`idle` \| `submitting` \| `success` \| `error`), mensagens de feedback |
| **Formulários Controlados** | Inputs (`title`, `body`) sincronizados com estado; validação: campos obrigatórios, limite de caracteres, `trim()` antes de validar/enviar |
| **`useEffect`** | Busca inicial do feed (`GET /posts?_limit=12`); busca de detalhes ao montar/alterar `postId`; **limpeza** com `AbortController` para cancelar requisições ao desmontar |
| **Consumo de API** | Módulo `src/api/posts.js`: funções `fetchPosts`, `fetchPostById`, `createPost` usando `fetch` nativo; verificação `response.ok`; parsing JSON; tratamento de erros HTTP |
| **React Router v6** | `BrowserRouter`, rotas aninhadas com `Outlet`, `Link`/`NavLink`, `useParams` para `:postId`, página 404 (`*`) |
| **SPA / Navegação** | Transições sem recarregamento; rota de detalhes dinâmica; fallback para rota inexistente |
| **Vite** | Dev server com HMR (`npm run dev`); build de produção (`npm run build`); preview (`npm run preview`) |
| **CSS Responsivo** | `src/styles.css`: variáveis, Grid/Flexbox, breakpoints, estados de loading/erro/vazio, foco visível, navegação por teclado |

---

## 4. Estrutura / Arquivos Principais da Entrega
`Aula_09_Projeto_React_02/`

| Arquivo/Pasta | Descrição |
|---|---|
| `src/App.jsx` | Mapa de rotas: `/` (Feed), `/posts/:postId` (Detalhes), `*` (404); providers de contexto se houver |
| `src/pages/FeedPage.jsx` | Feed principal: busca, estado de loading/erro/vazio, lista de `PostCard`, integração com `PostForm` |
| `src/pages/PostDetailPage.jsx` | Página de detalhes: lê `postId` via `useParams`, busca dados com `useEffect`, exibe título/corpo/autor |
| `src/components/PostForm.jsx` | Formulário controlado: `title` (máx. 100 chars), `body` (máx. 500 chars), validação no submit, feedback visual |
| `src/components/PostCard.jsx` | Cartão reutilizável do feed: título, trecho do corpo, link para detalhes |
| `src/api/posts.js` | Camada de API: `fetchPosts(limit?)`, `fetchPostById(id)`, `createPost(data)` — base URL JSONPlaceholder |
| `src/styles.css` | Estilos globais: layout, tipografia, cards, formulário, estados (loading spinner, erro, vazio), responsividade, acessibilidade |
| `src/main.jsx` | Entry point: `createRoot`, `BrowserRouter`, `App`, importação de `styles.css` |
| `index.html` | HTML de entrada Vite |
| `package.json` | Dependências: `react`, `react-dom`, `react-router-dom`; devDependencies: `vite`, `@vitejs/plugin-react` |
| `vite.config.js` | Configuração Vite padrão |
| `README.md` | Documentação: execução, funcionalidades, tabela de conceitos, estrutura, limitações da API, checklist publicação |

---

## 5. Funcionalidades Implementadas
1. **Feed de publicações**: `GET /posts?_limit=12` ao carregar; exibição em cards
2. **Busca em tempo real**: Filtro local por título e descrição (case-insensitive)
3. **Formulário de criação**: Campos `title` e `body` controlados; validação (obrigatórios, limites, `trim()`); `POST /posts` com feedback de sucesso/erro
4. **Página de detalhes**: Rota `/posts/:postId`; `GET /posts/:id`; exibição completa
5. **Estados de interface**: Loading (spinner), Erro (mensagem + botão retry), Vazio (sem resultados + limpar busca)
6. **Navegação acessível**: Links semânticos, foco visível, teclado
7. **Layout responsivo**: Adaptação mobile/tablet/desktop
8. **Rota 404**: Página amigável para rotas inexistentes

---

## 6. Limitações Conhecidas (API JSONPlaceholder)
- O endpoint `POST /posts` **simula** a criação (retorna `201` com o objeto enviado + `id`), mas **não persiste** os dados no servidor
- A publicação criada existe apenas no **estado local da sessão** (React)
- Ao recarregar a página de detalhes de um post criado localmente, o `GET /posts/:id` retornará `404` (o ID não existe no backend)
- **Não usar dados pessoais** no formulário — é ambiente de demonstração

---

## 7. Status de Deploy / Observações
- **Build:** `npm run build` → pasta `dist/` (SPA)
- **Deploy indicado:** Vercel (configuração de rewrite para SPA via `vercel.json` se necessário)
- **Checklist no README:** Repositório GitHub e URL da aplicação pendentes de publicação manual
- **Requisitos:** Node.js `^22.18.0` ou `>=24.12.0`; conexão com internet obrigatória para API JSONPlaceholder
- **Dependências externas:** Apenas `react-router-dom` além do core React; API pública JSONPlaceholder

---

## 8. Referências
- React Router v6 (Documentação): https://reactrouter.com/
- JSONPlaceholder (API de teste): https://jsonplaceholder.typicode.com/
- `useEffect` e limpeza com AbortController: https://react.dev/learn/synchronizing-with-effects#controlling-non-react-components
- Vite + React: https://vitejs.dev/guide/#scaffolding-your-first-vite-project