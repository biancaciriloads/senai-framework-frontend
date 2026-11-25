# Kanban e fluxo sugerido — SGA

## Situação encontrada

- A página [GitHub Projects do SGA](https://github.com/edilainesolde/SGA/projects) indicava **0 projetos abertos e 0 fechados** na inspeção de 25/11/2026. Portanto, não foi encontrado board Kanban.
- O repositório possui issues, milestones temáticos e labels como `Em andamento`, `concluido` e `backlog`.
- O estado aberto/fechado de uma issue e seus labels não comprovam a existência de colunas Kanban ou a utilização ativa de um board.

## Proposta para criar o board (ainda não executada)

Se a equipe decidir usar GitHub Projects, pode criar um board vinculado às issues existentes:

| Coluna sugerida | Critério de entrada |
| --- | --- |
| **Backlog** | Issue registrada, mas ainda não refinada ou priorizada para execução. |
| **Pronta** | Contexto, aceite, prioridade, estimativa e dependências revisados. |
| **Em andamento** | Trabalho iniciado e responsável acordado. |
| **Revisão / Testes** | Implementação pronta para revisão e validação dos critérios. |
| **Concluído** | DoD atendida e evidência registrada na issue/PR. |
| **Bloqueado** | Impedimento descrito, com responsável e condição para desbloqueio. |

**Limites WIP sugeridos:** começar com até 2 itens em Em andamento por equipe ou subequipe; ajustar após observar o fluxo. Não é um limite encontrado no SGA.

### Uso proposto

1. Adicionar ao Project as issues já existentes, preservando seus números e histórico.
2. Definir campos de prioridade, estimativa, milestone/Sprint e responsável sem substituir as labels até que a equipe acorde a migração.
3. Revisar bloqueios e itens em andamento em cadência definida pelo grupo.
4. Manter comentários e evidências junto à issue/PR vinculada.
5. Mover para Concluído somente quando os critérios de conclusão forem verificados.

## Milestones e Sprint

Foram observados milestones de temas como “Back End — Integração com Banco” e “Front End — Ambientes e alocações”. A página de milestones indicava 25 abertos e 0 fechados durante a consulta; os exemplos exibidos não tinham data limite. Eles são registrados aqui como **milestones**, não como Sprints.

**Sugestão:** se o grupo optar por Scrum, planejar Sprints separadamente, cada uma com objetivo, período acordado e conjunto de issues selecionadas. O milestone pode continuar agrupando uma entrega temática de maior duração.

## Branches

Branches observadas no repositório:

- `main` — protegida.
- `develop-2`
- `Teste-fazano`
- `edilainesolde-patch-2`
- `feature/automacao`

Não foi encontrada convenção oficial que explique esses nomes ou defina um fluxo de branches. Não renomear nem apagar branches existentes com base nesta proposta.

**Convenção sugerida para novos trabalhos, se aprovada pela equipe:**

- `feature/<issue>-<slug>` para funcionalidade;
- `fix/<issue>-<slug>` para correção;
- `docs/<issue>-<slug>` para documentação;
- abrir PR para revisão, vinculando a issue e os testes/evidências.

## Critérios de conclusão

Alguns milestones contêm descrições com critérios genéricos sugeridos, tais como confirmar a necessidade da atividade, registrar alteração/teste no Git e vincular issue ao milestone e label corretos. Não foi encontrada uma Definition of Done única do projeto.

**Definition of Done — proposta para aprovação:**

- [ ] Critérios de aceitação da issue foram verificados.
- [ ] Alteração e testes aplicáveis foram registrados; falhas ou exceções estão explicitadas.
- [ ] PR foi revisado e integrado conforme o fluxo acordado pela equipe.
- [ ] Documentação pertinente foi atualizada.
- [ ] Issue, milestone e board refletem o estado real do trabalho.
- [ ] Evidência de validação está anexada, sem declarar atividades não realizadas.

**Definition of Ready — proposta:** objetivo e escopo claros, critérios de aceitação verificáveis, prioridade definida, estimativa acordada e dependências/bloqueios identificados antes de puxar para a Sprint ou para “Pronta”.
