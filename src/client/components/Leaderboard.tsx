import { useState, useEffect } from 'react';
import type { LeaderboardResponse, LeaderboardEntry } from '../../shared/api.js';

interface LeaderboardProps {
  onClose: () => void;
}

export default function Leaderboard({ onClose }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((data: LeaderboardResponse) => {
        setEntries(data.entries);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#1a1a1b] rounded-lg p-6 max-w-[400px] w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-bold">Leaderboard</h2>
          <button onClick={onClose} className="text-[#818384] text-2xl hover:text-white">&times;</button>
        </div>

        {loading ? (
          <p className="text-[#818384] text-sm text-center py-4">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-[#818384] text-sm text-center py-4">No entries yet. Be the first to solve!</p>
        ) : (
          <div className="space-y-1">
            {entries.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center justify-between py-2 px-3 rounded bg-[#272729]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#818384] text-sm font-bold w-6">#{entry.rank}</span>
                  <span className="text-white text-sm">u/{entry.username}</span>
                </div>
                <span className="text-[#538d4e] text-sm font-bold">{entry.guesses}/6</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
