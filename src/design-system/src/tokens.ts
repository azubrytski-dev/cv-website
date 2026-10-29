export type ThemeMode = 'dark' | 'light';

export const tokens = {
  font: {
    primary: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: 'Consolas, "Courier New", monospace',
  },
  radius: { card: '10px', button: '10px', pill: '999px' },
  motion: { normal: '200ms ease', fast: '150ms ease' },
  blur: { surface: '0px', overlay: '0px' },
  control: { minHeight: '44px', paddingInline: '24px', gap: '12px' },
  layout: {
    navbarHeight: '4.5rem', mobileNavbarHeight: '6.25rem', contentWidth: '1040px',
    siteWidth: '1280px', railWidth: '10rem', railGap: '2rem',
    footerHeight: '3.75rem', mobileFooterHeight: '3.5rem',
  },
} as const;

export const colorTokens = {
  dark: {
    primary: '#89BFA8', primaryHover: '#A3CFBC', secondary: '#A8B4C2', link: '#89BFA8',
    background: '#11161C', surface: '#1A222C', border: '#344150',
    overlay: 'rgb(0 0 0 / 60%)',
    text: '#E7ECF2', muted: '#A8B4C2', onPrimary: '#11161C',
    accent: '#89BFA8', accentRgb: '137 191 168', primaryRgb: '137 191 168',
    codeBackground: '#1A222C', codeText: '#E7ECF2',
  },
  light: {
    primary: '#25634F', primaryHover: '#1C503F', secondary: '#526170', link: '#25634F',
    background: '#F7F8FA', surface: '#FFFFFF', border: '#DCE2E8',
    overlay: 'rgb(15 23 42 / 24%)',
    text: '#17212B', muted: '#526170', onPrimary: '#FFFFFF',
    accent: '#25634F', accentRgb: '37 99 79', primaryRgb: '37 99 79',
    codeBackground: '#EDF0F3', codeText: '#17212B',
  },
} as const;

export function getTokenVariables(mode: ThemeMode) {
  const colors = colorTokens[mode];
  return {
    '--cv-font-primary': tokens.font.primary,
    '--cv-font-mono': tokens.font.mono,
    '--cv-radius-card': tokens.radius.card,
    '--cv-radius-button': tokens.radius.button,
    '--cv-radius-pill': tokens.radius.pill,
    '--cv-motion-normal': tokens.motion.normal,
    '--cv-motion-fast': tokens.motion.fast,
    '--cv-navbar-height': tokens.layout.navbarHeight,
    '--cv-navbar-height-mobile': tokens.layout.mobileNavbarHeight,
    '--cv-content-width': tokens.layout.contentWidth,
    '--cv-site-width': tokens.layout.siteWidth,
    '--cv-rail-width': tokens.layout.railWidth,
    '--cv-rail-gap': tokens.layout.railGap,
    '--cv-footer-height': tokens.layout.footerHeight,
    '--cv-footer-height-mobile': tokens.layout.mobileFooterHeight,
    '--cv-control-height': tokens.control.minHeight,
    '--cv-control-gap': tokens.control.gap,
    '--cv-color-primary': colors.primary,
    '--cv-color-secondary': colors.secondary,
    '--cv-color-link': colors.link,
    '--cv-color-background': colors.background,
    '--cv-color-surface': colors.surface,
    '--cv-color-border': colors.border,
    '--cv-color-overlay': colors.overlay,
    '--cv-color-text': colors.text,
    '--cv-color-muted': colors.muted,
    '--cv-color-on-primary': colors.onPrimary,
    '--cv-color-accent': colors.accent,
    '--cv-accent-rgb': colors.accentRgb,
    '--cv-primary-rgb': colors.primaryRgb,
    '--cv-code-background': colors.codeBackground,
    '--cv-code-text': colors.codeText,
    // Keep the optional modules' existing token contract without decorative effects.
    '--cv-gradient': 'none',
    '--cv-page-background': 'none',
    '--cv-glass-background': colors.surface,
    '--cv-glass-border': colors.border,
    '--cv-glass-shadow': 'none',
    '--cv-button-shadow': 'none',
    '--cv-hover-shadow': 'none',
  };
}
