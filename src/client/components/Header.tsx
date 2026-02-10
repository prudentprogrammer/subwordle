import { CATEGORIES } from '../../shared/api.js';

interface HeaderProps {
  category: string;
  onHelpClick: () => void;
  onSubmitWordClick: () => void;
}

export default function Header({ category, onHelpClick, onSubmitWordClick }: HeaderProps) {
  const cat = CATEGORIES.find((c) => c.id === category);

  return (
    <header className="flex items-center justify-between w-full max-w-[500px] px-4 py-2 border-b border-[#3a3a3c]">
      <button
        onClick={onHelpClick}
        className="text-white text-xl w-10 h-10 flex items-center justify-center rounded hover:bg-[#3a3a3c] touch-manipulation"
        aria-label="How to play"
      >
        ?
      </button>

      <div className="flex flex-col items-center">
        <h1 className="text-white text-lg sm:text-xl font-bold tracking-wider">SubWordle</h1>
        {cat && (
          <span className="text-xs text-[#818384]">
            {cat.emoji} {cat.label}
          </span>
        )}
      </div>

      <button
        onClick={onSubmitWordClick}
        className="text-white text-xl w-10 h-10 flex items-center justify-center rounded hover:bg-[#3a3a3c] touch-manipulation"
        aria-label="Submit a word"
      >
        +
      </button>
    </header>
  );
}
