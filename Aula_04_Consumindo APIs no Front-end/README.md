# Aula 04 — Consumindo APIs no Front-end

## Objetivo
Compreender conceitos de API, protocolo HTTP, endpoints e JSON; criar uma API REST com Express.js; hospedar e simular web services no Render; consumir a API a partir de um frontend React/Vite e realizar deploy (API no Render, frontend na Vercel).

---

## Principais Conceitos e Tecnologias

| Conceito | Descrição |
|---|---|
| **API (Application Programming Interface)** | Conjunto de protocolos/ferramentas para comunicação entre sistemas |
| **REST** | Estilo arquitetural stateless cliente-servidor: URIs, métodos HTTP, JSON |
| **Métodos HTTP** | `GET` (ler), `POST` (criar), `PUT`/`PATCH` (atualizar total/parcial), `DELETE` (remover) |
| **Endpoint** | URL específica de acesso a um recurso na API |
| **JSON** | Formato leve de troca de dados (pares nome/valor, arrays) |
| **Express.js** | Framework minimalista Node.js para servidores web e rotas |
| **CORS** | Middleware para liberar acesso cross-origin |
| **Render** | Plataforma cloud para hospedar aplicações/web services com SSL grátis; deploy contínuo via GitHub |
| **Vercel** | Hospedagem frontend estático/SSR com CI/CD via Git |
| **Fetch API** | Nativo do navegador para consumo de APIs (`response.ok`, `json()`, tratamento de erros) |

---

## Estrutura de Arquivos e Pastas

```
Aula_04_Consumindo APIs no Front-end/
├── Atividade_01.md                  # Pesquisa de 10 projetos GitHub que consomem APIs (tabela Markdown)
├── Atividade_02/                    # API de data/hora + Frontend React
│   ├── Relogio_API/                 # API Express (Node.js)
│   │   ├── api.js                   # Rotas: GET / (data/hora), GET /health
│   │   ├── package.json
│   │   └── (outros arquivos de config)
│   ├── Relogio_Frontend/            # Frontend React + TypeScript + Vite
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   └── styles.css
│   │   ├── index.html
│   │   ├── package.json / tsconfig.json / vite.config.ts
│   │   ├── .env.example             # VITE_CLOCK_API_URL
│   │   ├── evidencias/relogio-local.png
│   │   └── README.md
│   └── README.md                    # Documentação conjunta da Atividade 02
├── Resumo_Aula_04.md                # Resumo detalhado da aula
└── Aula 04 - Consumindo APIs no Front-end.pdf  # Slides da aula
```

---

## Atividades Práticas

### Atividade 01 (Pesquisa)
- Pesquisar 10 projetos no GitHub que utilizem APIs
- Clonar, analisar framework e APIs consumidas
- Entregar arquivo Markdown com tabela detalhada

### Atividade 02 (API + Frontend)
1. **API (Express):** Criar rota de consulta de data/hora (`GET /`) e health check (`GET /health`); deploy no Render
2. **Frontend (React/TS/Vite):** Consumir a API, exibir data/hora, atualização periódica (30s) e manual, estados loading/erro; deploy na Vercel
3. **Entrega:** Documento com prints do código, aplicação funcionando, painéis Render/Vercel, links dos repositórios GitHub

---

## Status / Observações

| Componente | Deploy | Status |
|---|---|---|
| **Relogio_API** | Render | **Pendente** — checklist no `Atividade_02/README.md` |
| **Relogio_Frontend** | Vercel | **Pendente** — checklist no `Atividade_02/Relogio_Frontend/README.md` |
| **Variável de ambiente** | Frontend | `VITE_CLOCK_API_URL` (ex: `http://localhost:4320` local; HTTPS da API no Render para produção) |
| **CORS** | API | `FRONTEND_ORIGINS` no Render deve incluir origem pública do frontend |

- **Resumo da aula:** Disponível em `Resumo_Aula_04.md`
- **Testes:** `npm test` na API; `npm run build` (valida TypeScript) no frontend
- **Execução local:** Dois terminais — API em `localhost:4320`, Frontend em `localhost:5173`

---

## Referências
- Atividade 01: `Atividade_01.md` (pesquisa em Markdown)
- Atividade 02: `Atividade_02/README.md` (documentação conjunta)
- API local: `http://localhost:4320` | Frontend local: `http://localhost:5173`
- Ver [README.md raiz](../../README.md) para visão geral do portfólio da disciplina