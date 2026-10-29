import type { CSSObject, Theme } from '@mui/material/styles';

export const getSurfaceStyles = () => ({
  background: 'var(--cv-color-surface)',
  border: '1px solid var(--cv-color-border)',
  borderRadius: 'var(--cv-radius-card)',
  boxShadow: 'none',
} satisfies CSSObject);

// Compatibility for modules written against the previous surface helper.
export const getGlassSurfaceStyles = (_theme?: Theme, _accent?: string) => getSurfaceStyles();
