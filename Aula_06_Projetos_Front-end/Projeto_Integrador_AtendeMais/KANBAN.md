# Kanban e fluxo de trabalho — Atende+

Este quadro é uma fotografia local do estado observado no repositório, não um histórico de utilização de ferramenta externa. “Implementado” descreve código encontrado nas pastas indicadas; tarefas de validação ainda pendentes continuam em aberto mesmo que o recurso exista.

## Colunas e limite de trabalho em andamento

| Coluna | Critério de entrada | Limite WIP proposto |
| --- | --- | ---: |
| **Backlog** | História registrada, priorizada e ainda não selecionada para a iteração. | Sem limite |
| **A fazer** | História escolhida; critérios e dependências revisados antes do início. | 3 |
| **Em andamento** | Implementação ou validação ativa, com responsável acordado pelo grupo. | 2 |
| **Validação** | Código concluído e aguardando testes/checagem dos critérios de aceitação. | 2 |
| **Concluído** | Critérios aceitos, DoD cumprida e resultado registrado. | — |
| **Bloqueado** | Impedimento conhecido, descrito com condição de desbloqueio. | — |

O grupo deve atribuir responsáveis no board que vier a utilizar. Nenhum responsável ou integrante é presumido neste quadro.

## Estado observado neste repositório

| ID | Cartão | Estado | Evidência / próximo passo |
| --- | --- | --- | --- |
| K01 | Criar e exibir consultas na agenda Vue | **Implementado localmente** | Formulário e lista em `Projeto_02_Vue/src/App.vue`; executar e revisar os critérios antes de considerar validado. |
| K02 | Buscar, filtrar e atualizar status em Vue | **Implementado localmente** | Busca, filtros e ações de status em `Projeto_02_Vue/src/App.vue`; repetir cenários de combinação e estado vazio. |
| K03 | Persistir dados demonstrativos em Vue | **Implementado localmente** | Integração com `localStorage` em `Projeto_02_Vue/src/App.vue`; testar dado ausente, inválido e recarga. |
| K04 | Reproduzir a agenda em Angular | **Implementado localmente** | Código em `Projeto_03_Angular/src/app/`; revisar testes e cenários de hidratação antes de fechar validação transversal. |
| K05 | Reproduzir a agenda em Next.js | **Implementado localmente** | Páginas e componentes em `Projeto_04_Nextjs/`; testes e build já foram executados durante a entrega dessa atividade. |
| K06 | Validar responsividade, navegação por teclado e estados da agenda nos três frameworks | **A fazer** | Registrar viewport, fluxo de teclado, estados vazios e erros para Vue, Angular e Next.js. |
| K07 | Executar uma matriz comparativa de cenários nos três projetos | **A fazer** | Cobrir criar, buscar, filtrar, alterar status, recarregar e entradas inválidas; acrescentar resultados verificáveis ao relatório. |
| K08 | Revisar integrantes, atribuições e decisões com o grupo/docente | **Bloqueado — informação pendente** | Desbloquear quando o grupo e os responsáveis forem confirmados. |
| K09 | Adicionar links e capturas após publicação manual | **Bloqueado — publicação adiada** | Aguardar decisão e execução manual; não criar serviços ou repositórios remotos nesta etapa. |

“Implementado localmente” não equivale a revisão por pares, validação em ambiente real ou publicação. Atualize os estados apenas após produzir a evidência indicada.

## Iterações sugeridas

As iterações abaixo definem uma ordem de trabalho, sem datas assumidas.

### Iteração 1 — MVP de agenda

- **Objetivo:** habilitar o fluxo de consulta em uma implementação inicial.
- **Histórias:** [US01](./BACKLOG.md#us01--cadastrar-consulta), [US02](./BACKLOG.md#us02--consultar-agenda), [US04](./BACKLOG.md#us04--atualizar-o-status-do-atendimento), [US06](./BACKLOG.md#us06--manter-os-dados-locais-entre-sessões).
- **Estado observado:** funcionalidades correspondentes implementadas localmente; executar/registrar os critérios da matriz de testes continua necessário.

### Iteração 2 — Consulta e apresentação

- **Objetivo:** facilitar a navegação e fornecer resumo imediato da agenda.
- **Histórias:** [US03](./BACKLOG.md#us03--encontrar-e-filtrar-consultas), [US05](./BACKLOG.md#us05--acompanhar-indicadores-da-agenda), [US07](./BACKLOG.md#us07--usar-o-protótipo-em-diferentes-larguras).
- **Estado observado:** recursos implementados localmente; a revisão responsiva transversal permanece em aberto.

### Iteração 3 — Qualidade e entrega

- **Objetivo:** verificar o mesmo fluxo nas implementações e completar a documentação acadêmica.
- **Histórias:** [US08](./BACKLOG.md#us08--receber-feedback-de-validação-e-de-erros), [US09](./BACKLOG.md#us09--demonstrar-diferenças-entre-os-frameworks), [US10](./BACKLOG.md#us10--preparar-a-entrega-acadêmica).
- **Estado observado:** pendente de validação transversal, confirmação do grupo e inclusão das evidências faltantes.

## Estratégia de branches e commits

Quando o grupo optar por trabalhar com branches:

- `main`: versão revisada e considerada estável.
- `feature/<id>-<slug>`: história ou funcionalidade, por exemplo `feature/us03-filtro-status`.
- `fix/<id>-<slug>`: correção rastreável, por exemplo `fix/us06-dados-invalidos`.
- `docs/<id>-<slug>`: documentação de uma história ou entrega.
- Manter cada branch restrita ao escopo da história e integrar alterações após validação e revisão acordada.
- Escrever commits descritivos vinculados à tarefa; não criar commits vazios ou branches artificiais para atingir contagens.

Os nomes acima são uma convenção sugerida, não branches criadas nesta atividade.

## Definition of Done

Uma história só passa para **Concluído** quando:

- [ ] Todos os critérios de aceitação da história foram verificados.
- [ ] Fluxos principal, vazio e inválido foram verificados quando aplicáveis.
- [ ] Lint, testes, verificação de tipos e build aplicáveis ao projeto passaram; exceções foram registradas.
- [ ] Layout foi conferido em desktop e largura móvel; controles e foco são operáveis por teclado.
- [ ] Não há erro novo no console que impeça o fluxo validado.
- [ ] Documentação e limitações da funcionalidade estão atualizadas.
- [ ] Foram usados somente dados fictícios; nenhuma informação real de paciente foi registrada.
- [ ] A evidência da validação foi anotada no cartão sem declarar testes, revisão ou deploy que não ocorreram.

## Gestão do quadro

Este arquivo serve de board mínimo para consulta e revisão local. Se o grupo decidir utilizar Trello, GitHub Projects ou ferramenta equivalente, transfira os cartões e mantenha prioridades, estados e evidências coerentes; a ferramenta externa não foi criada ou acessada por esta entrega.
