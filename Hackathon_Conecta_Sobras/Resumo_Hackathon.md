# Resumo do Hackathon: Mesa Circular — Compartilhamento Comunitário de Alimentos
**Instituição:** SENAI  
**Disciplina:** Frameworks Front-end  
**Professor:** Me. Deivison S. Takatu  

---

## 1. Sumário
- Adaptação acadêmica do projeto de referência **Conecta Sobras** (Hackathon frameworks front-end)
- Desenvolvimento de uma **SPA React + Vite + Tailwind CSS + React Router** para aproximar doadores de excedentes alimentares de coletores
- Implementação local com identidade própria (**Mesa Circular**), namespace de dados `mesa-circular:*` e escopo distinto do repositório de referência
- Documentação de execução, roteiro de demonstração e checklist de publicação

---

## 2. Referência e Distinção de Escopo

| Aspecto | Repositório de Referência (`guibuenoc/hackthon-frameworks`) | Adaptação Local (`Hackathon_Conecta_Sobras`) |
|---|---|---|
| **Nome** | Conecta Sobras | **Mesa Circular** |
| **ODS** | ODS 2 (Fome Zero) + ODS 12 (Consumo Responsável) | Mantidas |
| **Stack** | React, Vite, Tailwind CSS, React Router, `localStorage` | **Idêntica** |
| **Deploy** | Vercel (configurado) | Vercel (configurado via `vercel.json` rewrite SPA) |
| **Dados** | 50 cards reais, protótipo 10 telas, 30+ commits | **4 registros fictícios** para demonstração; sem dados reais |
| **Autenticação** | Prevista no roteiro | **Não implementada** (escopo local) |
| **Backend/API** | Previsto no roteiro | **Não há** (persistência apenas `localStorage`) |
| **Sincronização** | Prevista | **Não há** (dados isolados por navegador) |
| **Board/Kanban** | Não confirmado | **Não criado** nesta tarefa |

> **Importante:** O repositório de referência foi consultado **somente para leitura**. Nenhum repositório externo foi alterado.

---

## 3. Principais Conceitos e Tecnologias Aplicados

| Tecnologia/Conceito | Aplicação no Projeto |
|---|---|
| **React 18** | Componentes funcionais, Hooks (`useState`, `useEffect`, `useNavigate`, `useParams`) |
| **Vite** | Build tool: `npm run dev` (HMR), `npm run build` (produção em `dist/`), `npm run preview` |
| **Tailwind CSS** | Utility-first: tema customizado (cores, tipografia, espaçamento, sombras), responsividade via prefixos `sm:`, `md:`, `lg:`, `xl:` |
| **React Router v6** | SPA: `BrowserRouter`, rotas aninhadas, `Outlet`, `Link`, `useParams`, página 404 |
| **Persistência Local** | `localStorage` com namespace `mesa-circular:*` (doações, reservas, histórico, impacto) |
| **Estados Complexos** | Feed com filtros (texto, categoria, status), formulários controlados, validação, feedback visual |
| **Acessibilidade** | Foco visível (`focus:ring-4`), navegação por teclado, semântica HTML, `prefers-reduced-motion` |
| **Responsividade** | Mobile-first: 1 coluna → 2 → 4 (breakpoints Tailwind) |
| **Deploy Vercel** | `vercel.json` com rewrite para SPA (`/*` → `/index.html`); build `npm run build`; output `dist/` |

---

## 4. Funcionalidades Implementadas
1. **Cadastro demonstrativo** de doações (campos validados)
2. **Publicação de doação** com categoria, descrição, validade, local
3. **Busca e filtros**: texto livre, categoria, status (disponível/reservado/coletado)
4. **Detalhes da doação** em rota dedicada (`/doacoes/:id`)
5. **Reserva** de doação disponível → muda status para "reservada"
6. **Confirmação de coleta** → status "coletado", registro no histórico
7. **Histórico** de coletas realizadas pelo usuário atual
8. **Painel de impacto** com indicadores (total doado, coletado, reservado, doadores)
9. **Navegação SPA** acessível por teclado, transições suaves

