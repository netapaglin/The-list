import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }

    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(17, 18, 87)',
         
        },
        secondary: {
            main: 'rgb(223, 33, 252)',
        },
        error: {
            main: 'rgb(255, 211, 209)',
        },
        info:{
            main: '#ffffff'
        }
    },
});

export default theme;