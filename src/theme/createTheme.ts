import { lightTheme } from './light';
import { darkTheme } from './dark';

export type ThemeOptions = Partial<typeof lightTheme>;

export function createTheme(options: ThemeOptions = {}, mode: 'light' | 'dark' = 'light') {
  const base = mode === 'dark' ? darkTheme : lightTheme;
  return deepMerge(base, options);
}

function deepMerge<T>(base: T, override: Partial<T>): T {
  const result: any = { ...base };
  for (const key in override) {
    if (
      override[key] &&
      typeof override[key] === 'object' &&
      !Array.isArray(override[key]) &&
      base[key] &&
      typeof base[key] === 'object'
    ) {
      result[key] = deepMerge(base[key], override[key]);
    } else if (override[key] !== undefined) {
      result[key] = override[key];
    }
  }
  return result;
}
