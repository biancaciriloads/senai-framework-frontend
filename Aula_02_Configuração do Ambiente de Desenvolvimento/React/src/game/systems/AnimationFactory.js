/**
 * AnimationFactory
 *
 * Centraliza a criacao das animacoes do jogador — tanto as animacoes
 * side-scroller (legado) quanto as top-down (Gather.town).
 *
 * Top-down: usa os frames individuais do Guilherme (48x96 cada).
 * - td-idle-down / td-idle-up / td-idle-left / td-idle-right
 * - td-walk-down / td-walk-up / td-walk-left / td-walk-right
 */

// ---- Top-down (Gather.town) ----
// Usa frames individuais carregados como images (guilherme-*).
// Cada direcao tem 3 frames; idle e walk reaproveitam os mesmos frames.
export function createTopDownAnimations(scene) {
  const { anims } = scene;

  // Helper: cria animacao a partir de lista de chaves de textura individuais
  const make = (key, keys, frameRate, repeat = -1) => {
    if (!anims.exists(key)) {
      anims.create({
        key,
        frames: keys.map((k) => ({ key: k })),
        frameRate,
        repeat,
      });
    }
  };

  // IDLE — 3 frames, cadencia lenta
  make('td-idle-down',  ['guilherme-frente-1',   'guilherme-frente-2',   'guilherme-frente-3'],   4);
  make('td-idle-left',  ['guilherme-esquerda-1', 'guilherme-esquerda-2', 'guilherme-esquerda-3'], 4);
  make('td-idle-right', ['guilherme-direita-1',  'guilherme-direita-2',  'guilherme-direita-3'],  4);
  make('td-idle-up',    ['guilherme-costas-1',   'guilherme-costas-2',   'guilherme-costas-3'],   4);

  // WALK — mesmos 3 frames, cadencia mais rapida
  make('td-walk-down',  ['guilherme-frente-1',   'guilherme-frente-2',   'guilherme-frente-3'],   8);
  make('td-walk-left',  ['guilherme-esquerda-1', 'guilherme-esquerda-2', 'guilherme-esquerda-3'], 8);
  make('td-walk-right', ['guilherme-direita-1',  'guilherme-direita-2',  'guilherme-direita-3'],  8);
  make('td-walk-up',    ['guilherme-costas-1',   'guilherme-costas-2',   'guilherme-costas-3'],   8);
}

export function createAllTopDownAnimations(scene) {
  createTopDownAnimations(scene);
}
