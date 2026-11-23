# Projeto 02 — Atendimento hospitalar com Vue

Aplicação web acadêmica para organizar consultas e atendimentos hospitalares. Esta versão substitui a tela de boas-vindas do template Vue/Vite que estava publicada pelo projeto de um painel funcional com escopo próprio, mantendo o tema hospitalar da atividade.

## Funcionalidades

- Cadastro de consultas com paciente, especialidade, data e horário.
- Listagem com busca por paciente ou especialidade e filtro por status.
- Ações para confirmar, concluir ou cancelar uma consulta.
- Resumo de consultas de hoje, aguardando e confirmadas.
- Persistência local no navegador com `localStorage`.

Os registros são demonstrativos e ficam apenas no navegador utilizado. O projeto não se conecta a um serviço hospitalar nem deve receber dados reais de pacientes.

## Executar localmente

Requisitos: Node.js `^22.18.0` ou `>=24.12.0` e npm.

Na pasta `Projeto_02_Vue`, instale as dependências e inicie o servidor:

```bash
npm install
npm run dev
```

Para validar a tipagem e gerar o build de produção:

```bash
npm run type-check
npm run build
```

## Tecnologias

- Vue 3 com Composition API e `<script setup>`.
- TypeScript.
- Vite.

## Origem e publicação

- Deploy anterior (template Vue/Vite): [meu-projeto-vue-pi.vercel.app](https://meu-projeto-vue-pi.vercel.app/).
- Repositório-fonte consultado: [biancaciriloads/meu_projeto_vue](https://github.com/biancaciriloads/meu_projeto_vue), commit `7c949e9da5ba05f6dfdf77ba0f848bca4888886d`.
- O código desta pasta foi adaptado localmente para a atividade; o repositório remoto e o deploy não foram alterados.
