import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";

import "./ShapeGrid.css";

type Shape = "square" | "hexagon" | "circle" | "triangle";
type Direction = "up" | "down" | "left" | "right" | "diagonal";
type Mode = "flow" | "reveal";
type Cell = { x: number; y: number };

type ShapeGridProps = {
  mode?: Mode;
  direction?: Direction;
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  size?: number;
  hoverFillColor?: string;
  hoverColor?: string;
  shape?: Shape;
  hoverTrailAmount?: number;
  className?: string;
  hostRef?: RefObject<HTMLElement | null>;
  text?: string;
  textColor?: string;
  textOffsetColumns?: number;
  textOffsetRows?: number;
  textReveal?: boolean;
  textRevealActive?: boolean;
  textRevealStepMs?: number;
};

type GridMetrics = {
  columns: number;
  rows: number;
};

type GlyphPattern = {
  width: number;
  height: number;
  cells: Cell[];
};

type WordPattern = {
  gap: number;
  glyphs: GlyphPattern[];
};

const BITMAP_FONT: Record<string, string[]> = {
  Y: ["101", "101", "010", "010"],
  U: ["101", "101", "101", "111"],
  M: ["1001", "1111", "1001", "1001"],
  I: ["111", "010", "010", "111"],
};

const Y_WIDE: GlyphPattern = {
  width: 3,
  height: 4,
  cells: [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
  ],
};

const Y_COMPACT: GlyphPattern = {
  width: 3,
  height: 4,
  cells: [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
  ],
};

const Y_MICRO: GlyphPattern = {
  width: 3,
  height: 4,
  cells: [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
  ],
};

const U_WIDE: GlyphPattern = {
  width: 4,
  height: 4,
  cells: [
    { x: 0, y: 0 },
    { x: 3, y: 0 },
    { x: 0, y: 1 },
    { x: 3, y: 1 },
    { x: 0, y: 2 },
    { x: 3, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
  ],
};

const U_COMPACT: GlyphPattern = {
  width: 3,
  height: 4,
  cells: [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 2, y: 1 },
    { x: 0, y: 2 },
    { x: 2, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
  ],
};

const M_WIDE: GlyphPattern = {
  width: 5,
  height: 4,
  cells: [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 0, y: 2 },
    { x: 2, y: 2 },
    { x: 4, y: 2 },
    { x: 0, y: 3 },
    { x: 4, y: 3 },
  ],
};

const M_COMPACT: GlyphPattern = {
  width: 4,
  height: 4,
  cells: [
    { x: 0, y: 0 },
    { x: 3, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 0, y: 2 },
    { x: 3, y: 2 },
    { x: 0, y: 3 },
    { x: 3, y: 3 },
  ],
};

const I_WIDE: GlyphPattern = {
  width: 3,
  height: 4,
  cells: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
  ],
};

const I_MICRO: GlyphPattern = {
  width: 2,
  height: 4,
  cells: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 3 },
  ],
};

const YUUMI_PATTERNS: WordPattern[] = [
  {
    gap: 1,
    glyphs: [Y_WIDE, U_WIDE, U_WIDE, M_WIDE, I_WIDE],
  },
  {
    gap: 1,
    glyphs: [Y_COMPACT, U_COMPACT, U_COMPACT, M_COMPACT, I_WIDE],
  },
  {
    gap: 0,
    glyphs: [Y_MICRO, U_COMPACT, U_COMPACT, M_COMPACT, I_MICRO],
  },
];

