import { StatsState } from "./updateStats";

export interface Milestone {
  threshold: number;
  title: string;
  description: string;
}

export const MILESTONES: Milestone[] = [
  {
    threshold: 25,
    title: "Rookie Reviewer",
    description: "Get comfortable by reviewing 25 cards."
  },
  {
    threshold: 75,
    title: "Confident Communicator",
    description: "Stay consistent through 75 total reviews."
  },
  {
    threshold: 150,
    title: "Language Pathfinder",
    description: "Build fluency by reviewing 150 cards."
  },
  {
    threshold: 300,
    title: "Vocabulary Virtuoso",
    description: "Master 300 cards to complete the journey."
  }
];

const ORDERED_MILESTONES = [...MILESTONES].sort((a, b) => a.threshold - b.threshold);

export interface MilestoneProgress {
  current: Milestone | null;
  next: Milestone | null;
  progress: number;
  cardsToGo: number;
}

export function calculateMilestoneProgress(stats: StatsState): MilestoneProgress {
  const totalReviewed = stats.totalCardsReviewed;

  let current: Milestone | null = null;
  let next: Milestone | null = null;

  for (const milestone of ORDERED_MILESTONES) {
    if (totalReviewed >= milestone.threshold) {
      current = milestone;
      continue;
    }

    next = milestone;
    break;
  }

  const base = current?.threshold ?? 0;
  const target = next?.threshold ?? current?.threshold ?? 0;
  const progress = next
    ? clamp(((totalReviewed - base) / (target - base)) * 100)
    : 100;
  const cardsToGo = next ? Math.max(next.threshold - totalReviewed, 0) : 0;

  return {
    current,
    next,
    progress,
    cardsToGo
  };
}

export interface StreakLevel {
  days: number;
  title: string;
  description: string;
}

export const STREAK_LEVELS: StreakLevel[] = [
  {
    days: 3,
    title: "Spark",
    description: "Return for three days in a row."
  },
  {
    days: 7,
    title: "Flare",
    description: "Keep learning for a full week."
  },
  {
    days: 14,
    title: "Blaze",
    description: "Show your dedication for two weeks straight."
  },
  {
    days: 30,
    title: "Inferno",
    description: "Maintain momentum for an entire month."
  }
];

const ORDERED_STREAK_LEVELS = [...STREAK_LEVELS].sort((a, b) => a.days - b.days);

export interface StreakStatus {
  currentLevel: StreakLevel | null;
  nextLevel: StreakLevel | null;
  progress: number;
  unlockedLevels: StreakLevel[];
  daysToNext: number;
}

export function getStreakStatus(stats: StatsState): StreakStatus {
  const unlockedLevels = ORDERED_STREAK_LEVELS.filter(
    level => stats.longestStreak >= level.days
  );
  const currentLevel = unlockedLevels.length
    ? unlockedLevels[unlockedLevels.length - 1]
    : null;

  const nextLevel = ORDERED_STREAK_LEVELS.find(level => stats.currentStreak < level.days) ?? null;
  const progress = nextLevel
    ? clamp((stats.currentStreak / nextLevel.days) * 100)
    : 100;
  const daysToNext = nextLevel ? Math.max(nextLevel.days - stats.currentStreak, 0) : 0;

  return {
    currentLevel,
    nextLevel,
    progress,
    unlockedLevels,
    daysToNext
  };
}

function clamp(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}
