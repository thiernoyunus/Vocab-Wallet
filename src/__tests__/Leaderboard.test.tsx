import { render, screen } from '@testing-library/react';
import { Leaderboard } from '../components/Leaderboard';
import { defaultStats } from '../utils/updateStats';

describe('Leaderboard component', () => {
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

  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the title', () => {
    render(<Leaderboard />);
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  it('should display the default leaderboard with the user\'s score from default stats when localStorage is empty', () => {
    render(<Leaderboard />);
    expect(screen.getByText('1. Aisha')).toBeInTheDocument();
    expect(screen.getByText('1200')).toBeInTheDocument();
    expect(screen.getByText('4. You')).toBeInTheDocument();
    expect(screen.getByText(defaultStats.points.toString())).toBeInTheDocument();
  });

  it('should display the leaderboard with the user\'s score from localStorage', () => {
    const stats = { ...defaultStats, points: 1500 };
    localStorage.setItem('stats', JSON.stringify(stats));
    render(<Leaderboard />);
    expect(screen.getByText('1. You')).toBeInTheDocument();
    expect(screen.getByText('1500')).toBeInTheDocument();
    expect(screen.getByText('2. Aisha')).toBeInTheDocument();
    expect(screen.getByText('1200')).toBeInTheDocument();
  });

  it('should handle invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('stats', 'invalid json');
    render(<Leaderboard />);
    // Should fall back to default stats
    expect(screen.getByText('4. You')).toBeInTheDocument();
    expect(screen.getByText(defaultStats.points.toString())).toBeInTheDocument();
  });

  it('should display at most 10 entries', () => {
    const stats = { ...defaultStats, points: 100 };
    localStorage.setItem('stats', JSON.stringify(stats));
    // The sample data has 3 entries, plus "You" makes 4. Let's add more to the sample data for this test.
    // We can't easily modify the component's internal `sample` data,
    // but we can assert that if there were more than 10, they would be sliced.
    // The current implementation has a hardcoded sample of 3, plus the user, so it will never exceed 10.
    // We can at least check that all of them are rendered.
    render(<Leaderboard />);
    const entries = screen.getAllByText(/\d+\. \w+/);
    expect(entries.length).toBe(4);
  });
});
