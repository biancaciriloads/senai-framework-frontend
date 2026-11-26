# Resumo da Aula 08: Projeto React — PixelPlay
**Instituição:** SENAI  
**Disciplina:** Frameworks Front-end  
**Professor:** Me. Deivison S. Takatu  

---

## 1. Sumário da Aula
- Desenvolvimento de uma aplicação React de catálogo de jogos (**PixelPlay**)
- Prática de conceitos fundamentais do React: JSX, componentes, props, estado, listas com keys, renderização condicional
- Uso de **Vite** como ferramenta de build e servidor de desenvolvimento
- Estilização com CSS customizado (variáveis, responsividade, estados de interação)

---

## 2. Objetivo da Atividade
Criar uma biblioteca interativa de jogos independentes que demonstre:
- Composição de interface com componentes reutilizáveis
- Gerenciamento de estado local (filtros, busca, favoritos)
- Renderização de listas com `map` e keys estáveis
- Renderização condicional (estado vazio, favoritos, filtros)
- Layout responsivo e acessível (navegação por teclado)

---

## 3. Principais Conceitos e Tecnologias Aplicados

| Conceito | Aplicação no Projeto |
|---|---|
| **JSX** | Interface declarativa em `App.jsx` e componentes (`CategoryFilter`, `GameCard`) |
| **Componentes** | `CategoryFilter` (navegação por categorias) e `GameCard` (apresentação de cada jogo) |
| **Props** | `CategoryFilter` recebe `categories`, `activeCategory`, `onCategoryChange`; `GameCard` recebe `game` e `isFavorite` + callbacks |
| **Estado (`useState`)** | `activeCategory`, `searchTerm`, `favorites` (array de IDs), `games` (dados locais) |
| **Virtual DOM / Reconciliação** | Atualizações de estado disparam re-renderização eficiente da lista filtrada |
| **Listas e Keys** | `categories.map()` e `filteredGames.map()` com `key` baseada em identificadores estáveis |
| **Renderização Condicional** | Alternância entre grade de cartões e estado vazio; ícones/rótulos de favorito dependem do estado |
| **Filtro e Busca** | Combinação de filtro por categoria + busca textual (título, gênero, descrição) |
| **Vite** | Build tool moderna: `npm run dev` (HMR), `npm run build` (produção), `npm run preview` |
| **CSS Moderno** | Custom properties (cores, espaçamento), Flexbox/Grid, breakpoints responsivos, transições, foco visível |

---

## 4. Estrutura / Arquivos Principais da Entrega
`Aula_08_Projeto_React/`

| Arquivo/Pasta | Descrição |
|---|---|
| `src/App.jsx` | Componente raiz: estado global, lógica de filtro/busca/favoritos, composição da página |
| `src/components/CategoryFilter.jsx` | Barra de navegação por categorias (Aventura, Puzzle, RPG, Favoritos) |
| `src/components/GameCard.jsx` | Cartão reutilizável: capa (CSS + emoji), título, estúdio, ano, nota, descrição, botão favorito |
| `src/data/games.js` | Array de 8 objetos de jogos com `id`, `title`, `category`, `studio`, `year`, `rating`, `description`, `coverEmoji` |
| `src/styles.css` | Estilos globais: variáveis CSS, reset, layout responsivo (Grid 4/2/1 colunas), cards, botões, estados hover/focus, acessibilidade |
| `src/main.jsx` | Ponto de entrada: `createRoot`, importação de estilos, renderização do `App` |
| `index.html` | HTML de entrada do Vite |
| `package.json` | Dependências: `react`, `react-dom`; devDependencies: `vite`, `@vitejs/plugin-react` |
| `vite.config.js` | Configuração padrão do Vite com plugin React |
| `README.md` | Documentação: execução, funcionalidades, tabela de conceitos, estrutura, checklist publicação |

---

## 5. Funcionalidades Implementadas
1. **Catálogo de 8 jogos** com categoria, estúdio, ano, nota (0–5) e descrição
2. **Filtros por categoria**: Aventura, Puzzle, RPG, Favoritos
3. **Busca textual** por título, gênero ou descrição (case-insensitive)
4. **Sistema de favoritos**: marcação/remoção persistida no estado da sessão
5. **Contador dinâmico** de resultados visíveis
6. **Estado vazio** com botão para limpar filtros
7. **Layout responsivo**: Grid 4 colunas (desktop) → 2 (tablet) → 1 (mobile)
8. **Acessibilidade**: foco visível, navegação por teclado, semântica HTML

---

## 6. Status de Deploy / Observações
- **Build:** `npm run build` gera pasta `dist/` pronta para deploy estático
- **Deploy indicado:** Vercel (SPA, rewrite para `index.html`)
- **Checklist no README:** Repositório GitHub e URL da aplicação pendentes de publicação manual
- **Dependências externas:** Nenhuma (dados locais, sem API, sem backend, sem autenticação)
- **Node.js:** Requisito `^22.18.0` ou `>=24.12.0`

---

## 7. Referências
- React (Documentação oficial): https://react.dev/
- Vite: https://vitejs.dev/
- Guia de Hooks (`useState`): https://react.dev/learn/state-a-components-memory