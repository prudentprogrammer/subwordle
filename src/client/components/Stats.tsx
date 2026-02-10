import { useState, useEffect } from 'react';
import type { StatsResponse, TileState } from '../../shared/api.js';
import { generateEmojiGrid, copyToClipboard } from '../utils/share.js';

interface StatsProps {
  evaluations: TileState[][];
  dayNumber: number;
  won: boolean;
  guessCount: number;
  answer: string;
  onClose: () => void;
  onShowLeaderboard: () => void;
}

export default function Stats({
  evaluations,
  dayNumber,
  won,
  guessCount,
  answer,
  onClose,
  onShowLeaderboard,
}: StatsProps) {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data: StatsResponse) => setStats(data))
      .catch(() => {});
  }, []);

  const handleShare = async () => {
    const text = generateEmojiGrid(evaluations, dayNumber, won);
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const maxDistribution = stats ? Math.max(...stats.distribution, 1) : 1;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#1a1a1b] rounded-lg p-6 max-w-[400px] w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-bold">
            {won ? 'You won!' : 'Better luck next time'}
          </h2>
          <button onClick={onClose} className="text-[#818384] text-2xl hover:text-white">&times;</button>
        </div>

        {!won && (
          <p className="text-[#d7dadc] text-sm mb-4">
            The word was <span className="font-bold uppercase text-white">{answer}</span>
          </p>
        )}

        {stats && (
          <>
            <div className="flex justify-around mb-6 text-center">
              <div>
                <div className="text-white text-2xl font-bold">{stats.totalPlayers}</div>
                <div className="text-[#818384] text-xs">Played</div>
              </div>
              <div>
                <div className="text-white text-2xl font-bold">{stats.winRate}%</div>
                <div className="text-[#818384] text-xs">Win Rate</div>
              </div>
            </div>

            <h3 className="text-white text-sm font-bold mb-2">Guess Distribution</h3>
            <div className="space-y-1 mb-6">
              {stats.distribution.map((count, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-white text-xs w-3">{i + 1}</span>
                  <div
                    className={`h-5 flex items-center justify-end px-2 text-xs text-white font-bold ${
                      won && guessCount === i + 1 ? 'bg-[#538d4e]' : 'bg-[#3a3a3c]'
                    }`}
                    style={{ width: `${Math.max((count / maxDistribution) * 100, 7)}%` }}
                  >
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 bg-[#538d4e] text-white font-bold py-3 rounded text-sm hover:bg-[#6aaf5f] touch-manipulation"
          >
            {copied ? 'Copied!' : 'Share'}
          </button>
          <button
            onClick={onShowLeaderboard}
            className="flex-1 bg-[#3a3a3c] text-white font-bold py-3 rounded text-sm hover:bg-[#4a4a4c] touch-manipulation"
          >
            Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
