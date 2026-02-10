import { describe, it, expect } from 'vitest';
import { evaluateGuess, isWin, isGameOver } from '../shared/gameLogic.js';

describe('evaluateGuess', () => {
  it('returns all correct for exact match', () => {
    expect(evaluateGuess('slate', 'slate')).toEqual([
      'correct', 'correct', 'correct', 'correct', 'correct',
    ]);
  });

  it('returns all absent for no matches', () => {
    expect(evaluateGuess('brick', 'model')).toEqual([
      'absent', 'absent', 'absent', 'absent', 'absent',
    ]);
  });

  it('marks present letters in wrong position', () => {
    // guess: HEART, answer: EARTH
    // H=present, E=present, A=present, R=present, T=present
    expect(evaluateGuess('heart', 'earth')).toEqual([
      'present', 'present', 'present', 'present', 'present',
    ]);
  });

  it('handles duplicate letters - one in answer, two in guess', () => {
    // guess: SPEED, answer: ABIDE
    // S=absent, P=absent, E=present (e exists in ABIDE at pos 4), E=absent (e already used), D=present
    expect(evaluateGuess('speed', 'abide')).toEqual([
      'absent', 'absent', 'present', 'absent', 'present',
    ]);
  });

  it('handles duplicate letters - limits present to count in answer', () => {
    // guess: GEESE, answer: EDGES
    // G=present(g in edges), E=present, E=present, S=present, E=absent (only 2 e's in EDGES, 1 used as present already)
    // EDGES has: E(0), D(1), G(2), E(3), S(4) → 2 e's, 1 g, 1 d, 1 s
    // G: g exists in edges → present, count[g] 1→0
    // E: first pass no correct. Second pass: e count=2, E(1)→present count=1, E(2)→present count=0, E(4)→absent
    expect(evaluateGuess('geese', 'edges')).toEqual([
      'present', 'present', 'present', 'present', 'absent',
    ]);
  });

  it('handles correct + present for same letter', () => {
    // guess: LATTE, answer: LIGHT
    // L=correct, A=absent, T=present, T=absent, E=absent
    expect(evaluateGuess('latte', 'light')).toEqual([
      'correct', 'absent', 'present', 'absent', 'absent',
    ]);
  });

  it('is case insensitive', () => {
    expect(evaluateGuess('SLATE', 'slate')).toEqual([
      'correct', 'correct', 'correct', 'correct', 'correct',
    ]);
  });
});

describe('isWin', () => {
  it('returns true when all correct', () => {
    expect(isWin(['correct', 'correct', 'correct', 'correct', 'correct'])).toBe(true);
  });

  it('returns false with any non-correct', () => {
    expect(isWin(['correct', 'present', 'correct', 'correct', 'correct'])).toBe(false);
  });
});

describe('isGameOver', () => {
  it('returns false for empty evaluations', () => {
    expect(isGameOver([])).toBe(false);
  });

  it('returns true when last guess is a win', () => {
    expect(
      isGameOver([['correct', 'correct', 'correct', 'correct', 'correct']]),
    ).toBe(true);
  });

  it('returns true when max guesses reached', () => {
    const lost = Array(6).fill(['absent', 'absent', 'absent', 'absent', 'absent']);
    expect(isGameOver(lost)).toBe(true);
  });

  it('returns false when guesses remain and no win', () => {
    const playing = [['absent', 'present', 'absent', 'absent', 'correct']];
    expect(isGameOver(playing)).toBe(false);
  });
});
