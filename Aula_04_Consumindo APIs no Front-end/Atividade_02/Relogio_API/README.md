# API do relógio

API REST em Node.js e Express que retorna data e hora atuais, formatadas para o fuso `America/Sao_Paulo`.

## Executar localmente

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

O endpoint principal fica em `http://localhost:4320/`; a rota `GET /health` informa se o serviço está disponível. Para executar os testes automatizados:

```bash
npm test
```

## Resposta de `GET /`

```json
{
  "dateTime": "2026-01-31T12:34:56.789Z",
  "date": "31/01/2026",
  "time": "09:34:56",
  "timeZone": "America/Sao_Paulo",
  "status": "API do relógio funcionando!"
}
```

O campo `dateTime` é um timestamp ISO 8601 em UTC; `date` e `time` são apresentados no fuso de São Paulo.

## Configuração de CORS e deploy

Por padrão, a API aceita o frontend local em `http://localhost:5173`. No Render, configure `FRONTEND_ORIGINS` com uma lista separada por vírgulas contendo a origem publicada do frontend, sem barra final. O Render fornece a variável `PORT`; localmente, o servidor usa a porta `4320`.

O deploy ainda precisa ser feito na conta Render do responsável pela entrega. Não são incluídos tokens, credenciais ou URLs de serviços inexistentes.
