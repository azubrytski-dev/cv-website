import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Flipper, Flipped } from 'react-flip-toolkit';
import '../../styles/FlipCard.scss';

interface FlipCardProps {
  frontText: string;
  backText: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontText, backText }) => {
  const [flipped, setFlipped] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Flipper flipKey={flipped}>
      <Box
        className={`flip-card ${theme.palette.mode}`}
        sx={{
          width: isSmallScreen ? '16rem' : '15.625rem',
          height: '9.375rem',
          margin: isSmallScreen ? 'auto' : '0',
        }}
        onClick={() => setFlipped(!flipped)}
      >
        <Box className="flip-card-inner">
          {/* Front Side */}
          <Flipped flipId="front">
            <Box className="flip-card-front">
              <Typography variant="h6">{frontText}</Typography>
            </Box>
          </Flipped>

          {/* Back Side */}
          <Flipped flipId="back">
            <Box className="flip-card-back">
              <Typography variant="body2" sx={{ padding: '0.5rem' }}>
                {backText}
              </Typography>
            </Box>
          </Flipped>
        </Box>
      </Box>
    </Flipper>
  );
};

export default FlipCard;
