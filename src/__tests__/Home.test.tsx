import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from '../components/Home';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock useNavigate
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom') as object;
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe('Home component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    mockedNavigate.mockClear();
  });

  it('should render the welcome message', () => {
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
  });

  it('should render the "Today\'s Review" section', () => {
    expect(screen.getByText("Today's Review")).toBeInTheDocument();
    expect(screen.getByText('Cards due')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Start Review')).toBeInTheDocument();
  });

  it('should navigate to the review page when "Start Review" is clicked', () => {
    fireEvent.click(screen.getByText('Start Review'));
    expect(mockedNavigate).toHaveBeenCalledWith('/review');
  });

  it('should render the streak and mastered sections', () => {
    expect(screen.getByText('Streak')).toBeInTheDocument();
    expect(screen.getByText('7 days')).toBeInTheDocument();
    expect(screen.getByText('Mastered')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should render the "Arabic Course" section with lessons', () => {
    expect(screen.getByText('Arabic Course')).toBeInTheDocument();
    expect(screen.getByText('Select a lesson to start learning')).toBeInTheDocument();
    expect(screen.getByText('Lesson 1: Salutation التحية')).toBeInTheDocument();
    expect(screen.getByText('Lesson 5: Self introduction- التَّعْرِيفْ بِالنَّفْس')).toBeInTheDocument();
  });

  it('should navigate to the correct lesson page when a lesson is clicked', () => {
    fireEvent.click(screen.getByText('Lesson 1: Salutation التحية'));
    expect(mockedNavigate).toHaveBeenCalledWith('/lesson/1');

    fireEvent.click(screen.getByText('Lesson 2: Getting to know one another - التعارف'));
    expect(mockedNavigate).toHaveBeenCalledWith('/lesson/2');
  });
});
