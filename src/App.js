import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { TodoDashboard } from './components/TodoDashboard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#242D3E'
    }
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TodoDashboard />
    </ThemeProvider>
  );
}

export default App;