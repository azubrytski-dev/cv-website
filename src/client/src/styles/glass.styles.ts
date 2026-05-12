import type { Theme } from '@mui/material/styles';

export const getGlassSurfaceStyles = (theme: Theme, accent = '0 255 255') => {
  const isDark = theme.palette.mode === 'dark';
  const borderColor = isDark ? 'rgba(0, 255, 255, 0.16)' : 'rgba(25, 118, 210, 0.16)';
  const shadowColor = isDark ? '0, 255, 255' : '25, 118, 210';

  return {
    background: isDark
      ? 'linear-gradient(135deg, rgba(28, 28, 28, 0.48), rgba(18, 18, 18, 0.30))'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.56), rgba(245, 245, 245, 0.38))',
    backdropFilter: 'blur(20px) saturate(140%)',
    WebkitBackdropFilter: 'blur(20px) saturate(140%)',
    border: `1px solid ${borderColor}`,
    boxShadow: `0 18px 40px rgba(${shadowColor}, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
    position: 'relative',
    overflow: 'hidden',
    '& > *': {
      position: 'relative',
      zIndex: 1,
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(circle at top left, rgba(${accent}, 0.12), transparent 45%)`,
      pointerEvents: 'none',
    },
  };
};
