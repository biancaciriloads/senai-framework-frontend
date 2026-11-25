# Backlog observado — SGA

Este arquivo registra evidências públicas da organização do trabalho encontrada em [edilainesolde/SGA](https://github.com/edilainesolde/SGA) na inspeção de 25/11/2026. Não substitui nem altera o backlog remoto e não afirma que os exemplos abaixo sejam o conjunto completo ou uma ordem de execução.

## Como o backlog aparece no SGA

- O GitHub Issues contém tarefas técnicas e o repositório possui uma label chamada `backlog`.
- O README documenta prioridades em três níveis (Prioridade 1, 2 e 3) e um roadmap por fases.
- Foram encontrados milestones para agrupamentos temáticos. Os milestones não foram identificados como Sprints.
- Não foi localizado um único documento Product Backlog que consolide e classifique formalmente todos os itens.

## Exemplos de itens realmente encontrados

| Issue | Título | Estado e classificações observadas | Milestone |
| --- | --- | --- | --- |
| [#342 — BE-139](https://github.com/edilainesolde/SGA/issues/342) | Disponibilizar endpoint de manutenção para Front End | Aberta; labels `backend`, `backlog`, `Média`. O corpo da issue estava vazio na consulta. | Nenhum associado. |
| [#341 — BE-138](https://github.com/edilainesolde/SGA/issues/341) | Disponibilizar endpoint de alocações para Front End | Aberta; labels `backend`, `backlog`, `Média`. | Não confirmado nesta inspeção. |
| [#337 — BE-129](https://github.com/edilainesolde/SGA/issues/337) | Integrar API com tabela de alocações | Aberta; labels `backend`, `backlog`, `Média`. | “Back End — Integração com Banco”. |
| [#332 — BE-064](https://github.com/edilainesolde/SGA/issues/332) | Criar rota GET de ambientes | Aberta. | Não confirmado nesta inspeção. |

Os títulos e classificações acima são exemplos pontuais do issue tracker; não foram transformados em histórias de usuário nem receberam novas estimativas.

## Prioridades registradas no README do SGA

O README agrupa funcionalidades nas seguintes categorias:

| Categoria encontrada | Exemplos descritos no README |
| --- | --- |
| **Prioridade 1 — Essencial** | Mapeamento de espaços, análise de requisitos, login/perfis, cadastros de salas/docentes/turmas, alocação e relatórios. |
| **Prioridade 2 — Evolução** | Reservas, verificação de disponibilidade, filtros, QR Code/checklist patrimonial e canal público de sugestão de manutenção/triagem. |
| **Prioridade 3 — Conforme viabilidade** | RFID, controle patrimonial, módulo de manutenção, histórico, SLA, indicadores e upload de fotos. |

O GitHub também exibe labels de prioridade como `urgente`, `Alta`, `Média` e `Baixa`. A issue #342, por exemplo, tem label `Média`. Não foi localizada uma regra que mapeie essas labels para as categorias P1/P2/P3 do README.

## Estimativas: evidência e lacuna

Foram encontrados nomes de labels `PP`, `P`, `M` e `G`, mas a inspeção não confirmou a definição ou o uso consistente delas como estimativa. Não foi identificada uma unidade de esforço comum. A label `Média` em issues é classificada como prioridade no repositório, não como estimativa.

**Sugestão para a equipe:** definir por escrito uma única escala de estimativa relativa, explicar cada valor e aplicá-la durante refinamento. Planning Poker ou tamanhos P/M/G podem ser escolhidos pelo grupo; isso ainda não está comprovado como prática do SGA.

## Tarefas / próximos passos sugeridos (não são issues criadas)

Estas propostas indicam como completar a gestão sem inventar itens já existentes:

1. Revisar os itens abertos e completar as issues sem contexto suficiente, começando pela #342 como exemplo observado.
2. Registrar critérios de aceitação e dependências em cada issue.
3. Documentar como prioridade P1/P2/P3 se relaciona às labels do GitHub.
4. Definir escala de estimativa e revisar se as labels `PP`, `P`, `M`, `G` serão utilizadas para isso.
5. Associar issues aos milestones temáticos apropriados e definir datas apenas após acordo da equipe.
6. Selecionar itens para uma Sprint somente depois de definir objetivo, período e capacidade da equipe.

Nenhuma dessas sugestões foi executada no repositório remoto nesta atividade.
