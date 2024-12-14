'use client'
import Image from "next/image";
import { useRef, useState } from "react";

type MouseEffects = {
  xPercentage: number;
  yPercentage: number;
  xRotation: number;
  yRotation: number;
};

const hoverMouseEffects = (
  ev: React.MouseEvent<HTMLDivElement>,
  boundingRect: DOMRect
): MouseEffects => {
  const x = ev.clientX - boundingRect.left;
  const y = ev.clientY - boundingRect.top;

  const xPercentage = x / boundingRect.width;
  const yPercentage = y / boundingRect.height;

  const xRotation = (xPercentage - 0.5) * 60;
  const yRotation = (0.5 - yPercentage) * 30;

  return { xPercentage, yPercentage, xRotation, yRotation };
};

const applyMouseEffects = (
  target: HTMLElement,
  effects: MouseEffects,
  isFlipped: boolean
) => {
  const { xPercentage, yPercentage, xRotation, yRotation } = effects;

  target.style.setProperty("--x-rotation", `${yRotation}deg`);
  target.style.setProperty("--y-rotation", `${xRotation}deg`);
  target.style.setProperty("--x", `${isFlipped ? 100 - xPercentage * 100 : xPercentage * 100}%`);
  target.style.setProperty("--y", `${yPercentage * 100}%`);
  // target.style.setProperty("--scale", "1.3");
};

// Large - aspect-[7/12]
// Medium - aspect-[64/88]
// Small - aspect-[41/63]


const Card = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current || !cardRef.current) return;

    const effects = hoverMouseEffects(ev, wrapperRef.current.getBoundingClientRect()); // Detect mouse effects in wrapper
    applyMouseEffects(cardRef.current, effects, isFlipped);
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.removeProperty("--x-rotation");
      cardRef.current.style.removeProperty("--y-rotation");
      cardRef.current.style.removeProperty("--x");
      cardRef.current.style.removeProperty("--y");
      cardRef.current.style.removeProperty("--scale");
    }
  };



  return (
    <div
      // Wrapper
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
      className="[perspective:800px] bg-blue-400 p-8 group"
    >
      {/* Card */}

      <div
        ref={cardRef}
        className={`card  relative w-[270px] aspect-[7/12] bg-white rounded-md transition-transform duration-500 ease-out `}
        style={{
          transform: `
            rotateX(var(--x-rotation, 0deg))
            rotateY(calc(var(--y-rotation, 0deg) + ${isFlipped ? 180 : 0}deg))
            scale(var(--scale, 1))
          `,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Font */}
        {!isFlipped && (
          <div className="flex flex-col h-full">
            <div className="h-[3%] border-b border-slate-400 border-dashed"></div>
            <div className="h-[11%] border-b border-slate-400 border-dashed"></div>
            <div className="h-[28%] border-b border-slate-400 border-dashed"></div>
            <div className="h-[20%] border-b border-slate-400 border-dashed"></div>
            <div className="h-[20%] border-b border-slate-400 border-dashed"></div>
            <div className="h-[20%] border-b border-slate-400 border-dashed"></div>
            <div className="h-[3%]"></div>
          </div>
        )}



        {/* Back */}
        {isFlipped && (
          <div className="h-full overflow-hidden rounded-md transition-transform [transform:rotateY(180deg)]">
            <Image alt="Card Back" src="/placeholder-back.jpg" fill></Image>
          </div>
        )}

        {/* Shiny effect */}
        <div className={`pointer-events-none absolute inset-0 group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.1)_20%,transparent_80%)] rounded-md`} />
      </div>
    </div>
  );
};

export default Card;
