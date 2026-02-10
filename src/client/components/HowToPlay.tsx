interface HowToPlayProps {
  onClose: () => void;
}

export default function HowToPlay({ onClose }: HowToPlayProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#1a1a1b] rounded-lg p-6 max-w-[400px] w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-bold">How To Play</h2>
          <button onClick={onClose} className="text-[#818384] text-2xl hover:text-white">&times;</button>
        </div>

        <div className="text-[#d7dadc] text-sm space-y-3">
          <p>Guess the word in 6 tries.</p>
          <p>Each guess must be a valid 5-letter word. Press Enter to submit.</p>
          <p>After each guess, the color of the tiles will change to show how close your guess was.</p>

          <div className="space-y-2 pt-2">
            <div className="flex gap-1 items-center">
              <span className="w-8 h-8 bg-[#538d4e] text-white font-bold flex items-center justify-center text-sm">W</span>
              <span className="text-xs ml-2">is in the word and in the correct spot.</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="w-8 h-8 bg-[#b59f3b] text-white font-bold flex items-center justify-center text-sm">I</span>
              <span className="text-xs ml-2">is in the word but in the wrong spot.</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="w-8 h-8 bg-[#3a3a3c] text-white font-bold flex items-center justify-center text-sm">U</span>
              <span className="text-xs ml-2">is not in the word in any spot.</span>
            </div>
          </div>

          <p className="pt-2 text-xs text-[#818384]">
            Words are themed to this subreddit's category. You can also submit your own words for future puzzles!
          </p>
        </div>
      </div>
    </div>
  );
}
