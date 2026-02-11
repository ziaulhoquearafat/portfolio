import { createContext, useContext, useEffect, useState } from 'react';

const AVAILABLE_THEMES = ['light', 'dark'];

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  cycleTheme: () => {},
  themes: AVAILABLE_THEMES,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState('light');

  // Initialize from localStorage (optional) and set initial data-theme
  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    const initial = AVAILABLE_THEMES.includes(stored) ? stored : 'light';

    setThemeState(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  // Keep data-theme + localStorage in sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    if (AVAILABLE_THEMES.includes(newTheme)) {
      setThemeState(newTheme);
    }
  };

  const cycleTheme = () => {
    setThemeState((prev) => {
      const currentIndex = AVAILABLE_THEMES.indexOf(prev);
      const nextIndex = (currentIndex + 1) % AVAILABLE_THEMES.length;
      return AVAILABLE_THEMES[nextIndex];
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        cycleTheme,
        themes: AVAILABLE_THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

