# Projeto 03 — Atendimento hospitalar com Angular

Aplicação web acadêmica para organizar consultas e atendimentos hospitalares, alinhada ao tema da atividade da Aula 03.

## Funcionalidades

- Cadastro de consultas com paciente, especialidade, data e horário.
- Busca por paciente ou especialidade e filtro por status.
- Ações para confirmar, concluir ou cancelar uma consulta.
- Resumo de consultas de hoje, aguardando e confirmadas.
- Persistência local no navegador com `localStorage`.

Os registros são demonstrativos e ficam apenas no navegador utilizado. O projeto não se conecta a um serviço hospitalar nem deve receber dados reais de pacientes.

## Executar localmente

Requisitos: Node.js e npm compatíveis com Angular CLI 21.

Na pasta `Projeto_03_Angular`, instale as dependências e inicie o servidor:

```bash
npm ci
npm start
```

Para executar os testes e gerar o build de produção:

```bash
npm test
npm run build
```

## Tecnologias

- Angular 21 com componentes standalone e signals.
- TypeScript.
- Renderização no servidor (SSR) com hidratação.

## Origem e publicação

- Deploy anterior (dashboard de clima): [meu-app-angular-1.vercel.app](https://meu-app-angular-1.vercel.app/).
- Repositório-fonte consultado: [biancaciriloads/meu-app-angular](https://github.com/biancaciriloads/meu-app-angular), commit `84e3cc901bb8c5aa822524862afb6c5e205d01b0`.
- O código desta pasta foi adaptado localmente para a atividade; o repositório remoto e o deploy não foram alterados.
