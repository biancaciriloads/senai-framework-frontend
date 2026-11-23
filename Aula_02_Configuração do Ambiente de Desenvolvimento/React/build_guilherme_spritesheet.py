"""
build_guilherme_spritesheet.py
==============================

Monta o spritesheet do Guilherme a partir dos 12 PNGs individuais
(3 frames × 4 direções) no formato esperado pelo AnimationFactory.js.

Layout gerado (12 colunas × 4 linhas, cada frame 48×96 px):

  Linha 0 (frames  0-11): frente (down)    — idle: 0-2 | walk: 0-5
  Linha 1 (frames 12-23): esquerda (left)  — idle: 12-14 | walk: 15-20
  Linha 2 (frames 24-35): direita (right)  — idle: 24-26 | walk: 27-32
  Linha 3 (frames 36-47): costas (up)      — idle: 36-38 | walk: 39-44

Como o Guilherme tem apenas 3 frames por direção, os frames são
distribuídos assim em cada linha de 12:
  Pos 0: frame1  | Pos 1: frame2  | Pos 2: frame3
  Pos 3: frame1  | Pos 4: frame2  | Pos 5: frame3  (walk = mesmos 3 frames)
  Pos 6: frame1  | Pos 7: frame2  | Pos 8: frame3
  Pos 9: frame1  | Pos 10: frame2 | Pos 11: frame3

Saída: public/assets/sprites/player/guilherme/guilherme_spritesheet.png
"""

from PIL import Image
import os

BASE = os.path.join(os.path.dirname(__file__), "public", "assets")
SRC  = os.path.join(BASE, "sprites", "player", "guilherme")
OUT  = os.path.join(SRC, "guilherme_spritesheet.png")

FRAME_W = 48
FRAME_H = 96
COLS    = 12
ROWS    = 4

# Frames por direção (ordem: frame1, frame2, frame3)
DIRECTIONS = [
    ("frente", [
        "guilherme_frente_1_48x96.png",
        "guilherme_frente_2_48x96.png",
        "guilherme_frente_3_48x96.png",
    ]),
    ("esquerda", [
        "guilherme_esquerda_1_48x96.png",
        "guilherme_esquerda_2_48x96.png",
        "guilherme_esquerda_3_48x96.png",
    ]),
    ("direita", [
        "guilherme_direita_1_48x96.png",
        "guilherme_direita_2_48x96.png",
        "guilherme_direita_3_48x96.png",
    ]),
    ("costas", [
        "guilherme_costas_1_48x96.png",
        "guilherme_costas_2_48x96.png",
        "guilherme_costas_3_48x96.png",
    ]),
]

def build_spritesheet():
    sheet = Image.new("RGBA", (FRAME_W * COLS, FRAME_H * ROWS), (0, 0, 0, 0))

    for row_idx, (label, files) in enumerate(DIRECTIONS):
        frames = []
        for f in files:
            path = os.path.join(SRC, f)
            if not os.path.exists(path):
                print(f"  [AVISO] Arquivo não encontrado: {path}")
                frames.append(Image.new("RGBA", (FRAME_W, FRAME_H), (0, 0, 0, 0)))
            else:
                img = Image.open(path).convert("RGBA")
                if img.size != (FRAME_W, FRAME_H):
                    print(f"  [AVISO] {f} tem tamanho {img.size}, redimensionando para {FRAME_W}×{FRAME_H}")
                    img = img.resize((FRAME_W, FRAME_H), Image.LANCZOS)
                frames.append(img)

        # Preenche as 12 colunas repetindo os 3 frames ciclicamente
        for col_idx in range(COLS):
            frame = frames[col_idx % len(frames)]
            x = col_idx * FRAME_W
            y = row_idx * FRAME_H
            sheet.paste(frame, (x, y))

        print(f"  Linha {row_idx} ({label}): {len(frames)} frames → {COLS} colunas preenchidas")

    sheet.save(OUT)
    print(f"\n✓ Spritesheet salvo em: {OUT}")
    print(f"  Tamanho: {FRAME_W * COLS}×{FRAME_H * ROWS} px ({COLS} colunas × {ROWS} linhas)")

if __name__ == "__main__":
    print("=" * 60)
    print("  build_guilherme_spritesheet.py")
    print("  Gerando spritesheet do Guilherme...")
    print("=" * 60)
    build_spritesheet()
