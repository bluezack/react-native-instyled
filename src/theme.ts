import { useContext, createContext } from 'react';
import type { Theme } from './types/theme.types';

const defaultTheme: Theme = {};

export const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ThemeContext.Provider;
