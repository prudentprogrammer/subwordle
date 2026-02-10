import type { TileState } from '../../shared/api.js';
import { WORD_LENGTH } from '../../shared/api.js';
import Tile from './Tile.js';

interface RowProps {
  guess: string;
  evaluation?: TileState[];
  isRevealing?: boolean;
  isShaking?: boolean;
  popCol?: number;
}

export default function Row({ guess, evaluation, isRevealing, isShaking, popCol }: RowProps) {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const tileState = evaluation !== undefined ? evaluation[i] : undefined;
    const stateProps = tileState !== undefined ? { state: tileState } : {};
    const revealProps = isRevealing !== undefined ? { isRevealing } : {};
    tiles.push(
      <Tile
        key={i}
        letter={guess[i] ?? ''}
        {...stateProps}
        {...revealProps}
        revealDelay={i * 300}
        isPop={popCol === i}
      />,
    );
  }

  return (
    <div className={`flex gap-[5px] ${isShaking ? 'animate-shake' : ''}`}>
      {tiles}
    </div>
  );
}
