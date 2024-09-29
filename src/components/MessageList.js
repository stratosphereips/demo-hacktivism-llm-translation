// src/components/MessageList.js

import React, { useEffect, useState, useRef } from 'react';
import { CircularProgress, Typography, Box, Button, ButtonGroup, Grid, Card, CardContent, LinearProgress } from '@mui/material';
import MessageCard from './MessageCard';
import axios from 'axios';
import './MessageList.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  // Constants for translation costs
  const HUMAN_COST_PER_WORD = 0.21; // $0.21 per word
  const FT_COST_PER_WORD = 0.00005; // $0.00005 per word

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/messages.json`);
        setMessages(response.data);
      } catch (err) {
        setError('Failed to fetch messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;

    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 20000); // Rotate every 5 seconds
    };

    if (!isPaused) {
      startInterval();
    }

    return () => clearInterval(intervalRef.current);
  }, [messages, isPaused]);

  useEffect(() => {
    if (isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => (prev >= 500 ? 0 : prev + 2));
    }, 100); // Update progress every 100ms

    return () => clearInterval(progressRef.current);
  }, [isPaused]);

  useEffect(() => {
    if (progress >= 100) {
      handleNext();
      setProgress(0);
    }
  }, [progress]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    clearInterval(intervalRef.current);
    clearInterval(progressRef.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? messages.length - 1 : prevIndex - 1
    );
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={5}>
        {error}
      </Typography>
    );
  }

  if (messages.length === 0) {
    return (
      <Typography align="center" mt={5}>
        No messages available.
      </Typography>
    );
  }

  const currentMessage = messages[currentIndex];
  const wordCount = countWords(currentMessage.original_text);
  const humanCost = wordCount * HUMAN_COST_PER_WORD;
  const ftCost = wordCount * FT_COST_PER_WORD;
  const savingsMultiplier = (humanCost / ftCost); // e.g., 4200.00x
  const percentageSaved = ((1 - (ftCost / humanCost)) * 100).toFixed(2); // e.g., 99.9976%

  return (
    <div
      className="message-list"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Translation Cards */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <MessageCard
            text={currentMessage.original_text}
            type="original"
            header="NoName057(16) Group"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MessageCard
            text={currentMessage.ftgpt35125}
            type="translation_1"
            header="FT gpt-3.5-turbo-0125"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MessageCard
            text={currentMessage.deepl}
            type="translation_2"
            header="DeepL Translator (Free)"
          />
        </Grid>
      </Grid>

      {/* Additional Information: Word Count and Costs */}
      <Box mt={3} textAlign="center">
        <Typography variant="h6" gutterBottom>
        ‣ <strong>Words:</strong> {wordCount}        ‣ <strong>Human Cost:</strong> ${humanCost.toFixed(2)}         ‣ <strong>FT-GPT Cost: </strong> ${ftCost.toFixed(5)}
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box mt={2}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      {/* Savings Highlight Card */}
      <Box mt={4} display="flex" justifyContent="center">
        <Card className="savings-card">
          <CardContent>
            <Typography variant="h4" align="center" color="secondary" gutterBottom>
              4200x Cheaper
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary">
              Using the FT LLM model saves you money compared to human translation.
            </Typography>
          </CardContent>
        </Card>
      </Box>


      {/* Navigation Buttons */}
      <Box mt={2} display="flex" justifyContent="center">
        <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
          <Button onClick={handlePrev} aria-label="Previous message">
            <ArrowBackIcon />
            Previous
          </Button>
          <Button onClick={handleNext} aria-label="Next message">
            Next
            <ArrowForwardIcon />
          </Button>
        </ButtonGroup>
      </Box>

    </div>
  );
};

export default MessageList;

