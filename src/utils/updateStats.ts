export interface StatsState {
  totalCardsReviewed: number;
  totalSessions: number;
  totalDuration: number;
  cardsReviewedToday: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string;
  points: number;
}

export const defaultStats: StatsState = {
  totalCardsReviewed: 0,
  totalSessions: 0,
  totalDuration: 0,
  cardsReviewedToday: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastSessionDate: "",
  points: 0,
};

export function updateStats(
  current: StatsState,
  cardsReviewed: number,
  sessionStart: number,
  now: number = Date.now(),
): StatsState {
  const duration = (now - sessionStart) / 60000;
  const today = new Date(now).toISOString().slice(0, 10);

  const stats: StatsState = { ...current };
  stats.totalCardsReviewed += cardsReviewed;
  stats.totalSessions += 1;
  stats.totalDuration += duration;

  if (stats.lastSessionDate === today) {
    stats.cardsReviewedToday += cardsReviewed;
  } else {
    if (stats.lastSessionDate) {
      const diff =
        (new Date(today).getTime() -
          new Date(stats.lastSessionDate).getTime()) /
        (24 * 60 * 60 * 1000);
      stats.currentStreak = diff === 1 ? stats.currentStreak + 1 : 1;
    } else {
      stats.currentStreak = 1;
    }
    stats.cardsReviewedToday = cardsReviewed;
    stats.lastSessionDate = today;
  }

  if (stats.currentStreak > stats.longestStreak) {
    stats.longestStreak = stats.currentStreak;
  }

  // award 10 points for each reviewed card
  stats.points += cardsReviewed * 10;

  return stats;
}
