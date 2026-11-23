# Backlog do Produto — Atende+

Este backlog transforma as funcionalidades do protótipo em histórias verificáveis e tarefas técnicas. A prioridade e os pontos são uma proposta inicial para discussão; a estimativa usa escala Fibonacci (`1, 2, 3, 5, 8`) e não representa horas.

**Status observado:** “Implementada” indica que a funcionalidade existe no código local descrito no [README do projeto](./README.md); não afirma validação clínica, deploy, uso por uma equipe ou execução de um board externo.

## Priorização

| Prioridade | Critério |
| --- | --- |
| **P1 — Essencial** | Necessária para completar o fluxo principal do MVP com segurança didática. |
| **P2 — Importante** | Melhora consulta, compreensão, consistência ou evidências do MVP. |
| **P3 — Evolução** | Fora do escopo atual; candidata a uma etapa posterior. |

## Histórias de usuário

### US01 — Cadastrar consulta

**Como** profissional de recepção, **quero** registrar uma consulta com paciente, especialidade, data e horário **para** incluir um atendimento na agenda.

- **Prioridade:** P1 · **Estimativa:** 5 pontos · **Status:** Implementada nas versões locais Vue, Angular e Next.js.
- **Critérios de aceitação:**
  - O formulário solicita os quatro campos do escopo.
  - Não permite salvar campos obrigatórios vazios ou data/horário inválidos.
  - Ao salvar, a consulta passa a aparecer na agenda e a interface confirma a ação.
- **Tarefas técnicas:**
  - Manter o formulário e os campos de consulta tipados.
  - Validar entradas antes de atualizar a lista.
  - Exibir retorno de sucesso ou erro sem apagar entradas quando o salvamento falhar.

### US02 — Consultar agenda

**Como** profissional de recepção, **quero** visualizar as consultas cadastradas em uma lista legível **para** acompanhar os próximos atendimentos.

- **Prioridade:** P1 · **Estimativa:** 3 pontos · **Status:** Implementada nas versões locais Vue, Angular e Next.js.
- **Critérios de aceitação:**
  - A lista mostra paciente, especialidade, data, horário e status.
  - Uma agenda sem registros apresenta uma mensagem de estado vazio.
  - A ordem e a apresentação não escondem informações essenciais em telas estreitas.
- **Tarefas técnicas:**
  - Definir o tipo compartilhado conceitualmente para uma consulta.
  - Implementar o item visual da agenda e o estado vazio.
  - Conferir a leitura e a ordem dos campos em viewport móvel.

### US03 — Encontrar e filtrar consultas

**Como** profissional de recepção, **quero** pesquisar por paciente ou especialidade e filtrar pelo status **para** localizar rapidamente uma consulta.

- **Prioridade:** P1 · **Estimativa:** 3 pontos · **Status:** Implementada nas versões locais Vue, Angular e Next.js.
- **Critérios de aceitação:**
  - A busca considera paciente e especialidade sem diferenciar maiúsculas de minúsculas.
  - O filtro pode exibir todos os status ou somente o status selecionado.
  - Busca e filtro aplicados em conjunto produzem uma lista coerente.
  - Nenhum resultado apresenta uma mensagem informativa.
- **Tarefas técnicas:**
  - Criar a entrada de busca e a seleção de status.
  - Derivar os resultados visíveis sem modificar a lista original.
  - Verificar a combinação de busca, filtro e estado sem resultados.

### US04 — Atualizar o status do atendimento

**Como** profissional de recepção, **quero** confirmar, concluir ou cancelar uma consulta **para** manter seu estado atualizado.

- **Prioridade:** P1 · **Estimativa:** 5 pontos · **Status:** Implementada nas versões locais Vue, Angular e Next.js.
- **Critérios de aceitação:**
  - A interface permite as transições de status previstas no protótipo.
  - O status atualizado é refletido no item e nos filtros/indicadores.
  - Os rótulos são compreensíveis e distintos visualmente.
- **Tarefas técnicas:**
  - Definir o conjunto permitido de status.
  - Implementar as ações de atualização do estado da consulta.
  - Garantir que filtros e resumos usem o estado atualizado.

### US05 — Acompanhar indicadores da agenda

**Como** profissional de recepção, **quero** ver totais resumidos de consultas do dia, aguardando e confirmadas **para** obter uma visão rápida do atendimento.

- **Prioridade:** P2 · **Estimativa:** 3 pontos · **Status:** Implementada nas versões locais Vue, Angular e Next.js.
- **Critérios de aceitação:**
  - Cada indicador é calculado a partir das consultas exibidas no estado atual.
  - Atualizar uma consulta atualiza os totais correspondentes.
  - Uma lista vazia mostra totais consistentes iguais a zero.
