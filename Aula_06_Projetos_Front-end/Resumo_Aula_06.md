# Resumo da Aula 06: Projetos Front-end — Projeto Integrador SGA
**Instituição:** SENAI  
**Disciplina:** Frameworks Front-end  
**Professor:** Me. Deivison S. Takatu  

---

## 1. Sumário da Aula
- Análise de gestão de projetos aplicada ao repositório público **SGA — Sistema de Gestão de Ambientes**
- Inspeção de backlog, issues, prioridades, milestones, branches e GitHub Projects
- Documentação de evidências encontradas vs. sugestões de melhoria
- Conceitos de Product Backlog, Sprint, Kanban, Definition of Ready/Done, estimativas e convenção de branches

---

## 2. Objetivo da Atividade
Aplicar os conceitos de gestão ágil (Scrum/Kanban) estudados na aula ao inspecionar um repositório real e público (SGA), registrando:
- O que foi **encontrado** (evidências objetivas no GitHub)
- O que **não foi encontrado** (lacunas na gestão atual)
- **Sugestões** didáticas de como a equipe poderia organizar o trabalho

> **Importante:** A inspeção foi somente leitura (25/11/2026). Nenhuma alteração foi feita no repositório remoto [edilainesolde/SGA](https://github.com/edilainesolde/SGA).

---

## 3. Repositório Inspecionado
- **Projeto:** SGA — Sistema de Gestão de Ambientes
- **Repositório:** [edilainesolde/SGA](https://github.com/edilainesolde/SGA)
- **Deploy identificado:** [sga-iota.vercel.app](https://sga-iota.vercel.app) (informado na seção "About" do repositório)
- **Estrutura principal:** `README.md`, `APP/`, `Diagramas/`, `backend/`, `cloud/`, `data_science/`, `devOps/`, `image/`, `package-lock.json`, `render.yaml`

---

## 4. Principais Conceitos e Tecnologias Aplicados

| Conceito | Situação no SGA | Observação |
|---|---|---|
| **Product Backlog** | Parcial | Issues + label `backlog` + prioridades no README; sem documento único consolidado |
| **Priorização** | Parcial | P1/P2/P3 no README; labels `urgente`/`Alta`/`Média`/`Baixa` no GitHub; sem mapeamento entre escalas |
| **Estimativa** | Não definida como regra | Labels `PP`/`P`/`M`/`G` existem; escala e significado não confirmados |
| **Sprint** | Não identificada | Milestones temáticos existem (ex: "Back End — Integração com Banco"); não há ciclos com objetivo/duração definidos |
| **Kanban / Board** | Não encontrado | GitHub Projects indicava 0 projetos abertos/fechados |
| **Branches** | Existentes sem convenção | `main` (protegida), `develop-2`, `Teste-fazano`, `edilainesolde-patch-2`, `feature/automacao` |
| **Definition of Ready (DoR)** | Não formalizada | Sugerida em documento local |
| **Definition of Done (DoD)** | Não formalizada | Critérios genéricos em alguns milestones; proposta em documento local |
| **Deploy** | Identificado | Vercel: `sga-iota.vercel.app` |

---

## 5. Estrutura / Arquivos Principais da Entrega
A documentação local foi organizada na pasta `Aula_06_Projetos_Front-end/Projeto_Integrador_SGA/`:

| Arquivo | Descrição |
|---|---|
| `README.md` | Visão geral da atividade, links verificados e índice dos documentos |
| `GESTAO_PROJETO_INTEGRADOR.md` | Análise detalhada: backlog, prioridades, tarefas, estimativas, sprint, kanban, branches, critérios de conclusão, DoR/DoD, sugestão de fluxo |
| `BACKLOG.md` | Registro de issues encontradas (ex: BE-139, BE-138, BE-129, BE-064), prioridades do README, lacuna de estimativas, próximos passos sugeridos |
| `KANBAN.md` | Situação do board (não existe), proposta de colunas (Backlog, Pronta, Em andamento, Revisão/Testes, Concluído, Bloqueado), WIP sugerido, milestones vs. sprints, convenção de branches sugerida, DoD/DoR propostas |
| `GLOSSARIO.md` | Definições dos termos da atividade com marcadores: **Encontrado**, **Não encontrado**, **Sugestão** |

---

## 6. Status de Deploy / Observações
- **Deploy da aplicação SGA:** Externo, hospedado na Vercel (`sga-iota.vercel.app`) — não é deploy desta cópia local
- **Documentação local:** Não exige deploy; serve como registro acadêmico da inspeção
- **GitHub Projects:** Nenhum board encontrado na data da inspeção
- **Escopo:** A atividade distingue fatos observados de propostas didáticas; sugestões não significam que foram aplicadas ao SGA

---

## 7. Referências
- Repositório SGA: https://github.com/edilainesolde/SGA
- Aplicação SGA: https://sga-iota.vercel.app
- GitHub Projects SGA: https://github.com/edilainesolde/SGA/projects
- Issues SGA: https://github.com/edilainesolde/SGA/issues
- Milestones SGA: https://github.com/edilainesolde/SGA/milestones