import Key from './Key.js';

type KeyColor = 'correct' | 'present' | 'absent' | undefined;

interface KeyboardProps {
  colors: Record<string, KeyColor>;
  onKey: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

const ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

export default function Keyboard({ colors, onKey, onEnter, onBackspace }: KeyboardProps) {
  const handleClick = (key: string) => {
    if (key === 'Enter') onEnter();
    else if (key === 'Backspace') onBackspace();
    else onKey(key);
  };

  return (
    <div className="flex flex-col items-center gap-[6px] w-full max-w-[500px] px-2">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-[4px] sm:gap-[6px] justify-center">
          {row.map((key) => (
            <Key
              key={key}
              value={key}
              color={colors[key]}
              isWide={key === 'Enter' || key === 'Backspace'}
              onClick={handleClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
