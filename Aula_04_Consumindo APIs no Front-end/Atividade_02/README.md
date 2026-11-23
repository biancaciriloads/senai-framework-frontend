# Aula 04 — Atividade 02: API de data e hora

## Entrega

A atividade contém dois projetos independentes, preparados para publicação em repositórios e serviços de hospedagem distintos:

- [`Relogio_API/`](./Relogio_API/): API REST em Node.js e Express, com `GET /` para data/hora e `GET /health` para verificação do serviço.
- [`Relogio_Frontend/`](./Relogio_Frontend/): aplicação React, TypeScript e Vite que consome a API, atualiza os dados periodicamente e permite atualização manual. Seu [README](./Relogio_Frontend/README.md) descreve execução e configuração na Vercel.

As pastas `API_relogio` e `API_relogio_frontend` existentes nesta atividade são gitlinks preexistentes e foram preservadas. O código desta entrega está nas pastas novas acima; não se presume a origem dos gitlinks.

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

## Publicação prevista

O código está preparado para Render e Vercel, mas a publicação precisa ocorrer nas contas do responsável pela entrega:

1. Publique o conteúdo de `Relogio_API` em um repositório GitHub e crie um Web Service no Render. O comando de início é `npm start`; configure `FRONTEND_ORIGINS` com a origem final do frontend.
2. Publique o conteúdo de `Relogio_Frontend` em outro repositório GitHub e importe-o na Vercel como projeto Vite. Defina `VITE_CLOCK_API_URL` com a URL HTTPS do serviço Render.
3. Após cada publicação, acesse a aplicação, confirme o indicador de conexão e a resposta de `GET /`; registre os links e capturas de tela no relatório de entrega.

Não foram criados repositórios remotos nem realizados deploys. A criação desses recursos requer acesso autenticado às contas GitHub, Render e Vercel; nenhum URL remoto ou captura de painel é inventado neste documento.

## Evidências

| Evidência exigida | Situação |
| :--- | :--- |
| Código da API e do frontend | Disponível em [`Relogio_API/app.js`](./Relogio_API/app.js), [`Relogio_API/tests/app.test.js`](./Relogio_API/tests/app.test.js) e [`Relogio_Frontend/src/App.tsx`](./Relogio_Frontend/src/App.tsx). |
| Aplicação funcionando localmente | [Captura da aplicação ligada à API local](./Relogio_Frontend/evidencias/relogio-local.png). Testes da API e build do frontend também foram executados. |
| Painel Render e endpoint publicado | Pendente de deploy na conta do responsável. |
| Painel Vercel e aplicação publicada | Pendente de deploy na conta do responsável. |
| Links de dois repositórios GitHub | Pendentes de publicação dos projetos em repositórios separados. |
