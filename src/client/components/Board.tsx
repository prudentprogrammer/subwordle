import type { TileState } from '../../shared/api.js';
import { MAX_GUESSES } from '../../shared/api.js';
import Row from './Row.js';

interface BoardProps {
  guesses: string[];
  evaluations: TileState[][];
  currentGuess: string;
  revealingRow: number;
  shakeRow: number;
  popTile: { row: number; col: number } | null;
}

export default function Board({
  guesses,
  evaluations,
  currentGuess,
  revealingRow,
  shakeRow,
  popTile,
}: BoardProps) {
  const rows = [];

  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) {
      // Submitted guess
      const guess = guesses[i];
      const evaluation = evaluations[i];
      if (guess !== undefined && evaluation !== undefined) {
        rows.push(
          <Row
            key={i}
            guess={guess}
            evaluation={evaluation}
            isRevealing={revealingRow === i}
          />,
        );
      }
    } else if (i === guesses.length) {
      // Current input row
      const popColProps = popTile !== null && popTile.row === i ? { popCol: popTile.col } : {};
      rows.push(
        <Row
          key={i}
          guess={currentGuess}
          isShaking={shakeRow === i}
          {...popColProps}
        />,
      );
    } else {
      // Empty row
      rows.push(<Row key={i} guess="" />);
    }
  }

  return <div className="flex flex-col items-center gap-[5px]">{rows}</div>;
}
