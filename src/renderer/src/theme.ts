import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: 'Alexandria',
    },
    palette: {
        primary: {
            main: '#1976d2', // اللون الأساسي
        },
        secondary: {
            main: '#dc004e', // اللون الثانوي
        },
    },
});

export default theme;