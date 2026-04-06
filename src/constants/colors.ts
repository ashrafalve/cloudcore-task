export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  background: string;
  surface: string;
  surfaceVariant: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
  error: string;
  errorLight: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  white: string;
  black: string;
  transparent: string;
  overlay: string;
  gradientStart: string;
  gradientEnd: string;
}

export const LightColors: ThemeColors = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#3B82F6',
  secondary: '#10B981',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  surfaceVariant: '#F1F5F9',
  text: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  success: '#22C55E',
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
  gradientStart: '#2563EB',
  gradientEnd: '#1D4ED8',
};

export const DarkColors: ThemeColors = {
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  primaryLight: '#60A5FA',
  secondary: '#34D399',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceVariant: '#334155',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  border: '#334155',
  borderLight: '#1E293B',
  error: '#F87171',
  errorLight: '#7F1D1D',
  success: '#4ADE80',
  successLight: '#14532D',
  warning: '#FBBF24',
  warningLight: '#78350F',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.7)',
  gradientStart: '#3B82F6',
  gradientEnd: '#2563EB',
};

export const Colors = {
  ...LightColors,
};