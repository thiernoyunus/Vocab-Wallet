import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from '../contexts/ThemeContext';
import React, { useContext } from 'react';

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

const TestConsumer = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="is-dark-mode">{isDarkMode.toString()}</span>
      <button onClick={toggleDarkMode}>Toggle</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    // Clear the class from the html element
    document.documentElement.classList.remove('dark');
  });

  it('should initialize with dark mode off by default', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('is-dark-mode')).toHaveTextContent('false');
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('should initialize with dark mode on if set in localStorage', () => {
    localStorage.setItem('darkMode', 'true');
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('is-dark-mode')).toHaveTextContent('true');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('should toggle dark mode when toggleDarkMode is called', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    // Initially false
    expect(screen.getByTestId('is-dark-mode')).toHaveTextContent('false');
    expect(document.documentElement).not.toHaveClass('dark');

    // Toggle to true
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('is-dark-mode')).toHaveTextContent('true');
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem('darkMode')).toBe('true');

    // Toggle back to false
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('is-dark-mode')).toHaveTextContent('false');
    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem('darkMode')).toBe('false');
  });
});
