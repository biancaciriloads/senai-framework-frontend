# Aula 07 — Atividade 01: Box Model e Flexbox

Página didática em HTML semântico e CSS externo para observar as partes do Box Model e comparar vinte configurações de layout Flexbox.

## Executar localmente

Não há dependências, etapa de compilação ou deploy. Abra [`index.html`](./index.html) em um navegador moderno. O arquivo [`style.css`](./style.css) é carregado pelo próprio HTML.

## Box Model

O diagrama identifica as quatro partes da caixa CSS:

1. **Content:** texto ou elemento dentro do cartão.
2. **Padding:** espaço interno entre o conteúdo e a borda.
3. **Border:** contorno visível do cartão.
4. **Margin:** espaçamento externo do cartão.

Cada um dos vinte cartões de demonstração também possui conteúdo, `padding`, `border` e `margin` configurados em `.demo-card`. O seletor global `box-sizing: border-box` torna o cálculo das dimensões previsível.

## Vinte demonstrações de Flexbox

Cada cartão mostra a configuração principal e seu resultado visual. Em propriedades com vários valores, os exemplos ajudam a comparar o comportamento sem alterar a ordem do HTML.

| # | Configuração | O que demonstra |
| ---: | --- | --- |
| 01 | `display: flex` | Ativa o contexto flexível. |
| 02 | `flex-direction: row` | Eixo principal em linha. |
| 03 | `flex-direction: row-reverse` | Linha com direção invertida. |
| 04 | `flex-direction: column` | Eixo principal em coluna. |
| 05 | `flex-direction: column-reverse` | Coluna com direção invertida. |
| 06 | `flex-wrap: nowrap` | Mantém uma linha e ilustra `flex-shrink`. |
| 07 | `flex-wrap: wrap` | Quebra itens em múltiplas linhas. |
| 08 | `flex-wrap: wrap-reverse` | Inverte a direção transversal das linhas e demonstra `align-content`. |
| 09 | `flex-flow: row wrap` | Abrevia direção e quebra; usa `column-gap` e `row-gap`. |
| 10 | `justify-content: flex-start` | Alinha no início do eixo principal. |
| 11 | `justify-content: flex-end` | Alinha no final do eixo principal. |
| 12 | `justify-content: center` | Centraliza os itens no eixo principal. |
| 13 | `justify-content: space-between` | Distribui o espaço entre os itens. |
| 14 | `justify-content: space-around` | Distribui espaço ao redor dos itens. |
| 15 | `justify-content: space-evenly` | Distribui espaços iguais entre itens e bordas. |
| 16 | `align-items: flex-start` | Alinha itens no início do eixo transversal. |
| 17 | `align-self: center` | Alinha um item independentemente dos irmãos. |
| 18 | `flex-grow: 1` | Permite que um item ocupe o espaço livre. |
| 19 | `order: -1` | Altera a ordem visual de um item. |
| 20 | `flex: 2 1 4rem` | Combina crescimento, redução e base flexível. |

O Flexbox oferece menos de vinte propriedades específicas distintas; por isso, a exigência de vinte “propriedades” está representada como vinte exemplos aplicados, incluindo combinações de propriedade/valor e configurações relacionadas, sem contar valores diferentes como novas propriedades.

## Layout e acessibilidade

- CSS externo, paleta consistente e cartões organizados com CSS Grid.
- Grade em três colunas, duas colunas em telas médias e uma coluna em telas pequenas.
- A navegação usa links para as seções e inclui foco visível para teclado.
- A preferência por movimento reduzido é respeitada.
- A interface não precisa de JavaScript, API ou conexão com a Internet.

## Validação local

- Vinte cartões HTML: **conferidos**.
- Vinte configurações Flexbox documentadas: **conferidas**.
- CSS externo carregado e valores principais observados no navegador: **conferidos**.
- Layout verificado em desktop e em viewport móvel; sem overflow horizontal: **conferido**.
- O projeto é estático e não requer lint, testes automatizados ou build.

## Publicação manual — checklist

- [ ] Repositório GitHub: **inserir link após publicação**
- [ ] Página publicada: **inserir URL após deploy manual**
- [ ] Captura da aplicação: **adicionar se solicitada na entrega**
