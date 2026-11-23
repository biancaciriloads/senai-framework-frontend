# Aula 04 — Atividade 02: API de data e hora

## Entrega

A atividade contém dois projetos independentes, preparados para publicação em repositórios e serviços de hospedagem distintos:

- [`Relogio_API/`](./Relogio_API/): API REST em Node.js e Express, com `GET /` para data/hora e `GET /health` para verificação do serviço.
- [`Relogio_Frontend/`](./Relogio_Frontend/): aplicação React, TypeScript e Vite que consome a API, atualiza os dados periodicamente e permite atualização manual. Seu [README](./Relogio_Frontend/README.md) descreve execução e configuração na Vercel.

As versões antigas `API_relogio` e `API_relogio_frontend` foram removidas para manter somente os projetos completos desta entrega.

## Executar localmente

Requer Node.js 20 ou superior. Em dois terminais, instale dependências e inicie os projetos:

```bash
cd Relogio_API
npm install
npm run dev
```

```bash
cd Relogio_Frontend
npm install
npm run dev
```

O frontend abre em `http://localhost:5173` e consulta a API em `http://localhost:4320`. A variável `VITE_CLOCK_API_URL` pode apontar para outra origem; use [`Relogio_Frontend/.env.example`](./Relogio_Frontend/.env.example) como referência.

## Testes e build

Na pasta `Relogio_API`, execute `npm test`. Na pasta `Relogio_Frontend`, execute `npm run build` para validar os tipos TypeScript e gerar o bundle de produção.

## Publicação manual — checklist pendente

Os repositórios remotos e deploys não foram criados. Quando fizer a publicação manual, insira os links e capturas nos campos abaixo:

- [ ] Repositório GitHub da API: **inserir link após publicação**
- [ ] Serviço da API no Render: **inserir URL após deploy**
- [ ] Repositório GitHub do frontend: **inserir link após publicação**
- [ ] Aplicação do frontend na Vercel: **inserir URL após deploy**
- [ ] Capturas dos painéis do Render e da Vercel: **adicionar após deploy**

A [captura local da aplicação](./Relogio_Frontend/evidencias/relogio-local.png) já foi registrada. Não foram inventados URLs remotos ou capturas dos painéis.
