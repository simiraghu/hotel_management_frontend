import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%', // Ensures it takes up full height of the parent container
            }}
        >
            <CircularProgress sx={{ color: '#27877e' }} />
        </Box>
    );
}
