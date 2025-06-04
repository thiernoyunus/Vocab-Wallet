export interface StatsState {
  totalCardsReviewed: number;
  totalSessions: number;
  totalDuration: number;
  cardsReviewedToday: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string;
}

export const defaultStats: StatsState = {
  totalCardsReviewed: 0,
  totalSessions: 0,
  totalDuration: 0,
  cardsReviewedToday: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastSessionDate: ""
};
