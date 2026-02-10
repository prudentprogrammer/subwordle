import { useState, useCallback, useRef } from 'react';

export function useAnimations() {
  const [shakeRow, setShakeRow] = useState(-1);
  const [revealingRow, setRevealingRow] = useState(-1);
  const [popTile, setPopTile] = useState<{ row: number; col: number } | null>(null);
  const shakeTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const popTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const triggerShake = useCallback((row: number) => {
    if (shakeTimeout.current) clearTimeout(shakeTimeout.current);
    setShakeRow(row);
    shakeTimeout.current = setTimeout(() => setShakeRow(-1), 600);
  }, []);

  const triggerReveal = useCallback((row: number) => {
    setRevealingRow(row);
    setTimeout(() => setRevealingRow(-1), 1500);
  }, []);

  const triggerPop = useCallback((row: number, col: number) => {
    if (popTimeout.current) clearTimeout(popTimeout.current);
    setPopTile({ row, col });
    popTimeout.current = setTimeout(() => setPopTile(null), 100);
  }, []);

  return { shakeRow, revealingRow, popTile, triggerShake, triggerReveal, triggerPop };
}
