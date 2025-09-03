import { render, screen, within } from '@testing-library/react';
import { Stats } from '../components/Stats';
import { defaultStats } from '../utils/updateStats';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Stats component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the title', () => {
    render(<Stats />);
    expect(screen.getByText('Your Progress')).toBeInTheDocument();
  });

  it('should display default stats when localStorage is empty', () => {
    render(<Stats />);
    const todaySection = screen.getByText('Today').parentElement;
    const streakSection = screen.getByText('Streak').parentElement;
    const totalReviewedSection = screen.getByText('Total Reviewed').parentElement;
    const pointsSection = screen.getByText('Points').parentElement;

    expect(within(todaySection).getByText(defaultStats.cardsReviewedToday.toString())).toBeInTheDocument();
    expect(within(streakSection).getByText(`${defaultStats.currentStreak} days`)).toBeInTheDocument();
    expect(within(totalReviewedSection).getByText(defaultStats.totalCardsReviewed.toString())).toBeInTheDocument();
    expect(within(pointsSection).getByText(defaultStats.points.toString())).toBeInTheDocument();
  });

  it('should display stats from localStorage when available', () => {
    const customStats = {
      ...defaultStats,
      cardsReviewedToday: 10,
      currentStreak: 5,
      totalCardsReviewed: 100,
      points: 500,
    };
    localStorage.setItem('stats', JSON.stringify(customStats));
    render(<Stats />);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5 days')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('should handle invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('stats', 'invalid json');
    render(<Stats />);
    // Should fall back to default stats
    const todaySection = screen.getByText('Today').parentElement;
    expect(within(todaySection).getByText(defaultStats.cardsReviewedToday.toString())).toBeInTheDocument();
  });

  it('should calculate and display the daily progress bar correctly', () => {
    const customStats = { ...defaultStats, cardsReviewedToday: 5 }; // 5 out of 20 daily goal is 25%
    localStorage.setItem('stats', JSON.stringify(customStats));
    render(<Stats />);
    const progressBar = screen.getByText('cards reviewed').nextElementSibling;
    const innerBar = progressBar.firstChild as HTMLElement;
    expect(innerBar.style.width).toBe('25%');
  });

  it('should cap the daily progress bar at 100%', () => {
    const customStats = { ...defaultStats, cardsReviewedToday: 30 }; // more than 20 daily goal
    localStorage.setItem('stats', JSON.stringify(customStats));
    render(<Stats />);
    const progressBar = screen.getByText('cards reviewed').nextElementSibling;
    const innerBar = progressBar.firstChild as HTMLElement;
    expect(innerBar.style.width).toBe('100%');
  });
});
