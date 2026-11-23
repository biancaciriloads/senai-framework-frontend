# Frontend — Gerenciador de Notas

Aplicação React e Vite para criar, consultar, atualizar e excluir notas por meio da API da Aula 05.

## Desenvolvimento local

```bash
npm ci
npm run dev
```

Por padrão, a aplicação consulta `http://localhost:4321/api/notes`. Para usar outra origem, copie [`.env.example`](./.env.example) para `.env.local` e altere `VITE_API_URL`.

Para executar as verificações de qualidade:

```bash
npm run lint
npm run build
```

As instruções completas da atividade, da API e da collection Postman estão no [README da Atividade 05](../../README.md).
