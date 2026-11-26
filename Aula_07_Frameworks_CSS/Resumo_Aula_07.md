# Resumo da Aula 07: Frameworks CSS — Box Model, Flexbox e Tailwind CSS
**Instituição:** SENAI  
**Disciplina:** Frameworks Front-end  
**Professor:** Me. Deivison S. Takatu  

---

## 1. Sumário da Aula
- Estudo do **Box Model** CSS e suas quatro partes (content, padding, border, margin)
- **Flexbox**: 20 demonstrações práticas de propriedades de layout flexível
- **Tailwind CSS**: Framework utility-first aplicado em uma agenda acadêmica responsiva (Atende+)
- Conceitos de design responsivo, acessibilidade e classes utilitárias

---

## 2. Objetivo das Atividades
### Atividade 01: Box Model e Flexbox
Criar uma página didática estática (HTML + CSS) que:
- Identifique visualmente as quatro partes do Box Model
- Demonstre 20 configurações de Flexbox comparando comportamentos sem alterar a ordem do HTML
- Valide layout responsivo (3 colunas → 2 → 1) e acessibilidade (foco visível, prefers-reduced-motion)

### Atividade 02: Tailwind CSS
Desenvolver uma aplicação de agenda acadêmica (Atende+) com:
- React-style componentização em JavaScript vanilla + Vite
- Tailwind CSS com tema customizado (cores, tipografia, espaçamento, sombras)
- Funcionalidades: cadastro, busca/filtros, confirmação/cancelamento, persistência em `localStorage`
- Layout responsivo e evidências visuais (mobile viewport, trechos de código)

---

## 3. Principais Conceitos e Tecnologias Aplicados

| Conceito | Atividade 01 (Box Model/Flexbox) | Atividade 02 (Tailwind) |
|---|---|---|
| **Box Model** | 4 partes demonstradas em 20 cartões; `box-sizing: border-box` | Aplicado via classes utilitárias (`p-5`, `px-4`, `mt-5`, `gap-3`, etc.) |
| **Flexbox** | 20 exemplos: `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `flex-grow`, `order`, `flex` shorthand | Classes `flex`, `flex-col`, `items-center`, `justify-between`, `gap-3`, `sm:flex-row` |
| **CSS Grid** | Layout dos 20 cartões: 3/2/1 colunas responsivas | Classes `grid`, `grid-cols-1`, `xl:grid-cols-4` |
| **Responsividade** | Breakpoints via media queries no CSS | Prefixos `sm:`, `md:`, `lg:`, `xl:` do Tailwind |
| **Acessibilidade** | Foco visível, navegação por teclado, `prefers-reduced-motion` | `focus:ring-4`, navegação por teclado, `prefers-reduced-motion` |
| **Tema/Customização** | Paleta consistente, CSS custom properties | `tailwind.config.js` com cores `brand`, `brand-soft`, `ink`, `page`, sombras `shadow-panel` |
| **Build Tool** | Não há (HTML/CSS estático) | **Vite** + `npm run dev` / `npm run build` |
| **Persistência** | Não aplicável | `localStorage` (dados fictícios, sem backend) |

---

## 4. Estrutura / Arquivos Principais da Entrega

### Atividade 01 — `Aula_07_Frameworks_CSS/Atividade_01_Box_Model_Flexbox/`
| Arquivo | Descrição |
|---|---|
| `index.html` | Página semântica com 20 cartões de demonstração Flexbox + diagrama Box Model |
| `style.css` | CSS externo: reset, variáveis, Box Model, 20 classes `.demo-XX`, Grid responsivo, acessibilidade |
| `README.md` | Documentação completa: execução, Box Model, tabela 20 demos Flexbox, layout, validação, checklist publicação |

### Atividade 02 — `Aula_07_Frameworks_CSS/Atividade_02_Tailwind/`
| Arquivo/Pasta | Descrição |
|---|---|
| `src/` | Código-fonte: `main.js`, `components.js`, `styles.css` (importa Tailwind), `tailwind.css` |
| `evidencias/` | Capturas: `atende-tailwind-mobile.png`, `codigo-componentes.png` |
| `index.html` | HTML de entrada do Vite |
| `package.json` | Dependências: `tailwindcss`, `vite`, `postcss`, `autoprefixer` |
| `vite.config.js` | Configuração Vite |
| `README.md` | Documentação: execução, funcionalidades, evidências, catálogo 55+ classes Tailwind usadas, checklist publicação |

---

## 5. Catálogo de Classes Tailwind Utilizadas (Atividade 02)
Organizadas por categoria (55+ classes distintas documentadas no README):
- **Cores (10):** `bg-brand`, `bg-brand-soft`, `bg-page`, `bg-white`, `text-brand`, `text-brand-dark`, `text-ink`, `text-muted`, `text-rose-700`
- **Tipografia (10):** `font-sans`, `text-xs` a `text-3xl`, `font-medium` a `font-bold`, `tracking-tight`, `leading-5`
- **Espaçamento (10):** `p-5`, `px-4`, `py-4`, `mt-5`, `mb-8`, `gap-3`, `space-y-4`
- **Dimensões (5):** `w-full`, `max-w-7xl`, `min-h-screen`, `size-10`, `min-w-0`
- **Bordas (5):** `border`, `border-line`, `rounded-lg` a `rounded-2xl`
- **Layout (6):** `flex`, `flex-col`, `grid`, `grid-cols-1`, `items-center`, `justify-between`
- **Interação (3):** `focus:ring-4`, `hover:bg-brand-soft`, `transition`
- **Responsividade (6):** `sm:flex-row`, `sm:items-center`, `md:hidden`, `lg:px-10`, `xl:grid-cols-4`

---

## 6. Status de Deploy / Observações
- **Atividade 01:** Página estática — não requer build, deploy opcional (Vercel/Netlify/GitHub Pages). Checklist no README para publicação manual.
- **Atividade 02:** Aplicação Vite + Tailwind — build com `npm run build` (saída em `dist/`), deploy indicado na Vercel. Checklist no README para publicação manual.
- **Dados:** Fictícios, persistidos apenas no `localStorage` do navegador; sem API, backend ou sincronização.
- **Node.js:** Requisito `>=22.12.0` para Atividade 02.

---

## 7. Referências
- Documentação Tailwind CSS: https://tailwindcss.com/docs
- Documentação Flexbox (MDN): https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Flexible_Box_Layout
- Vite: https://vitejs.dev/