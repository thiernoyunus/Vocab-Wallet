import { render, screen, fireEvent } from '@testing-library/react';
import { LessonDetail } from '../components/LessonDetail';
import { BrowserRouter, useNavigate, useParams } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

const mockedNavigateHook = useNavigate as vi.Mock;
const mockedUseParams = useParams as vi.Mock;
const navigateFn = vi.fn();

describe('LessonDetail component', () => {
  beforeEach(() => {
    mockedNavigateHook.mockReturnValue(navigateFn);
    mockedUseParams.mockClear();
    navigateFn.mockClear();
  });

  it('should render lesson details for a valid lesson ID', () => {
    mockedUseParams.mockReturnValue({ id: '1' });
    render(
      <BrowserRouter>
        <LessonDetail />
      </BrowserRouter>
    );

    expect(screen.getByText('Lesson 1: Salutation التحية')).toBeInTheDocument();
    expect(screen.getByText('Salutation')).toBeInTheDocument();
    expect(screen.getByText('تَحِيَّة/تَحِيَّات')).toBeInTheDocument();
    expect(screen.getByText('Thank you I am fine as well')).toBeInTheDocument();
    expect(screen.getByText('شُكْرًا أَنا بِخَيْرٍ أَيْضًا')).toBeInTheDocument();
  });

  it('should display "Lesson not found" for an invalid lesson ID', () => {
    mockedUseParams.mockReturnValue({ id: '999' });
    render(
      <BrowserRouter>
        <LessonDetail />
      </BrowserRouter>
    );

    expect(screen.getByText('Lesson not found')).toBeInTheDocument();
  });

  it('should navigate to home when the back button is clicked', () => {
    mockedUseParams.mockReturnValue({ id: '1' });
    render(
      <BrowserRouter>
        <LessonDetail />
      </BrowserRouter>
    );

    const backButton = screen.getByRole('button', { name: "Back to lessons" });
    fireEvent.click(backButton);
    expect(navigateFn).toHaveBeenCalledWith('/');
  });

  it('should navigate to the review page with the correct lesson id when "Start Review" is clicked', () => {
    mockedUseParams.mockReturnValue({ id: '1' });
    render(
      <BrowserRouter>
        <LessonDetail />
      </BrowserRouter>
    );

    const startReviewButton = screen.getByText('Start Review');
    fireEvent.click(startReviewButton);
    expect(navigateFn).toHaveBeenCalledWith('/review?lesson=1');
  });
});
