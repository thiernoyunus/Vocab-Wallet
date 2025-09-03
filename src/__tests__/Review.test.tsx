import { render, screen, fireEvent, act } from '@testing-library/react';
import { Review } from '../components/Review';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { vi } from 'vitest';
import { defaultStats } from '../utils/updateStats';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

const mockedNavigateHook = useNavigate as vi.Mock;
const mockedUseLocation = useLocation as vi.Mock;
const navigateFn = vi.fn();

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

describe('Review component', () => {
  beforeEach(() => {
    mockedNavigateHook.mockReturnValue(navigateFn);
    mockedUseLocation.mockClear();
    navigateFn.mockClear();
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should show loading message when no lesson is specified', () => {
    mockedUseLocation.mockReturnValue({ search: '' });
    render(<BrowserRouter><Review /></BrowserRouter>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should load cards for the specified lesson', () => {
    mockedUseLocation.mockReturnValue({ search: '?lesson=1' });
    render(<BrowserRouter><Review /></BrowserRouter>);
    expect(screen.getByText('Review Session')).toBeInTheDocument();
    expect(screen.getByText('Salutation')).toBeInTheDocument();
  });

  it('should flip the card on click', () => {
    mockedUseLocation.mockReturnValue({ search: '?lesson=1' });
    render(<BrowserRouter><Review /></BrowserRouter>);

    expect(screen.getByText('Salutation')).toBeInTheDocument();
    const card = screen.getByText('Salutation').closest('.cursor-pointer');
    fireEvent.click(card);

    expect(screen.getByText('تَحِيَّة/تَحِيَّات')).toBeInTheDocument();
  });

  it('should go to the next card after rating', () => {
    mockedUseLocation.mockReturnValue({ search: '?lesson=1' });
    render(<BrowserRouter><Review /></BrowserRouter>);

    const card = screen.getByText('Salutation').closest('.cursor-pointer');
    fireEvent.click(card);

    const goodButton = screen.getByRole('button', { name: 'Good' });
    fireEvent.click(goodButton);

    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByText('Lesson')).toBeInTheDocument();
  });

  it('should save stats and navigate home after the last card', () => {
    mockedUseLocation.mockReturnValue({ search: '?lesson=1' });
    render(<BrowserRouter><Review /></BrowserRouter>);

    // Lesson 1 has 12 words
    const totalCards = 12;
    for (let i = 0; i < totalCards; i++) {
      const cardContainer = screen.getByText(/ENGLISH/i).closest('.cursor-pointer');
      fireEvent.click(cardContainer);

      const goodButton = screen.getByRole('button', { name: 'Good' });
      fireEvent.click(goodButton);

      act(() => {
        vi.runAllTimers();
      });
    }

    expect(navigateFn).toHaveBeenCalledWith('/', { replace: true });
    const savedStats = JSON.parse(localStorage.getItem('stats'));
    expect(savedStats.totalCardsReviewed).toBe(totalCards);
    expect(savedStats.points).toBeGreaterThan(defaultStats.points);
  });
});
