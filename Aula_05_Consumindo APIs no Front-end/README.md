# Aula 05 — Criando APIs para o Front-end

## Objetivo
Evoluir a API para um CRUD completo (Create, Read, Update, Delete) com persistência local em JSON; integrar backend Express com frontend React/Vite; documentar a API com Postman; realizar deploy (API no Render, frontend na Vercel).

---

## Principais Conceitos e Tecnologias

| Conceito | Descrição |
|---|---|
| **CRUD** | Create (`POST`), Read (`GET` lista e por ID), Update (`PUT`), Delete (`DELETE`) |
| **Persistência local** | Arquivo `data/notes.json` (criado na primeira alteração, ignorado pelo Git via `.gitignore`) |
| **Express.js + body-parser** | Servidor, rotas, parsing JSON, CORS manual |
| **ID único** | `Date.now().toString()` (timestamp) |
| **Timestamps** | `criadoEm` (ISO string) na criação; `atualizadoEm` nas atualizações |
| **Códigos de status** | `200 OK`, `201 Created`, `400 Bad Request` (campos vazios), `404 Not Found` (recurso inexistente) |
| **Postman** | Testes manuais, coleções compartilhadas, variáveis de ambiente, Mock Servers, testes automatizados |
| **Testes automatizados** | Runner nativo `node:test` com arquivos temporários isolados |
| **Deploy** | API → Render; Frontend → Vercel; variáveis `CORS_ORIGINS` (API) e `VITE_API_URL` (frontend) |

---

## Estrutura de Arquivos e Pastas

```
Aula_05_Consumindo APIs no Front-end/
├── Atividade_aula05/                # Gerenciador de Notas (API + Frontend)
│   ├── projeto_notas_api/           # Backend Express
│   │   ├── src/
│   │   │   ├── server.js            # Rotas CRUD + health check
│   │   │   └── (outros módulos)
│   │   ├── data/notes.json          # Persistência local (gitignored)
│   │   ├── test/                    # Testes com node:test
│   │   ├── postman/notes-api.postman_collection.json
│   │   ├── package.json
│   │   └── .env.example             # CORS_ORIGINS, PORT
│   ├── projeto_notas_front/         # Frontend React + Vite
│   │   └── projeto_notas_front/
│   │       ├── src/
│   │       │   ├── components/      # NoteForm.jsx, NoteCard.jsx
│   │       │   ├── App.jsx
│   │       │   ├── main.jsx
│   │       │   └── index.css
│   │       ├── index.html
│   │       ├── package.json / vite.config.js
│   │       └── .env.example         # VITE_API_URL
│   └── README.md                    # Documentação conjunta da atividade
├── Resumo_Aula_05.md                # Resumo detalhado da aula
└── Aula 05 - Criando APIs para o Front-end.pdf  # Slides da aula
```

---

## Rotas da API (`/api/notes`)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/health` | Estado da API |
| `GET` | `/api/notes` | Lista todas as notas |
| `POST` | `/api/notes` | Cria nota (`titulo`, `texto` obrigatórios) |
| `GET` | `/api/notes/:id` | Busca nota por ID |
| `PUT` | `/api/notes/:id` | Atualiza título e texto |
| `DELETE` | `/api/notes/:id` | Exclui nota |

**Estrutura da nota:** `{ id, titulo, texto, criadoEm, atualizadoEm? }`

---

## Atividade Prática

1. **Backend:** Publicar API Express no GitHub + deploy no Render
2. **Frontend:** Desenvolver interface React/Vite consumindo rotas CRUD + deploy na Vercel (atualizar URLs para endpoint online do Render)
3. **Documentação:** Relatório com prints do código, app funcionando, links dos repositórios, link do deploy Vercel, coleção Postman estruturada

---

## Status / Observações

| Componente | Deploy | Status |
|---|---|---|
| **projeto_notas_api** | Render | **Pendente** — checklist no `Atividade_aula05/README.md` |
| **projeto_notas_front** | Vercel | **Pendente** — checklist no `Atividade_aula05/README.md` |
| **Variáveis de ambiente** | | `CORS_ORIGINS` (API) = origem pública do frontend; `VITE_API_URL` (frontend) = HTTPS `/api/notes` da API no Render |
| **Persistência** | | Arquivo JSON local — filesystem em serviços de hospedagem pode ser efêmero; confirmar política antes de usar como armazenamento permanente |

- **Resumo da aula:** Disponível em `Resumo_Aula_05.md`
- **Testes:** `cd projeto_notas_api && npm test` (node:test isolado)
- **Postman:** Importar `postman/notes-api.postman_collection.json`; variável `baseUrl` aponta para API local
- **Execução local:** Dois terminais — API em `localhost:4321`, Frontend em `localhost:5173`

---

## Referências
- Atividade completa: `Atividade_aula05/README.md`
- Coleção Postman: `Atividade_aula05/postman/notes-api.postman_collection.json`
- API local: `http://localhost:4321` | Frontend local: `http://localhost:5173`
- Ver [README.md raiz](../../README.md) para visão geral do portfólio da disciplina