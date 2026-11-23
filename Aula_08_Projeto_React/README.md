# Aula 08 — Projeto React

## PixelPlay — biblioteca de jogos independentes

Aplicação de catálogo desenvolvida com React para praticar JSX, componentes, props, estado, listas com keys e renderização condicional. A biblioteca contém oito jogos de demonstração e usa capas ilustrativas feitas com CSS e emojis; não depende de API ou de serviços externos.

## Executar localmente

Requisitos: Node.js `^22.18.0` ou `>=24.12.0`.

```bash
npm ci
npm run dev
```

O Vite informa o endereço local no terminal. Para validar a versão de produção:

```bash
npm run build
npm run preview
```

## Funcionalidades

- Catálogo de jogos com categoria, estúdio, ano, nota e descrição.
- Filtros por aventura, puzzle, RPG e favoritos.
- Busca por título, gênero ou descrição.
- Marcação e remoção de favoritos durante a sessão.
- Contador atualizado para os resultados visíveis.
- Estado vazio com ação para limpar os filtros.
- Layout responsivo e controles acessíveis por teclado.

## Conceitos de React aplicados

| Conceito | Como aparece no projeto |
|---|---|
| JSX | A interface declarativa é composta no `App` e nos componentes. |
| Componentes | `CategoryFilter` e `GameCard` dividem a interface em partes reutilizáveis. |
| Props | O componente de filtro recebe categorias e callbacks; cada cartão recebe o jogo e seu estado de favorito. |
| Virtual DOM | Atualizações de estado em categoria, busca e favoritos fazem o React reconciliar a interface. |
| Listas e keys | Categorias e jogos são renderizados com `map`; os itens usam identificadores estáveis como `key`. |
| Renderização condicional | A biblioteca alterna entre cartões e estado vazio; rótulos e ícones dos favoritos também dependem do estado. |

## Estrutura principal

- `src/App.jsx`: composição da página, filtros e estado da aplicação.
- `src/components/CategoryFilter.jsx`: navegação pelas categorias.
- `src/components/GameCard.jsx`: apresentação reutilizável de cada jogo.
- `src/data/games.js`: dados locais do catálogo.
- `src/styles.css`: identidade visual, estados de interação e breakpoints responsivos.

## Publicação manual

- [ ] Repositório GitHub: inserir o link após publicar o repositório.
- [ ] Aplicação online: inserir o link após realizar o deploy.

Nenhum repositório remoto ou deploy foi criado nesta etapa.
