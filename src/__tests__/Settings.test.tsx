import { render, screen, fireEvent } from '@testing-library/react';
import { Settings } from '../components/Settings';
import { ThemeContext } from '../contexts/ThemeContext';
import { vi } from 'vitest';

const mockToggleDarkMode = vi.fn();

const renderWithTheme = (isDarkMode: boolean) => {
  return render(
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode: mockToggleDarkMode }}>
      <Settings />
    </ThemeContext.Provider>
  );
};

describe('Settings component', () => {
  beforeEach(() => {
    mockToggleDarkMode.mockClear();
  });

  it('should render the settings title and all options', () => {
    renderWithTheme(false);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByText('Help & Support')).toBeInTheDocument();
  });

  it('should call toggleDarkMode when the dark mode switch is clicked', () => {
    renderWithTheme(false);
    const darkModeSwitch = screen.getByTestId('dark-mode-toggle');
    fireEvent.click(darkModeSwitch);
    expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);
  });

  it('should display the dark mode switch as "on" when isDarkMode is true', () => {
    renderWithTheme(true);
    const switchContainer = screen.getByTestId('dark-mode-toggle');
    expect(switchContainer).toHaveClass('bg-blue-600');
  });

  it('should display the dark mode switch as "off" when isDarkMode is false', () => {
    renderWithTheme(false);
    const switchContainer = screen.getByTestId('dark-mode-toggle');
    expect(switchContainer).toHaveClass('bg-gray-200');
  });
});
