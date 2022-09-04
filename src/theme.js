import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#500809',
    },
    secondary: {
      main: '#ab0000',
    },
    tertiary: {
      main: '#cbc683',
    },
    quaternary: {
      main: '#f1e2cb',
    },
    quinary : {
      main: '#87621e',
    },
    senary : {
      main: '#000000',
    },
    septenary : {
      main: '#000000',
    },
    octonary : {
      main: '#000000',
    },
    nonary : {
      main: '#000000',
    },
    denary  : {
      main: '#000000',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