function buildWordPatternCells(
  pattern: WordPattern,
  metrics: GridMetrics,
  offsetColumns = 0,
  offsetRows = 0,
): number[] {
  const patternHeight = Math.max(...pattern.glyphs.map((glyph) => glyph.height));
  const patternWidth = pattern.glyphs.reduce(
    (sum, glyph, index) => sum + glyph.width + (index > 0 ? pattern.gap : 0),
    0,
  );

  if (patternWidth > metrics.columns || patternHeight > metrics.rows) {
    return [];
  }

  const startColumn = Math.max(
    0,
    Math.min(
      metrics.columns - patternWidth,
      Math.floor((metrics.columns - patternWidth) / 2) + offsetColumns,
    ),
  );
  const startRow = Math.max(
    0,
    Math.min(
      metrics.rows - patternHeight,
      Math.floor((metrics.rows - patternHeight) / 2) + offsetRows,
    ),
  );

  const cells: number[] = [];
  let currentColumn = startColumn;

  pattern.glyphs.forEach((glyph, index) => {
    if (index > 0) {
      currentColumn += pattern.gap;
    }

    glyph.cells.forEach((cell) => {
      cells.push((startRow + cell.y) * metrics.columns + currentColumn + cell.x);
    });

    currentColumn += glyph.width;
  });

  return cells;
}

