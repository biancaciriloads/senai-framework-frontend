# Projeto React - Aula 02

Esta pasta contém uma cópia local do código-fonte do projeto React publicado no Vercel. O link para o deploy também está no [README principal](../../README.md).

## Sobre o projeto

Aplicação web desenvolvida com React 19 e Phaser 4, com telas de início e carregamento e um jogo 2D. A interface e a sessão do jogo são organizadas em componentes React; as cenas e a renderização do jogo usam Phaser.

## Executar localmente

Requisitos: Node.js e npm instalados.

Na pasta deste projeto, instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm ci
npm start
```

O Create React App disponibiliza a aplicação em `http://localhost:3000`.

Outros comandos disponíveis:

```bash
npm test
npm run build
```

## Estrutura principal

- `src/components/`: interface React.
- `src/game/`: cenas, configuração e lógica do Phaser.
- `src/store/`: estado da sessão do jogo.
- `public/assets/`: imagens e demais recursos visuais.

## Origem e publicação

- Deploy: [projeto-react-01-three.vercel.app](https://projeto-react-01-three.vercel.app/).
- Repositório de origem: [biancaciriloads/projeto-react-01](https://github.com/biancaciriloads/projeto-react-01).
- Fonte importada da branch `master`, commit `5b6cd485af7cd372da9e901de496644c326e78ae`.
