# Aula 02 — Configuração do Ambiente de Desenvolvimento

## Objetivo
Configurar o ambiente completo de desenvolvimento front-end: versionamento (Git/GitHub), versionamento semântico (SemVer), IDE (VS Code), Node.js/NPM, criação de projetos React e deploy no Vercel.

---

## Principais Conceitos e Tecnologias

| Conceito | Descrição |
|---|---|
| **Versionamento vs Backup** | Histórico detalhado (autor, data, motivo), colaboração com merge, reversão granular vs cópia pontual sem rastreabilidade |
| **Versionamento Semântico (SemVer)** | Padrão `MAJOR.MINOR.PATCH`: breaking changes, novas features retrocompatíveis, correções de bug |
| **Git** | Controle de versão distribuído (Linus Torvalds); tags leves/anotadas; boas práticas: commits pequenos, mensagens claras, branches para features |
| **GitHub** | Hospedagem remota de repositórios Git, integração com CI/CD |
| **VS Code** | Editor leve extensível funcionando como IDE completa |
| **Node.js & NPM** | Runtime JS no servidor + gerenciador de pacotes (`package.json`, `npm install`) |
| **Create React App / Vite** | Inicialização de projetos React (`npx create-react-app` ou Vite moderno) |
| **Deploy Vercel** | Hospedagem otimizada para apps estáticos/modernos, integração Git nativa, CDN global, rollbacks fáceis |

---

## Estrutura de Arquivos e Pastas

```
Aula_02_Configuração do Ambiente de Desenvolvimento/
├── Atividade_01_Projeto_React/      # Projeto React com Phaser (jogo 2D)
│   ├── src/
│   │   ├── components/              # Interface React
│   │   ├── game/                    # Cenas e lógica Phaser
│   │   ├── store/                   # Estado da sessão do jogo
│   │   ├── hooks/                   # Hooks customizados
│   │   ├── services/                # Serviços (storage, audio)
│   │   ├── App.jsx / App.css
│   │   ├── index.js / index.css
│   │   └── theme.css / global.css
│   ├── public/assets/               # Imagens e recursos visuais
│   ├── package.json / package-lock.json
│   └── README.md
├── Resumo_Aula02.md                 # Resumo detalhado da aula
└── Aula 02 - Configuração do Ambiente de Desenvolvimento.pdf  # Slides da aula
```

---

## Atividade Prática

### Atividade 01 (Individual)
- Desenvolver aplicação React no VS Code
- Versionar com Git, enviar para GitHub
- Realizar deploy automatizado no Vercel
- Obter URL pública da aplicação

### Atividade 02 (Grupo)
- Escolher um Framework Front-end
- Elaborar relatório técnico em PDF (mínimo 5 páginas):
  - Características, vantagens, aplicações no mercado, exemplo prático

---

## Status / Observações
- **Atividade 01:** Deploy registrado em `https://projeto-react-01-three.vercel.app/` (revalidar)
- **Repositório de origem:** [biancaciriloads/projeto-react-01](https://github.com/biancaciriloads/projeto-react-01) (commit `5b6cd48`)
- **Resumo da aula:** Disponível em `Resumo_Aula02.md`
- **Stack do projeto:** React 19 + Phaser 4, Create React App (`npm start` em `localhost:3000`)

---

## Referências
- Repositório do projeto: [biancaciriloads/projeto-react-01](https://github.com/biancaciriloads/projeto-react-01)
- Deploy: [projeto-react-01-three.vercel.app](https://projeto-react-01-three.vercel.app/)
- Ver [README.md raiz](../../README.md) para visão geral do portfólio da disciplina