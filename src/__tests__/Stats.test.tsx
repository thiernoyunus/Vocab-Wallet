import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
    render(
      <BrowserRouter>
        <Stats />
      </BrowserRouter>
    );
    expect(screen.getByText('Your journey')).toBeInTheDocument();
  });

  it('should display default stats when localStorage is empty', () => {
    render(
      <BrowserRouter>
        <Stats />
      </BrowserRouter>
    );
    const streakCard = screen.getByText('Current streak').parentElement;
    const xpCard = screen.getByText('Lifetime XP').parentElement;
    const todayCard = screen.getByText('Cards reviewed').parentElement;
    const totalCard = screen.getByText('Cards total').parentElement;

    expect(within(streakCard!).getByText(`${defaultStats.currentStreak}d`)).toBeInTheDocument();
    expect(within(xpCard!).getByText(defaultStats.points.toString())).toBeInTheDocument();
    expect(within(todayCard!).getByText(defaultStats.cardsReviewedToday.toString())).toBeInTheDocument();
    expect(within(totalCard!).getByText(defaultStats.totalCardsReviewed.toString())).toBeInTheDocument();
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
    render(
      <BrowserRouter>
        <Stats />
      </BrowserRouter>
    );
    expect(screen.getByText('5d')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getAllByText('10').length).toBeGreaterThan(0);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should handle invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('stats', 'invalid json');
    render(
      <BrowserRouter>
        <Stats />
      </BrowserRouter>
    );
    // Should fall back to default stats
    const todayCard = screen.getByText('Cards reviewed').parentElement;
    expect(within(todayCard!).getByText(defaultStats.cardsReviewedToday.toString())).toBeInTheDocument();
  });

  it('should calculate and display the daily progress bar correctly', () => {
    const customStats = { ...defaultStats, cardsReviewedToday: 5 }; // 5 out of 20 daily goal is 25%
    localStorage.setItem('stats', JSON.stringify(customStats));
    render(
      <BrowserRouter>
        <Stats />
      </BrowserRouter>
    );
    const todayCard = screen.getByText('Cards reviewed').parentElement!;
    const innerBar = todayCard.querySelector('div[style]') as HTMLElement;
    expect(innerBar.style.width).toBe('25%');
  });

  it('should cap the daily progress bar at 100%', () => {
    const customStats = { ...defaultStats, cardsReviewedToday: 30 }; // more than 20 daily goal
    localStorage.setItem('stats', JSON.stringify(customStats));
    render(
      <BrowserRouter>
        <Stats />
      </BrowserRouter>
    );
    const todayCard = screen.getByText('Cards reviewed').parentElement!;
    const innerBar = todayCard.querySelector('div[style]') as HTMLElement;
    expect(innerBar.style.width).toBe('100%');
  });
});
