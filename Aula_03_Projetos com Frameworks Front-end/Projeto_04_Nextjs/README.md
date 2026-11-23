# Projeto 04 — Atendimento hospitalar com Next.js

Aplicação acadêmica para organizar consultas e atendimentos hospitalares. Esta versão usa o App Router do Next.js e mantém o tema das versões Vue e Angular da Aula 03.

## Problema e público-alvo

O protótipo reúne em uma agenda simples os horários, especialidades e estados dos atendimentos. É destinado à demonstração acadêmica de uma interface para equipes de atendimento; não é um sistema hospitalar real.

## Integrantes

Os nomes dos integrantes não constam nesta cópia local. Preencha esta seção antes da entrega final do grupo.

## Funcionalidades

- Visão geral e rota de consultas em `/` e `/consultas`.
- Cadastro de consultas com paciente, especialidade, data e horário.
- Busca por paciente ou especialidade e filtro por status.
- Ações para confirmar, concluir ou cancelar consultas.
- Indicadores de consultas de hoje, aguardando e confirmadas.
- Validação dos dados do formulário e mensagens para as ações.
- Persistência local no navegador com `localStorage`.
- Interface responsiva e páginas renderizadas no servidor pelo App Router.

Os dados de exemplo são fictícios. As consultas ficam apenas no navegador utilizado; a aplicação não possui backend e não deve receber dados reais de pacientes.

## Tecnologias

- Next.js 16 com App Router e React 19.
- TypeScript 6.
- CSS responsivo.
- Vitest para testes das validações e funções de datas.

## Requisitos e execução

Requisitos: Node.js `^22.18.0` ou `>=24.12.0` e npm.

Na pasta `Projeto_04_Nextjs`, instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm ci
npm run dev
```

O servidor local fica disponível em `http://localhost:3000`. Os comandos de validação e produção são:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm start
```

## Publicação e limitações

- [Deploy anterior (template genérico)](https://projeto-next-sooty.vercel.app/) — não corresponde ao painel hospitalar desta pasta.
- O painel hospitalar foi criado localmente para a atividade; o deploy e o repositório publicados não foram alterados.
- O relatório acadêmico do grupo não está incluído nesta pasta.
- A persistência é local ao navegador e não sincroniza dados entre dispositivos.
