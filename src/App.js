import React from 'react';
import QAComponent from './components/QAComponent.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    background: { default: '#f4f6fa' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontWeight: 700 },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6, mb: 4 }}>
          <Typography variant="h3" component="h1" align="center" color="primary" gutterBottom>
            <SmartToyIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
            Gemini-Powered Q&A
          </Typography>
          <QAComponent />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;