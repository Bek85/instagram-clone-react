import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    useNextVariants: true,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", Helvetica, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#3897f0',
    },
    secondary: {
      main: '#385185',
    },
    error: {
      main: '#ed4956',
    },
    background: {
      default: '#fafafa',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        a {
          text-decoration: none;
        }
      `,
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&$focused': {
            color: '#999',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fafafa',
          border: '1px solid #efefef',
          '&:hover': {
            backgroundColor: '#fafafa',
          },
          '&$focused': {
            backgroundColor: '#fafafa',
          },
        },
        underline: {
          '&:after': { borderBottom: '1px solid #efefef' },
          '&:before': { borderBottom: '1px solid #efefef' },
          '&:hover:before': { borderBottom: '1px solid #efefef' },
          '&:hover': { borderBottom: '1px solid #efefef' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-containedPrimary:hover': {
            backgroundColor: '#3897f0',
            boxShadow: 'none',
          },
          textTransform: 'unset',
        },
        contained: {
          boxShadow: 'unset',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #e6e6e6',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #e6e6e6',
        },
        elevation1: {
          boxShadow: 'unset',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #e6e6e6',
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '&$filled&$positionStart': {
            margin: 0,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        labelIcon: {
          '& $wrapper > *:first-child': {
            marginBottom: 'unset',
            marginRight: 6,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paperScrollPaper: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
