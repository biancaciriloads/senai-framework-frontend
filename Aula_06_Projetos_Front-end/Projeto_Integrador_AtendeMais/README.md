# Projeto Integrador — Atende+

Documento de planejamento da aplicação acadêmica Atende+, uma agenda demonstrativa de consultas utilizada para organizar e comparar implementações com frameworks front-end estudados na disciplina.

## Problema

Uma equipe de atendimento precisa consultar horários, localizar consultas e acompanhar seu estado sem percorrer listas desorganizadas. O projeto demonstra uma interface para esse fluxo, sem representar um sistema hospitalar conectado a serviços reais.

## Público-alvo

Profissionais de recepção e equipes acadêmicas que precisam visualizar uma agenda simples de atendimentos. A aplicação é um protótipo didático; não se destina a pacientes nem a operações clínicas.

## Proposta de valor

Reunir cadastro e consulta de horários, busca, filtros e acompanhamento de status numa interface responsiva, permitindo demonstrar e comparar como diferentes frameworks implementam o mesmo fluxo de trabalho.

## Escopo do MVP

- Cadastrar uma consulta informando paciente, especialidade, data e horário.
- Consultar a lista e localizar consultas por paciente ou especialidade.
- Filtrar consultas pelo status.
- Confirmar, concluir ou cancelar uma consulta.
- Exibir indicadores resumidos da agenda.
- Persistir dados demonstrativos no armazenamento local do navegador.
- Apresentar os fluxos principais numa interface adaptável a telas menores.
- Manter implementações independentes em Vue, Angular e Next.js para comparação didática.

As versões dos frameworks são projetos locais separados; não formam um único aplicativo integrado nem sincronizam dados entre si.

## Implementações existentes

| Versão | Tecnologia | Estado da implementação local |
| --- | --- | --- |
| [Projeto 02 — Vue](../../Aula_03_Projetos%20com%20Frameworks%20Front-end/Projeto_02_Vue/) | Vue 3, TypeScript e Vite | Cadastro, lista, busca, filtro de status, ações da agenda, indicadores e `localStorage`. |
| [Projeto 03 — Angular](../../Aula_03_Projetos%20com%20Frameworks%20Front-end/Projeto_03_Angular/) | Angular 21, TypeScript e signals | Fluxo da agenda equivalente, com validação e persistência local. |
| [Projeto 04 — Next.js](../../Aula_03_Projetos%20com%20Frameworks%20Front-end/Projeto_04_Nextjs/) | Next.js, React, TypeScript e App Router | Visão geral e rota de consultas, cadastro, busca, filtros, ações, validação e persistência local. |

O armazenamento é exclusivo ao navegador e à implementação em uso. Não existe backend, autenticação, integração com clínicas ou sincronização entre dispositivos.

## Planejamento do trabalho

- O [backlog](./BACKLOG.md) registra histórias, critérios de aceitação, tarefas, prioridade e estimativas.
- O [quadro Kanban](./KANBAN.md) mantém um retrato local do estado observado e descreve o fluxo das próximas iterações.
- A estratégia de branches e a Definition of Done também estão documentadas no quadro.

Este quadro é um artefato local em Markdown; nenhum board externo foi criado ou atualizado.

## Integrantes

Os nomes dos integrantes não foram informados nesta cópia. Preencha-os antes da entrega acadêmica; não presuma a autoria ou participação de outras pessoas a partir do histórico de commits.

## Tecnologias

- Vue 3, Angular 21 e Next.js com React.
- TypeScript e JavaScript, conforme a implementação.
- CSS para as interfaces responsivas.
- `localStorage` do navegador para dados fictícios e locais.

## Privacidade e limitações

- Use apenas nomes e dados fictícios. Não insira dados reais ou identificáveis de pacientes.
- O armazenamento local não oferece autenticação, controle de acesso, cópia de segurança ou compartilhamento.
- A aplicação não integra prontuários, profissionais, unidades de saúde, serviços externos ou banco de dados.
- A agenda é material acadêmico e não deve ser utilizada para decisões clínicas ou operação real.
- As publicações antigas de Vue, Angular e Next.js referem-se a versões diferentes dos projetos desta pasta.

## Publicação manual — checklist

Nenhuma nova publicação ou alteração de repositório remoto foi realizada nesta atividade.

- [ ] Repositório do Projeto Integrador: **inserir link após publicação**
- [ ] Protótipo navegável: **inserir link quando disponível**
- [ ] Aplicação publicada: **inserir URL após deploy manual**

## Próximas etapas

1. Confirmar o grupo e preencher os integrantes.
2. Revisar as prioridades e estimativas com os integrantes e o docente.
3. Atualizar o quadro local ou transferir os cards para uma ferramenta externa, se acordado pelo grupo.
4. Executar e registrar os cenários de validação descritos no backlog.
5. Preparar o relatório acadêmico e adicionar evidências verificáveis.
