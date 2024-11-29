import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mr: 2 }}>
            {message}
        </Typography>
    </Box>
);
