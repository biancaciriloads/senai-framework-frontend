# Aula 09 — Projeto React 02

## Descobertas — mural comunitário

Aplicação React de publicações curtas, construída para praticar estado, formulários, efeitos, consumo de API e navegação com React Router. O mural carrega publicações do JSONPlaceholder, permite buscar e compartilhar uma ideia e exibe uma página de detalhes por publicação.

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

É necessária conexão com a internet para carregar a API pública.

## Funcionalidades

- Feed de publicações obtido com `GET /posts?_limit=12`.
- Busca por título e descrição.
- Formulário controlado para criar uma publicação, com campos obrigatórios, limite de caracteres e validação após remover espaços.
- Envio com `POST /posts` e mensagens de sucesso/erro.
- Detalhes por identificador em `/posts/:postId`.
- Estados de carregamento, erro e resultado vazio.
- Layout responsivo com navegação acessível por teclado.

## Conceitos da aula

| Conceito | Aplicação |
|---|---|
| State e `useState` | Controla publicações, busca, campos do formulário, envio e estados da interface. |
| Formulários | Os campos controlados atualizam o estado; o envio valida e serializa os dados em JSON. |
| `useEffect` | Busca a lista e os detalhes ao montar/alterar a rota e cancela requisições ao desmontar. |
| Consumo de APIs | `src/api/posts.js` usa `fetch`, verifica `response.ok`, interpreta JSON e trata respostas inválidas. |
| React Router | `BrowserRouter`, rotas aninhadas, `Outlet`, links, `useParams` e uma página 404. |

## Estrutura principal

- `src/App.jsx`: mapa das rotas.
- `src/pages/FeedPage.jsx`: feed, busca, estado e carregamento das publicações.
- `src/pages/PostDetailPage.jsx`: rota de detalhes e leitura do parâmetro da URL.
- `src/components/PostForm.jsx`: formulário controlado e criação.
- `src/components/PostCard.jsx`: cartão reutilizável do feed.
- `src/api/posts.js`: funções de integração com a API.
- `src/styles.css`: estilos e breakpoints responsivos.

## Limitações da API de demonstração

O projeto usa [JSONPlaceholder](https://jsonplaceholder.typicode.com/), que simula a criação de publicações, mas não persiste o `POST`. A publicação criada aparece no estado local da sessão e pode não existir ao abrir ou recarregar sua rota diretamente. Não use dados pessoais no formulário.

## Publicação manual

- [ ] Repositório GitHub: inserir o link após publicar o repositório.
- [ ] Aplicação online: inserir o link após realizar o deploy.

Nenhum repositório remoto ou deploy foi criado nesta etapa.
