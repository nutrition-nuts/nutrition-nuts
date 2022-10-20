import { createTheme } from '@mui/material'
import { green } from '@mui/material/colors'

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#506f8c'
    },
    secondary: {
      main: green[500]
    }
  }
})
