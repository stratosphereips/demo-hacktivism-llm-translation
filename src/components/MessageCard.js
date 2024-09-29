// src/components/MessageCard.js

import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import './MessageCard.css';
import { useTheme } from '@mui/material/styles'; // Import useTheme


const MessageCard = ({ text, type, header }) => {
  const theme = useTheme(); // Access the current theme

  // Define background colors based on the card type and theme
  const getBackgroundColor = () => {
    switch (type) {
      case 'original':
        return theme.palette.mode === 'dark' ? '#1e88e5' : '#e3f2fd'; // Dark or light blue
      case 'translation_1':
        return theme.palette.mode === 'dark' ? '#43a047' : '#e8f5e9'; // Dark or light green
      case 'translation_2':
        return theme.palette.mode === 'dark' ? '#fb8c00' : '#fff3e0'; // Dark or light orange
      default:
        return theme.palette.background.paper; // Default background
    }
  };

  // Define text color based on theme
  const textColor = theme.palette.mode === 'dark' ? '#ffffff' : '#333333';

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Split text by newline characters and render with <br />
  const formattedText = text.split('\n').map((str, index) => (
    <React.Fragment key={index}>
      {str}
      <br />
    </React.Fragment>
  ));

  return (
    <Card
    variant="outlined"
    className={`message-card ${type} ${isFlipped ? 'flipped' : ''}`}
    onClick={handleFlip}
    sx={{
      backgroundColor: getBackgroundColor(),
      borderLeft: '5px solid',
      borderColor:
        type === 'original'
          ? theme.palette.mode === 'dark'
            ? '#64b5f6'
            : '#1976d2'
          : type === 'translation_1'
          ? theme.palette.mode === 'dark'
            ? '#66bb6a'
            : '#388e3c'
          : type === 'translation_2'
          ? theme.palette.mode === 'dark'
            ? '#ffa726'
            : '#f57c00'
          : '#1976d2',
      boxShadow: 3,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        boxShadow: 6,
        transform: 'translateY(-5px)',
      },
    }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {header}
        </Typography>
        <Typography variant="body1">
          {formattedText}
        </Typography>
      </CardContent>
      {isFlipped && (
        <CardContent className="back-content">
          <Typography variant="body2" color="textSecondary">
            Messages obtained from Telegram from 2022-2023.
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

MessageCard.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['original', 'translation_1', 'translation_2']).isRequired,
  header: PropTypes.string.isRequired,
};

export default MessageCard;

