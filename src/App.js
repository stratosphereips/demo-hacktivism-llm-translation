// src/App.js

import React, { useState } from 'react';
import { Container, Typography, Switch, FormControlLabel } from '@mui/material';
import MessageList from './components/MessageList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply baseline CSS */}
        <Container>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={handleThemeChange} />}
            label="Dark Mode"
            style={{ display: 'flex', justifyContent: 'right', marginBottom: '20px' }}
          />
          <Typography variant="h4" align="center" gutterBottom mt={4}>
          Demo! Translating Cybercrime Chatter with LLMs (RU-EN)
          </Typography>
          <MessageList />
        </Container>
    </ThemeProvider>
  );
}

export default App;
