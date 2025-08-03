import React, { createContext, useContext, ReactNode } from 'react';
import { DeepPartial } from '../types/utils';
import { Theme } from './types';
import { defaultTheme } from './defaultTheme';

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider = ({ theme = defaultTheme, children }: { theme?: Theme; children: ReactNode }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = function() { return useContext(ThemeContext) };

/**
 * Deep merges a partial theme with the default theme
 * @param overrides - Partial theme object with custom values
 * @returns A complete theme object
 */
export const createTheme = (overrides: DeepPartial<Theme>): Theme => {
  const mergeDeep = <T extends Record<string, any>>(target: T, source: DeepPartial<T>): T => {
    const output = { ...target };
    
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        const sourceValue = source[key];
        const targetValue = target[key];

        if (sourceValue !== null && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
          if (targetValue !== null && typeof targetValue === 'object' && !Array.isArray(targetValue)) {
            output[key] = mergeDeep(targetValue, sourceValue as DeepPartial<typeof targetValue>);
          } else {
            output[key] = sourceValue as T[typeof key];
          }
        } else if (sourceValue !== undefined) {
          output[key] = sourceValue as T[typeof key];
        }
      }
    }
    
    return output;
  };

  return mergeDeep(defaultTheme, overrides);
};
