// src/components/ExplodingGrid.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
gsap.registerPlugin(Physics2DPlugin);

const ROWS = 6;
const COLS = 10;
const PULL_DISTANCE = 50;
const WORD = "SWAGIFYY";

export default function ExplodingGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [revealCount, setRevealCount] = useState(0);

  // Typewriter reveal
  useEffect(() => {
    if (revealCount < WORD.length) {
      const t = setTimeout(() => setRevealCount(revealCount + 1), 150);
      return () => clearTimeout(t);
    }
  }, [revealCount]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cells = Array.from(grid.querySelectorAll<HTMLElement>(".cell"));
    let clicked = false;
    let resetAll = false;

    // compute each cell center
    const updateCellPositions = () => {
      cells.forEach((cell) => {
        const r = cell.getBoundingClientRect();
        (cell as any).center_position = {
          x: (r.left + r.right) / 2,
          y: (r.top + r.bottom) / 2,
        };
      });
    };
    updateCellPositions();
    window.addEventListener("resize", updateCellPositions);

    // hover‑pull logic
    const handlePointerMove = (e: PointerEvent) => {
      if (clicked) return;
      const { pageX, pageY } = e;
      cells.forEach((cell) => {
        const { x, y } = (cell as any).center_position;
        const dx = pageX - x,
          dy = pageY - y,
          dist = Math.hypot(dx, dy);
        if (dist < PULL_DISTANCE) {
          const pct = dist / PULL_DISTANCE;
          gsap.to(cell, { x: dx * pct, y: dy * pct, duration: 0.2 });
          (cell as any).pulled = true;
        } else if ((cell as any).pulled) {
          (cell as any).pulled = false;
          gsap.to(cell, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1,0.3)",
          });
        }
      });
      if (resetAll) {
        resetAll = false;
        gsap.to(cells, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1,0.3)",
        });
      }
    };

    const handleCellClick = (_: PointerEvent, idx: number) => {
      if (clicked) return;
      clicked = true;
      gsap.to(cells, {
        duration: 1.6,
        physics2D: {
          velocity: "random(400,1000)",
          angle: "random(250,290)",
          gravity: 2000,
        },
        stagger: {
          grid: [ROWS, COLS],
          from: idx,
          amount: 0.3,
        },
        onComplete() {
          (this as any).timeScale(-1.3);
        },
        onReverseComplete() {
          clicked = false;
          resetAll = true;
        },
      });
    };

    // bind events
    grid.addEventListener("pointermove", handlePointerMove);
    grid.addEventListener("pointerleave", () =>
      handlePointerMove({ pageX: -9999, pageY: -9999 } as any)
    );
    cells.forEach((cell, i) =>
      cell.addEventListener("pointerup", (e) =>
        handleCellClick(e as any as PointerEvent, i)
      )
    );

    return () => {
      window.removeEventListener("resize", updateCellPositions);
      grid.removeEventListener("pointermove", handlePointerMove);
      grid.removeEventListener("pointerleave", () => {});
      cells.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
    };
  }, []);

  // center the letters
  const letterRow = Math.floor(ROWS / 2);
  const startCol = Math.floor((COLS - WORD.length) / 2);

  return (
    <section className="py-20 relative z-10">
      <div
        ref={gridRef}
        className="w-full"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: "8px",
          touchAction: "none",
        }}
      >
        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => {
            const isLetter =
              r === letterRow &&
              c >= startCol &&
              c < startCol + WORD.length &&
              c - startCol < revealCount;
            return (
              <div
                key={`${r}-${c}`}
                className="
                  cell 
                  w-full aspect-square 
                  bg-gray-700/60 border border-gray-600 
                  flex items-center justify-center 
                  select-none cursor-pointer 
                  text-white text-2xl font-bold
                "
              >
                {isLetter ? WORD[c - startCol] : ""}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
