import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { LightColors, DarkColors, ThemeColors, ThemeMode } from '../constants/colors';

interface ThemeContextType {
  colors: ThemeColors;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (!isInitialized) {
        setMode((colorScheme === 'dark' ? 'dark' : 'light'));
      }
    });
    return () => subscription.remove();
  }, [isInitialized]);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const colors = useMemo(() => {
    return mode === 'dark' ? DarkColors : LightColors;
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
  }, []);

  const value = useMemo(
    () => ({
      colors,
      mode,
      toggleTheme,
      setTheme,
      isDark: mode === 'dark',
    }),
    [colors, mode, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      colors: LightColors,
      mode: 'light',
      toggleTheme: () => {},
      setTheme: () => {},
      isDark: false,
    };
  }
  return context;
};

export { LightColors, DarkColors };
export type { ThemeColors, ThemeMode };