import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '../components/Navigation';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { vi } from 'vitest';

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

describe('Navigation component', () => {
  beforeEach(() => {
    mockedNavigateHook.mockReturnValue(navigateFn);
    mockedUseLocation.mockClear();
    navigateFn.mockClear();
  });

  const testCases = [
    { path: '/', name: 'Home' },
    { path: '/dictionary', name: 'Dictionary' },
    { path: '/stats', name: 'Stats' },
    { path: '/leaderboard', name: 'Rankings' },
    { path: '/settings', name: 'Settings' },
  ];

  testCases.forEach(({ path, name }) => {
    it(`should render the ${name} button and navigate to ${path} on click`, () => {
      mockedUseLocation.mockReturnValue({ pathname: '/some-other-path' });
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );
      const button = screen.getByText(name);
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(navigateFn).toHaveBeenCalledWith(path);
    });

    it(`should apply active styles to the ${name} button when at ${path}`, () => {
      mockedUseLocation.mockReturnValue({ pathname: path });
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );
      const button = screen.getByText(name).parentElement;
      expect(button).toHaveClass('text-blue-600');
    });

    it(`should not apply active styles to the ${name} button when not at ${path}`, () => {
        mockedUseLocation.mockReturnValue({ pathname: '/some-other-path' });
        render(
          <BrowserRouter>
            <Navigation />
          </BrowserRouter>
        );
        const button = screen.getByText(name).parentElement;
        expect(button).not.toHaveClass('text-blue-600');
        expect(button).toHaveClass('text-gray-600');
      });
  });
});
