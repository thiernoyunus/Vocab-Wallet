import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Home } from '../components/Home';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('Home component', () => {
  const renderHome = () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

  beforeEach(() => {
    mockedNavigate.mockClear();
    localStorage.clear();
  });

  it('renders the daily streak overview and XP summary', () => {
    renderHome();
    expect(screen.getByText(/Daily Streak/i)).toBeInTheDocument();
    expect(screen.getByText(/^0\s*XP$/i)).toBeInTheDocument();
  });

  it('displays the daily quest call to action', () => {
    renderHome();
    expect(screen.getByText(/Review 10 words to earn bonus XP/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start \+15 XP/i })).toBeInTheDocument();
  });

  it('navigates to the review session when the quest button is clicked', () => {
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: /Start \+15 XP/i }));
    expect(mockedNavigate).toHaveBeenCalledWith('/review?lesson=2');
  });

  it('shows the quest path lessons', () => {
    renderHome();
    expect(screen.getByText('Greetings التحية')).toBeInTheDocument();
    expect(screen.getByText('Getting to Know التعارف')).toBeInTheDocument();
    expect(screen.getByText('Family الأسرة')).toBeInTheDocument();
  });

  it('navigates to an unlocked lesson when selected', () => {
    renderHome();
    const lessonButton = screen.getByText('Getting to Know التعارف').closest('button');
    expect(lessonButton).not.toBeNull();
    fireEvent.click(lessonButton!);
    expect(mockedNavigate).toHaveBeenCalledWith('/lesson/2');
  });

  it('shows a locked message for locked lessons', () => {
    vi.useFakeTimers();
    renderHome();
    const lockedLesson = screen.getByText('Home السكن').closest('button');
    expect(lockedLesson).not.toBeNull();
    act(() => {
      fireEvent.click(lockedLesson!);
    });
    expect(mockedNavigate).not.toHaveBeenCalledWith('/lesson/4');
    expect(screen.getByText(/Complete the previous quest/i)).toBeInTheDocument();
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();
  });
});
