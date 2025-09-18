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
    { path: '/', name: 'Map' },
    { path: '/dictionary', name: 'Dictionary' },
    { path: '/stats', name: 'Stats' },
    { path: '/leaderboard', name: 'Rank' },
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
      const button = screen.getByRole('button', { name });
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
      const button = screen.getByRole('button', { name });
      expect(button).toHaveClass('bg-gradient-to-br');
      expect(button).toHaveClass('from-sky-500');
      expect(button).toHaveClass('via-sky-400');
      expect(button).toHaveClass('to-cyan-400');
    });

    it(`should not apply active styles to the ${name} button when not at ${path}`, () => {
        mockedUseLocation.mockReturnValue({ pathname: '/some-other-path' });
        render(
          <BrowserRouter>
            <Navigation />
          </BrowserRouter>
        );
        const button = screen.getByRole('button', { name });
        expect(button).not.toHaveClass('bg-gradient-to-br');
        expect(button).toHaveClass('text-sky-100/70');
      });
  });
});
