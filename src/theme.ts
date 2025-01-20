import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { yellow, grey } from '@mui/material/colors';

let theme = createTheme({
  palette: {
      primary: {
        main: grey[900],
    },
    secondary: {
        main: yellow[500],
    },
  },
  typography: {
    fontFamily: 'Helvetica Neue, Poppins, sans-serif',
  },
});

theme = responsiveFontSizes(theme);

export default theme