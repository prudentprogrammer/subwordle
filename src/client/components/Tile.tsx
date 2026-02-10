import type { CSSProperties } from 'react';
import type { TileState } from '../../shared/api.js';

interface TileProps {
  letter: string;
  state?: TileState;
  isRevealing?: boolean;
  revealDelay?: number;
  isPop?: boolean;
}

const STATE_COLORS: Record<TileState, string> = {
  correct: 'bg-[#538d4e] border-[#538d4e]',
  present: 'bg-[#b59f3b] border-[#b59f3b]',
  absent: 'bg-[#3a3a3c] border-[#3a3a3c]',
};

export default function Tile({ letter, state, isRevealing, revealDelay = 0, isPop }: TileProps) {
  const hasLetter = letter !== '';
  const evaluated = state !== undefined;

  let classes = 'w-[52px] h-[52px] sm:w-[62px] sm:h-[62px] inline-flex items-center justify-center text-2xl sm:text-[2rem] font-bold uppercase select-none';

  if (evaluated) {
    classes += ` ${STATE_COLORS[state]} text-white border-2`;
    if (isRevealing) {
      classes += ' animate-flip';
    }
  } else if (hasLetter) {
    classes += ' border-2 border-[#565758] text-white';
  } else {
    classes += ' border-2 border-[#3a3a3c] text-white';
  }

  if (isPop && !evaluated) {
    classes += ' animate-pop';
  }

  const style: CSSProperties = {};
  if (isRevealing) {
    style.animationDelay = `${revealDelay}ms`;
  }

  return (
    <div className={classes} style={style}>
      {letter}
    </div>
  );
}