- **Tarefas técnicas:**
  - Derivar contagens do estado da agenda.
  - Apresentar os totais com rótulos claros.
  - Verificar a mudança dos indicadores após incluir ou atualizar consultas.

### US06 — Manter os dados locais entre sessões

**Como** estudante que demonstra o protótipo, **quero** preservar consultas fictícias após atualizar a página **para** continuar a demonstração no mesmo navegador.

- **Prioridade:** P1 · **Estimativa:** 5 pontos · **Status:** Implementada com `localStorage` nas versões locais Vue, Angular e Next.js.
- **Critérios de aceitação:**
  - Criar ou atualizar uma consulta e recarregar a página mantém o estado no mesmo navegador.
  - Dados ausentes ou inválidos não encerram a aplicação sem feedback.
  - A interface deixa claro que os dados são locais e demonstrativos.
- **Tarefas técnicas:**
  - Centralizar leitura e gravação do estado no armazenamento do navegador.
  - Tratar falhas de acesso e JSON inválido sem sobrescrever dados silenciosamente.
  - Explicar a limitação de persistência local na documentação.

### US07 — Usar o protótipo em diferentes larguras

**Como** profissional de recepção, **quero** operar a agenda em desktop e celular **para** acessar os dados em diferentes dispositivos.

- **Prioridade:** P1 · **Estimativa:** 5 pontos · **Status:** Interface responsiva implementada; revalidação transversal das três versões pendente.
- **Critérios de aceitação:**
  - Navegação, formulário, lista e ações continuam disponíveis em largura móvel.
  - Não há rolagem horizontal involuntária.
  - Foco visível, rótulos e controles permanecem operáveis por teclado.
- **Tarefas técnicas:**
  - Adaptar layout e componentes a larguras menores.
  - Verificar teclado, foco e rótulos dos controles.
  - Registrar resultados para as versões Vue, Angular e Next.js.

### US08 — Receber feedback de validação e de erros

**Como** profissional de recepção, **quero** entender por que uma ação não foi aceita **para** corrigir os dados sem perder o que digitei.

- **Prioridade:** P1 · **Estimativa:** 3 pontos · **Status:** Implementada nas versões locais; uma matriz comum de testes entre frameworks ainda não foi registrada.
- **Critérios de aceitação:**
  - Datas e horários inválidos não são aceitos.
  - Mensagens de sucesso ou de validação são perceptíveis e compreensíveis.
  - Um erro ao acessar os dados locais não é apresentado como sucesso.
- **Tarefas técnicas:**
  - Conferir as regras de validação de cada formulário.
  - Cobrir estados de sucesso, entradas inválidas e erro do armazenamento.
  - Registrar os cenários e resultados observados.

### US09 — Demonstrar diferenças entre os frameworks

**Como** estudante, **quero** consultar implementações do mesmo fluxo em Vue, Angular e Next.js **para** comparar suas estruturas e decisões técnicas.

- **Prioridade:** P2 · **Estimativa:** 5 pontos · **Status:** Implementações locais disponíveis; roteiro comparativo e evidências pendentes.
- **Critérios de aceitação:**
  - Cada implementação possui instruções próprias de execução e validação.
  - A documentação identifica tecnologias, limitações e estado da publicação sem confundir versões.
  - Uma tabela comparativa registra ao menos arquitetura, roteamento, estado e validação observados.
- **Tarefas técnicas:**
  - Revisar os READMEs das três implementações.
  - Executar os comandos de validação suportados em cada projeto.
  - Consolidar diferenças verificáveis sem atribuir funcionalidades não confirmadas.

### US10 — Preparar a entrega acadêmica

**Como** integrante do grupo, **quero** reunir o escopo, o backlog, a validação e os links em documentação revisável **para** preparar uma entrega compreensível.

- **Prioridade:** P2 · **Estimativa:** 3 pontos · **Status:** Escopo e backlog documentados; integrantes, revisão do grupo, evidências e links de publicação pendentes.
- **Critérios de aceitação:**
  - A documentação identifica problema, público-alvo, proposta de valor, tecnologias e limitações.
  - O estado de cada evidência é explícito e não contém links remotos inventados.
  - Integrantes e links são preenchidos pelo grupo antes da submissão.
- **Tarefas técnicas:**
  - Revisar as informações de escopo e decisões técnicas.
  - Inserir nomes e links somente após confirmação do grupo.
  - Anexar resultados de teste e capturas obtidos durante validação real.

## Regras para replanejamento

- Confirmar prioridades, estimativas e critérios com o grupo e o docente; os valores acima são iniciais.
- Manter cada tarefa associada a uma história e limitar o trabalho em andamento conforme o [quadro Kanban](./KANBAN.md).
- Mover um item para “Concluído” somente após atender seus critérios de aceitação e à Definition of Done.
- Não registrar deploy, reunião, revisão por pares ou participação de integrantes que não tenham sido efetivamente realizados.
