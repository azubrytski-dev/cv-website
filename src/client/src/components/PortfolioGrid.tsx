'use client';

import React from 'react';
import { Grid2 } from '@mui/material';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Header from './Header';
import Skills from './Skills';

const PortfolioGrid: React.FC = () => {
    return (
        <Grid2 container spacing={3} sx={{ padding: 3 }}>
            {/* Header Section */}
            <Grid2 container size={{ xs: 12, sm: 6, md: 6 }}>
                <Header />
            </Grid2>

            {/* About Section */}
            <Grid2 container size={{ xs: 12, sm: 6, md: 6 }}>
                <About />
            </Grid2>

            {/* Experience Section */}
            <Grid2 container size={{ xs: 12, sm: 12, md: 12 }}>
                <Skills />
            </Grid2>

            {/* Experience Section */}
            <Grid2 container size={{ xs: 12, sm: 12, md: 12 }}>
                <Experience />
            </Grid2>

            {/* Education Section */}
            <Grid2 container size={{ xs: 12, sm: 12, md: 12 }}>
                <Education />
            </Grid2>
        </Grid2>
    );
};

export default PortfolioGrid;