function withAlpha(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((value) => value + value)
          .join("")
      : normalized;

  const r = Number.parseInt(expanded.slice(0, 2), 16);
  const g = Number.parseInt(expanded.slice(2, 4), 16);
  const b = Number.parseInt(expanded.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function buildBitmapTextCells(
  text: string,
  metrics: GridMetrics,
  offsetColumns = 0,
  offsetRows = 0,
): number[] {
  const normalizedText = text.toUpperCase().replace(/\s+/g, "");

  if (normalizedText === "YUUMI") {
    for (const pattern of YUUMI_PATTERNS) {
      const cells = buildWordPatternCells(pattern, metrics, offsetColumns, offsetRows);
      if (cells.length > 0) {
        return cells;
      }
    }
  }

  const glyphs = text
    .toUpperCase()
    .split("")
    .map((character) => BITMAP_FONT[character])
    .filter((glyph): glyph is string[] => Boolean(glyph));

  if (glyphs.length === 0) {
    return [];
  }

  const glyphHeight = glyphs[0].length;
  const totalWidth = glyphs.reduce(
    (sum, glyph, index) => sum + glyph[0].length + (index > 0 ? 1 : 0),
    0,
  );

  if (totalWidth > metrics.columns || glyphHeight > metrics.rows) {
    return [];
  }

  const startColumn = Math.max(
    0,
    Math.min(
      metrics.columns - totalWidth,
      Math.floor((metrics.columns - totalWidth) / 2) + offsetColumns,
    ),
  );
  const startRow = Math.max(
    0,
    Math.min(metrics.rows - glyphHeight, Math.floor((metrics.rows - glyphHeight) / 2) + offsetRows),
  );
  const cells: number[] = [];
  let currentColumn = startColumn;

  glyphs.forEach((glyph, glyphIndex) => {
    if (glyphIndex > 0) {
      currentColumn += 1;
    }

    glyph.forEach((rowPattern, rowIndex) => {
      rowPattern.split("").forEach((value, columnIndex) => {
        if (value === "1") {
          cells.push((startRow + rowIndex) * metrics.columns + currentColumn + columnIndex);
        }
      });
    });

    currentColumn += glyph[0].length;
  });

  return cells;
}

function buildCanvasTextCells(
  text: string,
  metrics: GridMetrics,
  offsetColumns = 0,
  offsetRows = 0,
): number[] {
  const bitmapCells = buildBitmapTextCells(text, metrics, offsetColumns, offsetRows);
  if (bitmapCells.length > 0) {
    return bitmapCells;
  }

  if (typeof document === "undefined" || metrics.columns <= 0 || metrics.rows <= 0) {
    return [];
  }

  const sampleSize = 28;
  const canvas = document.createElement("canvas");
  canvas.width = metrics.columns * sampleSize;
  canvas.height = metrics.rows * sampleSize;

  const context = canvas.getContext("2d");
  if (!context) {
    return [];
  }

  const centerX = canvas.width / 2 + offsetColumns * sampleSize;
  const centerY = canvas.height / 2 + offsetRows * sampleSize;
  let fontSize = Math.floor(canvas.height * 0.52);

  context.textAlign = "center";
  context.textBaseline = "middle";

  while (fontSize > 12) {
    context.font = `900 ${fontSize}px "Rammetto One", "Arial Black", sans-serif`;
    if (context.measureText(text).width <= canvas.width * 0.84) {
      break;
    }
    fontSize -= 2;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#ffffff";
  context.font = `900 ${fontSize}px "Rammetto One", "Arial Black", sans-serif`;
  context.fillText(text, centerX, centerY);

  const { data, width, height } = context.getImageData(0, 0, canvas.width, canvas.height);
  const cells: number[] = [];

  for (let row = 0; row < metrics.rows; row += 1) {
    for (let column = 0; column < metrics.columns; column += 1) {
      const startX = column * sampleSize;
      const startY = row * sampleSize;
      let filledPixels = 0;

      for (let y = startY; y < Math.min(startY + sampleSize, height); y += 1) {
        for (let x = startX; x < Math.min(startX + sampleSize, width); x += 1) {
          const alpha = data[(y * width + x) * 4 + 3];
          if (alpha > 18) {
            filledPixels += 1;
          }
        }
      }

      if (filledPixels >= sampleSize * sampleSize * 0.14) {
        cells.push(row * metrics.columns + column);
      }
    }
  }

  return cells.length > 0 ? cells : buildBitmapTextCells(text, metrics, offsetColumns, offsetRows);
}

function FlowShapeGrid({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  size,
  hoverFillColor = "#222",
  hoverColor,
  shape = "square",
  hoverTrailAmount = 0,
  className = "",
  hostRef,
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef<Cell | null>(null);
  const trailCells = useRef<Cell[]>([]);
  const cellOpacities = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef?.current ?? canvas?.parentElement;
    if (!canvas || !host) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const resolvedSize = size ?? squareSize;
    const resolvedHoverColor = hoverColor ?? hoverFillColor;
    const isHex = shape === "hexagon";
    const isTriangle = shape === "triangle";
    const isCircle = shape === "circle";
    const hexHoriz = resolvedSize * 1.5;
    const hexVert = resolvedSize * Math.sqrt(3);

    const resizeCanvas = () => {
      canvas.width = host.clientWidth;
      canvas.height = host.clientHeight;
    };

    const drawHex = (cx: number, cy: number, drawSize: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i += 1) {
        const angle = (Math.PI / 3) * i;
        const vx = cx + drawSize * Math.cos(angle);
        const vy = cy + drawSize * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(vx, vy);
        } else {
          ctx.lineTo(vx, vy);
        }
      }
      ctx.closePath();
    };

    const drawCircle = (cx: number, cy: number, drawSize: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, drawSize / 2, 0, Math.PI * 2);
      ctx.closePath();
    };

    const drawTriangle = (cx: number, cy: number, drawSize: number, flip: boolean) => {
      ctx.beginPath();
      if (flip) {
        ctx.moveTo(cx, cy + drawSize / 2);
        ctx.lineTo(cx + drawSize / 2, cy - drawSize / 2);
        ctx.lineTo(cx - drawSize / 2, cy - drawSize / 2);
      } else {
        ctx.moveTo(cx, cy - drawSize / 2);
        ctx.lineTo(cx + drawSize / 2, cy + drawSize / 2);
        ctx.lineTo(cx - drawSize / 2, cy + drawSize / 2);
      }
      ctx.closePath();
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1;

      if (isHex) {
        const colShift = Math.floor(gridOffset.current.x / hexHoriz);
        const offsetX = ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;
        const cols = Math.ceil(canvas.width / hexHoriz) + 3;
        const rows = Math.ceil(canvas.height / hexVert) + 3;

        for (let col = -2; col < cols; col += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = col * hexHoriz + offsetX;
            const cy = row * hexVert + ((col + colShift) % 2 !== 0 ? hexVert / 2 : 0) + offsetY;
            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.current.get(cellKey);

            if (alpha) {
              ctx.globalAlpha = alpha;
              drawHex(cx, cy, resolvedSize);
              ctx.fillStyle = resolvedHoverColor;
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            drawHex(cx, cy, resolvedSize);
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else if (isTriangle) {
        const halfW = resolvedSize / 2;
        const colShift = Math.floor(gridOffset.current.x / halfW);
        const rowShift = Math.floor(gridOffset.current.y / resolvedSize);
        const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
        const offsetY = ((gridOffset.current.y % resolvedSize) + resolvedSize) % resolvedSize;
        const cols = Math.ceil(canvas.width / halfW) + 4;
        const rows = Math.ceil(canvas.height / resolvedSize) + 4;

        for (let col = -2; col < cols; col += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = col * halfW + offsetX;
            const cy = row * resolvedSize + resolvedSize / 2 + offsetY;
            const flip = (((col + colShift + row + rowShift) % 2) + 2) % 2 !== 0;
            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.current.get(cellKey);

            if (alpha) {
              ctx.globalAlpha = alpha;
              drawTriangle(cx, cy, resolvedSize, flip);
              ctx.fillStyle = resolvedHoverColor;
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            drawTriangle(cx, cy, resolvedSize, flip);
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else if (isCircle) {
        const offsetX = ((gridOffset.current.x % resolvedSize) + resolvedSize) % resolvedSize;
        const offsetY = ((gridOffset.current.y % resolvedSize) + resolvedSize) % resolvedSize;
        const cols = Math.ceil(canvas.width / resolvedSize) + 3;
        const rows = Math.ceil(canvas.height / resolvedSize) + 3;

        for (let col = -2; col < cols; col += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = col * resolvedSize + resolvedSize / 2 + offsetX;
            const cy = row * resolvedSize + resolvedSize / 2 + offsetY;
            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.current.get(cellKey);

            if (alpha) {
              ctx.globalAlpha = alpha;
              drawCircle(cx, cy, resolvedSize);
              ctx.fillStyle = resolvedHoverColor;
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            drawCircle(cx, cy, resolvedSize);
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else {
        const offsetX = ((gridOffset.current.x % resolvedSize) + resolvedSize) % resolvedSize;
        const offsetY = ((gridOffset.current.y % resolvedSize) + resolvedSize) % resolvedSize;
        const cols = Math.ceil(canvas.width / resolvedSize) + 3;
        const rows = Math.ceil(canvas.height / resolvedSize) + 3;

        for (let col = -2; col < cols; col += 1) {
          for (let row = -2; row < rows; row += 1) {
            const sx = col * resolvedSize + offsetX;
            const sy = row * resolvedSize + offsetY;
            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.current.get(cellKey);

            if (alpha) {
              ctx.globalAlpha = alpha;
              ctx.fillStyle = withAlpha(resolvedHoverColor, 0.95);
              ctx.fillRect(sx, sy, resolvedSize, resolvedSize);
              ctx.globalAlpha = 1;
            }

            ctx.strokeStyle = borderColor;
            ctx.strokeRect(sx, sy, resolvedSize, resolvedSize);
          }
        }
      }

      const vignette = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2,
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.18)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateCellOpacities = () => {
      const targets = new Map<string, number>();

      if (hoveredSquare.current) {
        targets.set(`${hoveredSquare.current.x},${hoveredSquare.current.y}`, 1);
      }

      if (hoverTrailAmount > 0) {
        for (let i = 0; i < trailCells.current.length; i += 1) {
          const cell = trailCells.current[i];
          const key = `${cell.x},${cell.y}`;
          if (!targets.has(key)) {
            targets.set(key, (trailCells.current.length - i) / (trailCells.current.length + 1));
          }
        }
      }

      for (const [key] of targets) {
        if (!cellOpacities.current.has(key)) {
          cellOpacities.current.set(key, 0);
        }
      }

      for (const [key, opacity] of cellOpacities.current) {
        const target = targets.get(key) ?? 0;
        const next = opacity + (target - opacity) * 0.15;

        if (next < 0.005) {
          cellOpacities.current.delete(key);
        } else {
          cellOpacities.current.set(key, next);
        }
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      const wrapX = isHex ? hexHoriz * 2 : resolvedSize;
      const wrapY = isHex ? hexVert : isTriangle ? resolvedSize * 2 : resolvedSize;

      switch (direction) {
        case "right":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          break;
        case "left":
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + wrapX) % wrapX;
          break;
        case "up":
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + wrapY) % wrapY;
          break;
        case "down":
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        case "diagonal":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
      }

      updateCellOpacities();
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (isHex) {
        const colShift = Math.floor(gridOffset.current.x / hexHoriz);
        const offsetX = ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;
        const col = Math.round(adjustedX / hexHoriz);
        const rowOffset = (col + colShift) % 2 !== 0 ? hexVert / 2 : 0;
        const row = Math.round((adjustedY - rowOffset) / hexVert);

        if (
          !hoveredSquare.current ||
          hoveredSquare.current.x !== col ||
          hoveredSquare.current.y !== row
        ) {
          if (hoveredSquare.current && hoverTrailAmount > 0) {
            trailCells.current.unshift({ ...hoveredSquare.current });
            if (trailCells.current.length > hoverTrailAmount) {
              trailCells.current.length = hoverTrailAmount;
            }
          }
          hoveredSquare.current = { x: col, y: row };
        }
      } else if (isTriangle) {
        const halfW = resolvedSize / 2;
        const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
        const offsetY = ((gridOffset.current.y % resolvedSize) + resolvedSize) % resolvedSize;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;
        const col = Math.round(adjustedX / halfW);
        const row = Math.floor(adjustedY / resolvedSize);

        if (
          !hoveredSquare.current ||
          hoveredSquare.current.x !== col ||
          hoveredSquare.current.y !== row
        ) {
          if (hoveredSquare.current && hoverTrailAmount > 0) {
            trailCells.current.unshift({ ...hoveredSquare.current });
            if (trailCells.current.length > hoverTrailAmount) {
              trailCells.current.length = hoverTrailAmount;
            }
          }
          hoveredSquare.current = { x: col, y: row };
        }
      } else if (isCircle) {
        const offsetX = ((gridOffset.current.x % resolvedSize) + resolvedSize) % resolvedSize;
        const offsetY = ((gridOffset.current.y % resolvedSize) + resolvedSize) % resolvedSize;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;
        const col = Math.round(adjustedX / resolvedSize);
        const row = Math.round(adjustedY / resolvedSize);

        if (
          !hoveredSquare.current ||
          hoveredSquare.current.x !== col ||
          hoveredSquare.current.y !== row
        ) {
          if (hoveredSquare.current && hoverTrailAmount > 0) {
            trailCells.current.unshift({ ...hoveredSquare.current });
            if (trailCells.current.length > hoverTrailAmount) {
              trailCells.current.length = hoverTrailAmount;
            }
          }
          hoveredSquare.current = { x: col, y: row };
        }
      } else {
        const offsetX = ((gridOffset.current.x % resolvedSize) + resolvedSize) % resolvedSize;
        const offsetY = ((gridOffset.current.y % resolvedSize) + resolvedSize) % resolvedSize;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;
        const col = Math.floor(adjustedX / resolvedSize);
        const row = Math.floor(adjustedY / resolvedSize);

        if (
          !hoveredSquare.current ||
          hoveredSquare.current.x !== col ||
          hoveredSquare.current.y !== row
        ) {
          if (hoveredSquare.current && hoverTrailAmount > 0) {
            trailCells.current.unshift({ ...hoveredSquare.current });
            if (trailCells.current.length > hoverTrailAmount) {
              trailCells.current.length = hoverTrailAmount;
            }
          }
          hoveredSquare.current = { x: col, y: row };
        }
      }
    };

    const handleMouseLeave = () => {
      if (hoveredSquare.current && hoverTrailAmount > 0) {
        trailCells.current.unshift({ ...hoveredSquare.current });
        if (trailCells.current.length > hoverTrailAmount) {
          trailCells.current.length = hoverTrailAmount;
        }
      }
      hoveredSquare.current = null;
    };

    window.addEventListener("resize", resizeCanvas);
    host.addEventListener("mousemove", handleMouseMove);
    host.addEventListener("mouseleave", handleMouseLeave);
    resizeCanvas();
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      host.removeEventListener("mousemove", handleMouseMove);
      host.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    borderColor,
    direction,
    hostRef,
    hoverColor,
    hoverFillColor,
    hoverTrailAmount,
    shape,
    size,
    speed,
    squareSize,
  ]);

  return (
    <canvas ref={canvasRef} className={["shapegrid-canvas", className].filter(Boolean).join(" ")} />
  );
}

function RevealShapeGrid({
  speed = 0.28,
  squareSize = 40,
  size,
  direction = "diagonal",
  borderColor = "#ffffff",
  hoverFillColor = "#222222",
  hoverColor,
  shape = "square",
  hoverTrailAmount = 7,
  hostRef,
  className = "",
  text = "",
  textColor,
  textOffsetColumns = 0,
  textOffsetRows = 0,
  textReveal = false,
  textRevealActive = true,
  textRevealStepMs = 28,
}: ShapeGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<GridMetrics>({ columns: 1, rows: 1 });
  const [trail, setTrail] = useState<number[]>([]);
  const [revealedTextCells, setRevealedTextCells] = useState<number[]>([]);
  const lastIndexRef = useRef<number | null>(null);
  const textCellsRef = useRef<number[]>([]);
  const revealFrameRef = useRef<number | null>(null);

  const cellSize = size ?? squareSize;
  const activeColor = hoverColor ?? hoverFillColor;
  const resolvedTextColor = textColor ?? activeColor;
  const transitionMs = `${Math.max(120, Math.round(520 - speed * 600))}ms`;

  useEffect(() => {
    const host = hostRef?.current ?? containerRef.current?.parentElement;
    if (!host) {
      return;
    }

    const updateMetrics = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      setMetrics({
        columns: Math.max(1, Math.ceil(width / cellSize)),
        rows: Math.max(1, Math.ceil(height / cellSize)),
      });
    };

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(host);
    updateMetrics();

    const handleMove = (event: MouseEvent) => {
      if (hoverTrailAmount <= 0) {
        return;
      }

      const bounds = host.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) {
        return;
      }

      const column = Math.floor(x / Math.max(1, bounds.width / metrics.columns));
      const row = Math.floor(y / Math.max(1, bounds.height / metrics.rows));
      const nextIndex = row * metrics.columns + column;

      if (lastIndexRef.current === nextIndex) {
        return;
      }

      lastIndexRef.current = nextIndex;
      setTrail((previous) =>
        [nextIndex, ...previous.filter((value) => value !== nextIndex)].slice(0, hoverTrailAmount),
      );
    };

    const handleLeave = () => {
      lastIndexRef.current = null;
      if (hoverTrailAmount > 0) {
        setTrail([]);
      }
    };

    host.addEventListener("mousemove", handleMove);
    host.addEventListener("mouseleave", handleLeave);

    return () => {
      resizeObserver.disconnect();
      host.removeEventListener("mousemove", handleMove);
      host.removeEventListener("mouseleave", handleLeave);
    };
  }, [cellSize, hoverTrailAmount, hostRef, metrics.columns, metrics.rows]);

  useEffect(() => {
    if (!text.trim() || metrics.columns <= 0 || metrics.rows <= 0) {
      textCellsRef.current = [];
      setRevealedTextCells([]);
      return;
    }

    const nextTextCells = buildCanvasTextCells(text, metrics, textOffsetColumns, textOffsetRows);

    textCellsRef.current = nextTextCells;
    setRevealedTextCells(
      textReveal && textRevealActive ? [] : textRevealActive ? nextTextCells : [],
    );
  }, [metrics, text, textOffsetColumns, textOffsetRows, textReveal, textRevealActive]);

  useEffect(() => {
    if (!textRevealActive) {
      if (revealFrameRef.current) {
        cancelAnimationFrame(revealFrameRef.current);
        revealFrameRef.current = null;
      }

      setRevealedTextCells([]);
      return;
    }

    if (!textReveal || textCellsRef.current.length === 0) {
      if (revealFrameRef.current) {
        cancelAnimationFrame(revealFrameRef.current);
        revealFrameRef.current = null;
      }

      if (textCellsRef.current.length > 0) {
        setRevealedTextCells(textCellsRef.current);
      }

      return;
    }

    let frameId = 0;
    let lastTimestamp = 0;
    let revealedCount = 0;
    const targetCells = textCellsRef.current;

    setRevealedTextCells([]);

    const reveal = (timestamp: number) => {
      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }

      if (timestamp - lastTimestamp >= textRevealStepMs) {
        lastTimestamp = timestamp;
        revealedCount = Math.min(targetCells.length, revealedCount + 1);
        setRevealedTextCells(targetCells.slice(0, revealedCount));
      }

      if (revealedCount < targetCells.length) {
        frameId = requestAnimationFrame(reveal);
        revealFrameRef.current = frameId;
      } else {
        revealFrameRef.current = null;
      }
    };

    frameId = requestAnimationFrame(reveal);
    revealFrameRef.current = frameId;

    return () => {
      cancelAnimationFrame(frameId);
      revealFrameRef.current = null;
    };
  }, [textReveal, textRevealActive, textRevealStepMs, metrics.columns, metrics.rows, text]);

  const total = metrics.columns * metrics.rows;
  const cells = useMemo(() => Array.from({ length: total }, (_, index) => index), [total]);
  const revealedSet = useMemo(() => new Set(revealedTextCells), [revealedTextCells]);

  return (
    <div ref={containerRef} className={["shape-grid", className].filter(Boolean).join(" ")}>
      <div
        className="shape-grid-canvas"
        style={
          {
            gridTemplateColumns: `repeat(${metrics.columns}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${metrics.rows}, ${cellSize}px)`,
          } as CSSProperties
        }
      >
        {cells.map((index) => {
          const trailIndex = trail.indexOf(index);
          const isActive = trailIndex >= 0;
          const isTextCell = revealedSet.has(index);
          const alpha = isActive ? Math.max(0.14, 0.85 - trailIndex * 0.12) : 0;

          return (
            <div
              key={index}
              className="shape-grid-cell"
              style={{ width: cellSize, height: cellSize }}
            >
              <div
                className={[
                  "shape-grid-shape",
                  `is-${shape}`,
                  `dir-${direction}`,
                  isActive || isTextCell ? "is-active" : "",
                  isTextCell ? "is-text-cell" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={
                  {
                    "--shape-border": isTextCell
                      ? resolvedTextColor
                      : isActive
                        ? activeColor
                        : borderColor,
                    "--shape-speed": transitionMs,
                    backgroundColor: isTextCell
                      ? withAlpha(resolvedTextColor, 0.62)
                      : isActive
                        ? withAlpha(activeColor, alpha)
                        : "transparent",
                    boxShadow: isTextCell
                      ? `0 0 16px ${withAlpha(resolvedTextColor, 0.14)}`
                      : "none",
                    opacity: isTextCell ? 0.98 : isActive ? 1 : 0.7,
                  } as CSSProperties
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ShapeGrid(props: ShapeGridProps) {
  if (props.mode === "reveal") {
    return <RevealShapeGrid {...props} />;
  }

  return <FlowShapeGrid {...props} />;
}
