# Aula 05 — Gerenciador de Notas

Aplicação CRUD de notas da Aula 05, com API REST em Express, persistência local em JSON e interface React/Vite. O frontend e a API são projetos separados dentro desta atividade.

## Executar localmente

Requer Node.js 20 ou superior. Abra dois terminais a partir desta pasta.

### API

```bash
cd projeto_notas_api
npm ci
npm test
npm run dev
```

A API fica disponível em `http://localhost:4321`. O arquivo `data/notes.json` é criado na primeira alteração e ignorado pelo Git para manter os dados locais fora dos commits.

### Frontend

```bash
cd projeto_notas_front/projeto_notas_front
npm ci
npm run lint
npm run build
npm run dev
```

O Vite abre em `http://localhost:5173` e consulta `http://localhost:4321/api/notes`. Para apontar o frontend para outra API, defina `VITE_API_URL` com a URL completa da rota de coleção; consulte [`.env.example`](./projeto_notas_front/projeto_notas_front/.env.example).

## Rotas da API

| Método | Rota | Resultado |
| --- | --- | --- |
| `GET` | `/health` | Estado da API |
| `GET` | `/api/notes` | Lista notas |
| `POST` | `/api/notes` | Cria nota (`titulo` e `texto` obrigatórios) |
| `GET` | `/api/notes/:id` | Busca nota pelo ID |
| `PUT` | `/api/notes/:id` | Atualiza título e texto |
| `DELETE` | `/api/notes/:id` | Exclui nota |

As notas possuem `id`, `titulo`, `texto` e `criadoEm`; atualizações também incluem `atualizadoEm`. Campos vazios recebem `400`, recursos inexistentes recebem `404`, e respostas são JSON.

## Testes e Postman

Os testes automatizados da API usam o runner nativo `node:test` e arquivos temporários isolados:

```bash
cd projeto_notas_api
npm test
```

Para validar as rotas manualmente, importe [`postman/notes-api.postman_collection.json`](./postman/notes-api.postman_collection.json) no Postman. A variável `baseUrl` já aponta para a API local. Execute os requests na ordem da coleção: o teste de criação grava o ID usado nas chamadas de consulta, atualização e exclusão.

## Publicação manual — checklist pendente

Os repositórios e deploys não foram criados nesta etapa. Quando fizer a publicação manual, preencha os links abaixo e configure `CORS_ORIGINS` na API com a origem pública do frontend e `VITE_API_URL` no build do frontend com a rota HTTPS `/api/notes` da API.

- [ ] Repositório GitHub da API: **inserir link após publicação**
- [ ] Serviço da API no Render: **inserir link após deploy**
- [ ] Repositório GitHub do frontend: **inserir link após publicação**
- [ ] Aplicação do frontend na Vercel: **inserir link após deploy**
- [ ] Capturas dos painéis do Render e da Vercel: **adicionar após deploy**

> A API usa um arquivo JSON local. O filesystem de serviços de hospedagem pode ser efêmero; confirme a política de persistência do serviço antes de usar os dados como armazenamento permanente.
