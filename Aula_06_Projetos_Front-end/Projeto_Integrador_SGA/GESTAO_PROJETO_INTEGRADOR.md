# Gestão do Projeto Integrador — SGA

## Objetivo e método

Este documento aplica os conceitos da Aula 6 ao **SGA — Sistema de Gestão de Ambientes**, usando uma inspeção somente leitura do repositório [edilainesolde/SGA](https://github.com/edilainesolde/SGA). O retrato foi consultado em 25/11/2026. Não houve alteração no repositório remoto, criação de issue, branch, Sprint ou board.

Para evitar apresentar propostas como fatos, cada tópico separa:

- **Encontrado:** evidência visível no repositório, issue tracker, branches, milestones ou páginas públicas do GitHub.
- **Não encontrado:** prática que não foi localizada na inspeção.
- **Sugestão:** maneira possível de organizar o trabalho segundo os conceitos da Aula 6; requer decisão e execução pela equipe.

## Escopo inspecionado

Na raiz do SGA foram encontrados `README.md`, `APP/`, `Diagramas/`, `backend/`, `cloud/`, `data_science/`, `devOps/`, `image/`, `package-lock.json` e `render.yaml`. O README descreve escopo, perfis, funcionalidades, prioridades e roadmap. Há documentação adicional listada na pasta `APP/`, um README em `backend/` e um README em `devOps/` e `cloud/`; `Diagramas/` contém material de modelagem.

O README identifica o produto como Sistema de Gestão de Ambientes e descreve, entre outros temas, cadastro e alocação de ambientes, reservas, manutenção, controle patrimonial e relatórios.

## Situação da gestão encontrada

| Item da atividade | O que foi encontrado | O que não foi encontrado / sugestão |
| --- | --- | --- |
| **Backlog** | O GitHub Issues contém itens de trabalho; há rótulo `backlog`. A página pública mostrava issues abertas. Exemplos e links estão em [BACKLOG.md](./BACKLOG.md). | Não foi localizado um documento formal único que consolide e ordene todos os itens como Product Backlog. Sugestão: manter cada necessidade como issue, vincular a um milestone e revisar o backlog periodicamente. |
| **Prioridades** | O README do SGA define Prioridade 1 (essencial), 2 (evolução) e 3 (conforme viabilidade). O GitHub também tem rótulos `urgente`, `Alta`, `Média` e `Baixa`; a descrição de `urgente` o define como crítico/bloqueador. | Não foi encontrada uma regra que relacione diretamente as categorias do README às labels. Sugestão: escolher uma escala única para o board e documentar quando cada nível se aplica. |
| **Tarefas** | Issues apresentam trabalho técnico com identificadores e títulos, por exemplo, BE-139 para disponibilizar endpoint de manutenção ao Front End. | Algumas issues consultadas têm pouco detalhamento; na issue #342, por exemplo, o corpo estava vazio. Sugestão: registrar contexto, critérios de aceitação, dependências e evidência esperada em cada issue. |
| **Estimativas** | Existem labels `PP`, `P`, `M` e `G`. | Não foi encontrada definição pública da escala, correspondência com esforço/pontos ou estimativa consistente nas issues consultadas. `Média` é uma label de prioridade, não deve ser interpretada automaticamente como tamanho. Sugestão: acordar uma escala (por exemplo, Planning Poker com pontos relativos), documentá-la e estimar os itens antes de planejar a Sprint. |
| **Sprint** | Existem milestones temáticos, por exemplo “Back End — Integração com Banco” e “Front End — Ambientes e alocações”. | Não foi encontrado ciclo identificado como Sprint, duração/cadência de Sprint ou objetivo de Sprint. Os milestones observados não foram renomeados nem presumidos como Sprints. Sugestão: acordar duração e objetivo de cada Sprint e criar uma iteração/iteration no board, associando somente os itens selecionados. |
| **Kanban / board** | A página [GitHub Projects](https://github.com/edilainesolde/SGA/projects) indicava 0 projetos abertos e 0 fechados. Há labels como `Em andamento` e `concluido`, além do estado aberto/fechado das issues. | Nenhum board Kanban foi encontrado. Sugestão: criar um GitHub Project, adicionar as issues existentes e usar as colunas propostas em [KANBAN.md](./KANBAN.md). |
| **Branches** | Foram encontradas `main` (protegida), `develop-2`, `Teste-fazano`, `edilainesolde-patch-2` e `feature/automacao`. | Os nomes existentes não comprovam uma convenção documentada de branches. Sugestão: definir padrão futuro ligado à issue, sem renomear ou apagar branches existentes; ver proposta em [KANBAN.md](./KANBAN.md). |
| **Critérios de conclusão** | Descrições de alguns milestones incluem critérios genéricos sugeridos, como validar a atividade, registrar alteração/teste no Git e associar issue ao milestone e label corretos. | Não foi encontrado um Definition of Done global do projeto, aplicado a todas as issues. Sugestão: aprovar um checklist comum antes de mover itens para Concluído. |
| **Definition of Ready** | Não foi encontrada uma Definition of Ready (DoR) formal. | Sugestão: exigir objetivo compreensível, critérios de aceitação verificáveis, prioridade, estimativa, dependências e responsável acordado antes de selecionar um item. |

## Prioridade e seleção do trabalho

As prioridades P1/P2/P3 abaixo são as categorias registradas no README do SGA, não uma reavaliação da equipe nesta atividade:

1. **Prioridade 1 — Essencial:** mapeamento, requisitos, acesso, cadastros, alocações e relatórios de utilização.
2. **Prioridade 2 — Evolução:** reservas, disponibilidade automática, filtros, QR Code/checklist e canal público de manutenção/triagem.
3. **Prioridade 3 — Conforme viabilidade:** RFID, controle patrimonial, módulo de manutenção, histórico, SLA, indicadores e upload de fotos.

As issues podem ter classificações adicionais por label. Antes de planejar trabalho, a equipe deve resolver conflitos ou diferenças entre a prioridade descrita no README e os rótulos aplicados a cada issue.

## Sugestão de fluxo de planejamento

1. Revisar issues abertas e remover duplicidades somente após confirmação da equipe.
2. Completar descrição e critérios de aceitação, prioridade, estimativa, dependências e milestone.
3. Criar/atualizar um board e selecionar itens prontos, respeitando a capacidade real da equipe.
4. Se Scrum for escolhido, definir objetivo, duração e data de revisão de cada Sprint; milestones temáticos podem continuar sendo usados como agrupamentos de entrega, sem confundir os conceitos.
5. Ao concluir o trabalho, anexar evidência verificável e mover o cartão para Concluído apenas após cumprir o DoD acordado.

As etapas acima são uma proposta didática, não uma descrição de processo que já esteja em execução no SGA.
