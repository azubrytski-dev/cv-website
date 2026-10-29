import { createTheme } from '@mui/material/styles';
import { colorTokens, getTokenVariables, tokens } from './tokens';
import type { ThemeMode } from './tokens';
import { getSurfaceStyles } from './glass';

export function createSiteTheme(mode: ThemeMode) {
  const colors = colorTokens[mode];
  const focus = { outline: `2px solid ${colors.primary}`, outlineOffset: '3px' };

  return createTheme({
    palette: {
      mode,
      primary: { main: colors.primary, dark: colors.primaryHover, contrastText: colors.onPrimary },
      secondary: { main: colors.secondary },
      background: { default: colors.background, paper: colors.surface },
      text: { primary: colors.text, secondary: colors.muted },
      divider: colors.border,
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: tokens.font.primary,
      h1: { fontSize: 'clamp(2rem, 4.5vw, 3rem)', lineHeight: 1.12, fontWeight: 700, letterSpacing: '-0.045em' },
      h2: { fontSize: 'clamp(1.625rem, 3vw, 1.875rem)', lineHeight: 1.25, fontWeight: 650, letterSpacing: '-0.025em' },
      h3: { fontSize: '1.125rem', lineHeight: 1.4, fontWeight: 650 },
      h5: { fontSize: '1.375rem', lineHeight: 1.4, fontWeight: 650 },
      h6: { fontSize: '1.0625rem', lineHeight: 1.4, fontWeight: 600 },
      body1: { fontSize: '1rem', lineHeight: 1.65 },
      body2: { fontSize: '0.925rem', lineHeight: 1.65 },
      caption: { fontSize: '0.8125rem', lineHeight: 1.6 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': getTokenVariables(mode),
          '[data-cv-theme="dark"]': getTokenVariables('dark'),
          '[data-cv-theme="light"]': getTokenVariables('light'),
          body: { fontFamily: tokens.font.primary },
          code: { fontFamily: tokens.font.mono },
          'a': { color: 'inherit' },
          ':focus-visible': focus,
          '@media (prefers-reduced-motion: reduce)': {
            '*, *::before, *::after': { animation: 'none !important', transition: 'none !important', scrollBehavior: 'auto !important' },
          },
        },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', boxShadow: 'none' } } },
      MuiLink: {
        styleOverrides: { root: { textUnderlineOffset: '3px', overflowWrap: 'anywhere' } },
      },
      MuiChip: {
        styleOverrides: { root: { borderRadius: tokens.radius.pill, borderColor: colors.border, color: colors.muted, fontWeight: 500, fontSize: '0.8125rem' } },
      },
      MuiIconButton: {
        styleOverrides: { root: { borderRadius: tokens.radius.button, '&.Mui-focusVisible': focus } },
      },
      MuiDialog: {
        styleOverrides: {
          root: { '& .MuiBackdrop-root': { backgroundColor: 'var(--cv-color-overlay)' } },
          paper: {
            ...getSurfaceStyles(),
            color: colors.text,
            margin: '1rem', width: 'calc(100% - 2rem)', maxHeight: 'calc(100% - 2rem)',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: { root: { padding: '1.5rem 1.5rem 1rem', color: colors.text, fontWeight: 650, lineHeight: 1.4 } },
      },
      MuiDialogContent: { styleOverrides: { root: { padding: '1.5rem', borderColor: colors.border } } },
      MuiDialogActions: {
        defaultProps: { disableSpacing: true },
        styleOverrides: { root: { padding: '1rem 1.5rem', gap: tokens.control.gap } },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.button, textTransform: 'none', fontWeight: 600,
            padding: `0.625rem ${tokens.control.paddingInline}`, minHeight: tokens.control.minHeight, boxShadow: 'none',
            transition: `background-color ${tokens.motion.fast}, border-color ${tokens.motion.fast}, color ${tokens.motion.fast}`,
            '&.Mui-focusVisible': focus,
          },
          contained: { backgroundColor: colors.primary, color: colors.onPrimary, '&:hover': { backgroundColor: colors.primaryHover, boxShadow: 'none' } },
          outlined: { borderColor: colors.border, color: colors.text, '&:hover': { borderColor: colors.primary, backgroundColor: `rgb(${colors.primaryRgb} / 6%)` } },
          text: { color: colors.primary },
        },
      },
    },
  });
}

export const darkTheme = createSiteTheme('dark');
export const lightTheme = createSiteTheme('light');
