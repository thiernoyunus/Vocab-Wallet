import { describe, it, expect } from 'vitest';
import { updateStats, defaultStats } from '../updateStats';

describe('updateStats', () => {
  it('updates stats for a new session', () => {
    const now = new Date('2024-01-01T12:00:00Z').getTime();
    const start = now - 60000; // 1 minute session
    const result = updateStats({ ...defaultStats }, 10, start, now);
    expect(result.totalCardsReviewed).toBe(10);
    expect(result.totalSessions).toBe(1);
    expect(result.cardsReviewedToday).toBe(10);
    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(1);
    expect(result.lastSessionDate).toBe('2024-01-01');
    expect(result.totalDuration).toBeCloseTo(1);
    expect(result.points).toBe(100);
  });
});
