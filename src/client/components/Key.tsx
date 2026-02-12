import { memo } from 'react';

type KeyColor = 'correct' | 'present' | 'absent' | undefined;

interface KeyProps {
  value: string;
  color?: KeyColor;
  isWide?: boolean;
  onClick: (value: string) => void;
}

const COLOR_CLASSES: Record<string, string> = {
  correct: 'bg-[#538d4e]',
  present: 'bg-[#b59f3b]',
  absent: 'bg-[#3a3a3c]',
};

export default memo(function Key({ value, color, isWide, onClick }: KeyProps) {
  const bg = color ? COLOR_CLASSES[color] : 'bg-[#818384]';
  const width = isWide ? 'min-w-[58px] sm:min-w-[65px]' : 'min-w-[30px] sm:min-w-[43px]';

  return (
    <button
      className={`${bg} ${width} h-[48px] sm:h-[58px] rounded-[4px] text-white text-xs sm:text-sm font-bold uppercase flex items-center justify-center cursor-pointer select-none active:opacity-80 touch-manipulation`}
      onClick={() => onClick(value)}
      aria-label={value}
    >
      {value === 'Backspace' ? '⌫' : value}
    </button>
  );
});
