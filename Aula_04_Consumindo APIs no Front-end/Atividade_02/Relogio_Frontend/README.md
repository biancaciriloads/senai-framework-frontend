# Relógio SENAI — frontend

Aplicação React e TypeScript que consulta a API Express do relógio e apresenta data e hora no fuso de Brasília. A consulta é repetida a cada 30 segundos, com opção de atualização manual e estados explícitos de carregamento e erro.

## Executar localmente

Requer Node.js 20 ou superior. A API deve estar disponível em `http://localhost:4320`.

```bash
npm install
npm run dev
```

Para configurar outra origem, crie `.env.local` com base em `.env.example`:

```env
VITE_CLOCK_API_URL=http://localhost:4320
```

O comando `npm run build` valida os tipos TypeScript e cria os arquivos de produção na pasta `dist`.

## Deploy na Vercel

Publique o conteúdo desta pasta em um repositório próprio e importe-o na Vercel como aplicação Vite. Defina `VITE_CLOCK_API_URL` como a URL HTTPS pública da API no Render e use o build `npm run build`. Configure a variável antes de gerar o deploy; variáveis `VITE_` são incorporadas ao frontend durante o build.

O endereço publicado precisa ser informado à API através de `FRONTEND_ORIGINS` no Render para permitir a comunicação CORS. O deploy e o repositório remoto ainda não foram criados.
