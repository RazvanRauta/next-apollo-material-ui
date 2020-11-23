import red from '@material-ui/core/colors/red'
import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '#react-autowhatever-1': {
          '& ul': {
            listStyle: 'none',
            padding: 0,
            border: '1px solid #19857b',
            maxWidth: 300,
          },
        },
      },
    },
  },
})

export default theme