---

## 5. Estrutura / Arquivos Principais da Entrega
`Hackathon_Conecta_Sobras/`

| Arquivo/Pasta | Descrição |
|---|---|
| `src/` | Código-fonte da aplicação React |
| `src/pages/` | Páginas: `DonationsPage`, `DonationDetailPage`, `PublishPage`, `HistoryPage`, `ImpactPage`, `RegisterPage`, `ReservationsPage` |
| `src/components/` | Componentes reutilizáveis: cards, formulários, filtros, layout, UI |
| `src/hooks/` | Hooks customizados (ex: `useLocalStorage`, `useDonations`) |
| `src/context/` | Context API para estado global (doações, usuário demo) |
| `src/styles.css` | Importação Tailwind (`@tailwind base/components/utilities`) + estilos globais |
| `src/main.jsx` | Entry point: `BrowserRouter`, providers, `App` |
| `src/App.jsx` | Rotas da aplicação |
| `index.html` | HTML de entrada Vite |
| `package.json` | Dependências: `react`, `react-dom`, `react-router-dom`, `tailwindcss`, `vite`, `postcss`, `autoprefixer` |
| `vite.config.js` | Configuração Vite + plugin React + Tailwind |
| `tailwind.config.js` | Tema customizado: cores `brand`, `brand-soft`, `ink`, `page`, `line`, sombras, tipografia |
| `postcss.config.js` | Configuração PostCSS para Tailwind |
| `vercel.json` | Rewrite SPA: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` |
| `README.md` | Documentação principal: referências, execução, publicação, distinção de escopo |
| `ROTEIRO.md` | Roteiro de demonstração (4 min): preparação, fluxos, checklist pré-apresentação |

---

## 6. Roteiro de Demonstração (Resumo do `ROTEIRO.md`)
| Etapa | Tempo | Descrição |
|---|---|---|
| **Contexto e objetivo** | 1 min | Apresentar Mesa Circular, relação com ODS 2 e 12 |
| **Encontrar uma oferta** | 1 min | Filtrar doações, abrir detalhes, reservar oferta disponível |
| **Publicar e acompanhar** | 1 min | Criar doação fictícia, confirmar coleta, mostrar histórico/painel de impacto |
| **Arquitetura e próximos passos** | 1 min | Mostrar stack (React, Vite, Tailwind, Router, `localStorage`), status de publicação |

**Checklist antes da apresentação:**
- [ ] `npm test` e `npm run build` aprovados
- [ ] Fluxos (cadastro, criação, reserva, coleta) verificados
- [ ] Layout em tela estreita e navegação por teclado revisados
- [ ] Protótipo/benchmarking e entregáveis do roteiro do curso registrados
- [ ] Publicação na Vercel concluída e URL registrada
- [ ] Não apresentar exemplos fictícios como doações reais

---

## 7. Status de Deploy / Observações
- **Build:** `npm run build` → `dist/` (SPA pronta para Vercel)
- **Deploy:** Vercel configurado via `vercel.json` (rewrite para SPA); **URL pendente de publicação**
- **Checklist no README:** Repositório do curso e URL Vercel a preencher após deploy manual
- **Requisitos:** Node.js compatível com Vite instalado; `npm install` → `npm run dev`
- **Validação pendente:** `npm test` e `npm run build` não foram executados no ambiente atual (sem Node/npm disponíveis)
- **Dados:** 4 registros fictícios em `localStorage`; não representam os 50 cards reais do roteiro de referência
- **Escopo:** Adaptação acadêmica; sem autenticação, backend, API, sincronização ou dados reais

---

## 8. Referências
- Repositório de referência (somente leitura): https://github.com/guibuenoc/hackthon-frameworks
- Repositório do curso: https://github.com/biancaciriloads/senai-framework-frontend
- Vercel (deploy SPA): https://vercel.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React Router: https://reactrouter.com/