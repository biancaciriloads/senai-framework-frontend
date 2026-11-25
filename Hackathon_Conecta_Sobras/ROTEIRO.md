# Roteiro de demonstração — Mesa Circular

Roteiro local de apoio. É uma proposta adaptada; não afirma que a demonstração, protótipo, board ou publicação já aconteceram.

## Preparação

1. Instalar dependências e iniciar com `npm run dev`.
2. Abrir **Doações** e carregar os exemplos fictícios.
3. Confirmar que os exemplos aparecem na lista e que filtros de texto, categoria e status funcionam.
4. Usar uma janela de navegador limpa se for necessário demonstrar o estado inicial (os dados ficam em `localStorage`).

## Demonstração sugerida (4 minutos)

1. **Contexto e objetivo (1 min):** apresentar Mesa Circular e a relação com ODS 2 e ODS 12.
2. **Encontrar uma oferta (1 min):** filtrar doações, abrir detalhes e reservar uma oferta disponível.
3. **Publicar e acompanhar (1 min):** preencher uma doação fictícia, confirmar coleta e mostrar histórico/painel de impacto.
4. **Arquitetura e próximos passos (1 min):** mostrar React, Vite, Tailwind, React Router, persistência local e o status de publicação.

## Checklist antes da apresentação

- [ ] `npm test` e `npm run build` aprovados.
- [ ] Fluxos de cadastro demonstrativo, criação, reserva e coleta verificados.
- [ ] Layout testado em tela estreita e navegação por teclado revisada.
- [ ] Protótipo/benchmarking e demais entregáveis do roteiro do curso registrados separadamente.
- [ ] Publicação na Vercel concluída e URL registrada no README principal e na matriz.
- [ ] Não apresentar os exemplos fictícios como doações reais, nem declarar autenticação ou backend.
