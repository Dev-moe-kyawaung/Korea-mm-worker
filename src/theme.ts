import { useColorScheme } from 'react-native';
import { useApp } from './store/AppContext';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface Palette {
  mode: 'light' | 'dark';
  bg: string;
  surface: string;
  surfaceAlt: string;
  card: string;
  border: string;
  text: string;
  textDim: string;
  textFaint: string;
  primary: string;
  primarySoft: string;
  accent: string;
  accentSoft: string;
  gold: string;
  success: string;
  successSoft: string;
  warn: string;
  warnSoft: string;
  danger: string;
  dangerSoft: string;
  info: string;
  infoSoft: string;
  overlay: string;
  tabBar: string;
}

const dark: Palette = {
  mode: 'dark',
  bg: '#0A1020',
  surface: '#121A2E',
  surfaceAlt: '#18223A',
  card: '#141D33',
  border: '#25314F',
  text: '#EEF3FF',
  textDim: '#9DAAC6',
  textFaint: '#64728F',
  primary: '#3B7DFF',
  primarySoft: 'rgba(59,125,255,0.16)',
  accent: '#F2536B',
  accentSoft: 'rgba(242,83,107,0.16)',
  gold: '#F5B942',
  success: '#2FD08A',
  successSoft: 'rgba(47,208,138,0.15)',
  warn: '#F7A93B',
  warnSoft: 'rgba(247,169,59,0.15)',
  danger: '#FF5C5C',
  dangerSoft: 'rgba(255,92,92,0.15)',
  info: '#5BC8F5',
  infoSoft: 'rgba(91,200,245,0.15)',
  overlay: 'rgba(4,8,18,0.72)',
  tabBar: 'rgba(12,18,34,0.96)',
};

const light: Palette = {
  mode: 'light',
  bg: '#F3F6FC',
  surface: '#FFFFFF',
  surfaceAlt: '#EDF1FA',
  card: '#FFFFFF',
  border: '#DDE4F0',
  text: '#0E1526',
  textDim: '#4E5D7A',
  textFaint: '#8593AD',
  primary: '#1F5FE0',
  primarySoft: 'rgba(31,95,224,0.10)',
  accent: '#DE3A54',
  accentSoft: 'rgba(222,58,84,0.10)',
  gold: '#C98A0A',
  success: '#12935C',
  successSoft: 'rgba(18,147,92,0.12)',
  warn: '#B36B00',
  warnSoft: 'rgba(179,107,0,0.12)',
  danger: '#D42B2B',
  dangerSoft: 'rgba(212,43,43,0.10)',
  info: '#0E7FA8',
  infoSoft: 'rgba(14,127,168,0.12)',
  overlay: 'rgba(15,23,42,0.45)',
  tabBar: 'rgba(255,255,255,0.97)',
};

function contrastize(p: Palette): Palette {
  return {
    ...p,
    text: p.mode === 'dark' ? '#FFFFFF' : '#000000',
    textDim: p.mode === 'dark' ? '#D7E0F5' : '#25304A',
    border: p.mode === 'dark' ? '#54648C' : '#7A88A6',
    primary: p.mode === 'dark' ? '#7FA9FF' : '#0B3FA8',
  };
}

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { sm: 10, md: 14, lg: 20, pill: 999 } as const;

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  float: {
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
};

export interface AppTheme extends Palette {
  spacing: typeof spacing;
  radius: typeof radius;
  shadow: typeof shadow;
}

export function useTheme(): AppTheme {
  const scheme = useColorScheme();
  const { settings } = useApp();
  const resolved: 'light' | 'dark' =
    settings.theme === 'system' ? (scheme === 'light' ? 'light' : 'dark') : settings.theme;
  const base = resolved === 'light' ? light : dark;
  const p = settings.highContrast ? contrastize(base) : base;
  return { ...p, spacing, radius, shadow };
}
