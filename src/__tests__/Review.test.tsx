import { render, screen, fireEvent, act } from '@testing-library/react';
import { Review } from '../components/Review';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { vi } from 'vitest';
import { defaultStats } from '../utils/updateStats';
import { lessonContent } from '../utils/lessons';

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
  let mathRandomSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    mockedNavigateHook.mockReturnValue(navigateFn);
    mockedUseLocation.mockClear();
    navigateFn.mockClear();
    localStorage.clear();
    mathRandomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.1);
    vi.useFakeTimers();
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
    vi.useRealTimers();
  });

  it('should load the default lesson when none is specified', () => {
    mockedUseLocation.mockReturnValue({ search: '' });
    render(<BrowserRouter><Review /></BrowserRouter>);
    expect(screen.getByText(/Quiz/i)).toBeInTheDocument();
    const optionButtons = screen
      .getAllByRole('button')
      .filter(button => button.className.includes('border-white/10') && button.className.includes('rounded-2xl'));
    expect(optionButtons.length).toBeGreaterThan(0);
  });

  it('should load cards for the specified lesson', () => {
    mockedUseLocation.mockReturnValue({ search: '?lesson=1' });
    render(<BrowserRouter><Review /></BrowserRouter>);
    expect(screen.getByText(/Greetings التحية Quiz/i)).toBeInTheDocument();
    const optionButtons = screen
      .getAllByRole('button')
      .filter(button => button.className.includes('border-white/10') && button.className.includes('rounded-2xl'));
    expect(optionButtons.length).toBe(4);
  });

  it('should style the correct answer after selecting an option', () => {
    mockedUseLocation.mockReturnValue({ search: '?lesson=1' });
    render(<BrowserRouter><Review /></BrowserRouter>);

    const promptText = screen.getByText(/Tap the English for/).textContent ?? '';
    const arabicTerm = promptText.match(/"(.+)"/)?.[1] ?? '';
    const words = lessonContent[1];
    const currentWord = words.find(word => word.arabic === arabicTerm);
    const correctOption = screen.getByRole('button', { name: currentWord?.english ?? '' });
    fireEvent.click(correctOption);

    expect(correctOption.className).toContain('border-emerald-400');
    expect(correctOption.className).toContain('bg-emerald-500/20');

    act(() => {
      vi.runAllTimers();
    });
  });

  it('should go to the next card after rating', () => {
    mockedUseLocation.mockReturnValue({ search: '?lesson=1' });
    render(<BrowserRouter><Review /></BrowserRouter>);

    const firstPrompt = screen.getByText(/Tap the English for/).textContent;
    const arabicTerm = firstPrompt?.match(/"(.+)"/)?.[1] ?? '';
    const words = lessonContent[1];
    const currentWord = words.find(word => word.arabic === arabicTerm);
    const button = screen.getByRole('button', { name: currentWord?.english ?? '' });
    fireEvent.click(button);

    act(() => {
      vi.runAllTimers();
    });

    const nextPrompt = screen.getByText(/Tap the English for/).textContent;
    expect(nextPrompt).not.toBe(firstPrompt);
  });

  it('should save stats and navigate home after the last card', () => {
    mockedUseLocation.mockReturnValue({ search: '?lesson=1' });
    render(<BrowserRouter><Review /></BrowserRouter>);

    const words = lessonContent[1];
    const totalCards = words.length;

    for (let i = 0; i < totalCards; i++) {
      const prompt = screen.getByText(/Tap the English for/).textContent ?? '';
      const arabicTerm = prompt.match(/"(.+)"/)?.[1] ?? '';
      const currentWord = words.find(word => word.arabic === arabicTerm);
      const button = screen.getByRole('button', { name: currentWord?.english ?? '' });
      fireEvent.click(button);

      act(() => {
        vi.runAllTimers();
      });
    }

    expect(screen.getByText(/Great Effort!|Legendary!/)).toBeInTheDocument();
    const returnButton = screen.getByRole('button', { name: /Return to map/i });
    fireEvent.click(returnButton);

    expect(navigateFn).toHaveBeenCalledWith('/');
    const savedStats = JSON.parse(localStorage.getItem('stats'));
    expect(savedStats.totalCardsReviewed).toBe(totalCards);
    expect(savedStats.points).toBeGreaterThan(defaultStats.points);
  });
});
