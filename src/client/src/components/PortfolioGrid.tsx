import React from 'react';
import { Box, Typography, Grid2, useTheme } from '@mui/material';
import FlipCard from './shared/FlipCard';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Header from './Header';

const PortfolioGrid: React.FC = () => {
    const theme = useTheme();
    return (
        <Grid2 container spacing={3} sx={{ padding: 3 }}>
            {/* Header Section */}
            <Grid2 container size={{ xs: 12, sm: 6, md: 6 }}>
                <Box sx={getBoxStyle(theme)}>
                    <Header />
                </Box>
            </Grid2>

            {/* About Section */}
            <Grid2 container size={{ xs: 12, sm: 6, md: 6 }}>
                <Box sx={getBoxStyle(theme)}>
                    <About />
                </Box>
            </Grid2>

            {/* Experience Section */}
            <Grid2 container size={{ xs: 12, sm: 12, md: 12 }}>
                <Box sx={getBoxStyle(theme)}>
                    <Experience />
                </Box>
            </Grid2>

            {/* Education Section */}
            <Grid2 container size={{ xs: 12, sm: 12, md: 12 }}>
                <Box sx={getBoxStyle(theme)}>
                    <Education />
                </Box>
            </Grid2>
        </Grid2>
    );
};


const getBoxStyle = (theme: any) => ({
    background: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
    color: theme.palette.mode === 'dark' ? '#0ff' : '#333',
    padding: '20px',
    width: '100%',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0px 0px 20px rgba(0, 255, 255, 0.2)'
            : '0px 0px 10px rgba(0, 0, 0, 0.1)',
});

export default PortfolioGrid;