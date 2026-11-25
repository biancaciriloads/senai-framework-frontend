# Hackathon — Mesa Circular

Aplicação web acadêmica para aproximar doadores de excedentes alimentares de pessoas e organizações que podem coletá-los. A adaptação usa o tema do repositório de referência, com identidade e dados locais próprios.

## Referências e distinção de escopo

### Encontrado no repositório de referência

- Projeto chamado **Conecta Sobras**, relacionado à ODS 2 (Fome Zero e Agricultura Sustentável) e à ODS 12 (Consumo e Produção Responsáveis).
- Stack documentada: React, Vite, Tailwind CSS, React Router e `localStorage`.
- Aplicação SPA com configuração para publicação na Vercel.
- O README e o `ROTEIRO.md` do repositório descrevem requisitos funcionais e não funcionais, benchmarking, protótipo, demonstração e publicação. Entre os itens apresentados estão protótipo mínimo de 10 telas, 50 cards reais e 30 commits significativos.

Referência consultada somente para leitura: [guibuenoc/hackthon-frameworks](https://github.com/guibuenoc/hackthon-frameworks).

### Adaptado e implementado aqui

- Nome **Mesa Circular** e namespace exclusivo de dados locais `mesa-circular:*`.
- React + Vite + Tailwind CSS + React Router, com navegação SPA e regra de rewrite na Vercel.
- Cadastro demonstrativo, publicação de doação, busca/filtros, detalhes, reserva, confirmação de coleta, histórico e painel de impacto.
- Quatro registros de exemplo são fictícios e servem para demonstração; não representam os 50 cards reais mencionados no material de referência.
- Perfis e doações ficam apenas no navegador atual. Não há autenticação, API, sincronização entre pessoas ou dados reais.
- Nenhum board/Kanban foi criado ou confirmado nesta tarefa. Se a gestão visual for exigida, criar um GitHub Project no repositório do curso com colunas como A fazer, Em andamento, Revisão e Concluído e acompanhar tarefas reais por cards.

## Executar e validar

Requer Node.js compatível com a versão instalada do Vite e npm.

```bash
npm install
npm run dev
npm test
npm run build
npm run preview
```

O desenvolvimento desta cópia ainda precisa ser validado com `npm test` e `npm run build`; o ambiente de edição atual não tem Node/npm disponíveis.

## Publicação

- Repositório de estudo: [guibuenoc/hackthon-frameworks](https://github.com/guibuenoc/hackthon-frameworks) (somente referência).
- Repositório do curso: [biancaciriloads/senai-framework-frontend](https://github.com/biancaciriloads/senai-framework-frontend).
- Raiz do projeto para a Vercel: `Hackathon_Conecta_Sobras`.
- Build: `npm run build`; saída: `dist`; o `vercel.json` aplica rewrite para a SPA.
- URL da Vercel: **pendente de publicação** — registrar aqui após publicar.

Antes de apresentar como entrega final, testar fluxos e responsividade, revisar acessibilidade, completar os requisitos do roteiro (incluindo benchmarking/protótipo e dados reais autorizados) e publicar a aplicação. Não inserir informações pessoais ou dados reais de doadores sem autorização.
