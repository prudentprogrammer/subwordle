import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { requestExpandedMode } from '@devvit/web/client';
import './index.css';

function Splash() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-[#121213] cursor-pointer touch-manipulation"
      onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
    >
      <div className="flex gap-1 mb-4">
        {['S', 'U', 'B'].map((letter, i) => (
          <div
            key={i}
            className="w-12 h-12 bg-[#538d4e] text-white font-bold text-xl flex items-center justify-center rounded"
          >
            {letter}
          </div>
        ))}
        {['W', 'O'].map((letter, i) => (
          <div
            key={i + 3}
            className="w-12 h-12 bg-[#b59f3b] text-white font-bold text-xl flex items-center justify-center rounded"
          >
            {letter}
          </div>
        ))}
      </div>
      <h1 className="text-white text-2xl font-bold mb-2">SubWordle</h1>
      <p className="text-[#818384] text-sm">Tap to play today's word</p>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>,
);
