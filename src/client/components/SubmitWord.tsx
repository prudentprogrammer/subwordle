import { useState } from 'react';
import { CATEGORIES, type SubmitWordResponse } from '../../shared/api.js';

interface SubmitWordProps {
  onClose: () => void;
}

export default function SubmitWord({ onClose }: SubmitWordProps) {
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('general');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (word.length !== 5) {
      setMessage('Word must be exactly 5 letters');
      return;
    }
    if (!/^[a-zA-Z]+$/.test(word)) {
      setMessage('Word must contain only letters');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/submit-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, category }),
      });
      const data = (await res.json()) as SubmitWordResponse;
      if (data.success) {
        setMessage('Word submitted! Thanks for contributing.');
        setWord('');
        setTimeout(onClose, 1500);
      } else {
        setMessage(data.error ?? 'Failed to submit word');
      }
    } catch {
      setMessage('Failed to submit word');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#1a1a1b] rounded-lg p-6 max-w-[400px] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-bold">Submit a Word</h2>
          <button onClick={onClose} className="text-[#818384] text-2xl hover:text-white">&times;</button>
        </div>

        <p className="text-[#818384] text-xs mb-4">
          Suggest a 5-letter word for future puzzles. Community-submitted words make the game better!
        </p>

        <div className="space-y-3">
          <input
            type="text"
            maxLength={5}
            value={word}
            onChange={(e) => setWord(e.target.value.replace(/[^a-zA-Z]/g, ''))}
            placeholder="Enter a 5-letter word"
            className="w-full bg-[#272729] text-white border border-[#3a3a3c] rounded px-3 py-2 text-sm uppercase tracking-wider focus:outline-none focus:border-[#538d4e]"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#272729] text-white border border-[#3a3a3c] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#538d4e]"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleSubmit}
            disabled={submitting || word.length !== 5}
            className="w-full bg-[#538d4e] text-white font-bold py-2 rounded text-sm hover:bg-[#6aaf5f] disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            {submitting ? 'Submitting...' : 'Submit Word'}
          </button>

          {message && (
            <p className={`text-sm text-center ${message.includes('Thanks') ? 'text-[#538d4e]' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
