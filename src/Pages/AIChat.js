import React, { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Box,
  Paper
} from '@mui/material';
import axios from 'axios';

const BankingAI = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChatSubmit = async () => {
    if (!chatInput) return;
    setLoading(true);

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCuZBNCAGVW-aXfNQPSKUl_UHhIkaNNN4k',
        {
          contents: [{ parts: [{ text: chatInput }] }]
        }
      );

      const candidate = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setChatResponse(candidate || 'Sorry, I couldn’t understand that.');
    } catch (error) {
      console.error('Error fetching response:', error);
      setChatResponse('Sorry, something went wrong. Please try again.');
    }

    setLoading(false);
  };

  const renderParagraph = (paragraph, index) => {
    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
      return (
        <Typography
          key={index}
          variant="body1"
          component="p"
          sx={{ fontWeight: 'bold', textAlign: 'left', color: '#045d64' }}
        >
          {paragraph.slice(2, -2)}
        </Typography>
      );
    } else {
      return (
        <Typography
          key={index}
          variant="body1"
          component="p"
          sx={{ textAlign: 'left', color: '#333' }}
        >
          {paragraph}
        </Typography>
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e0f7fa',
        padding: '5vw 10vw',
        fontFamily: '"Outfit", sans-serif',
      }}
    >
      <Paper elevation={3} sx={{ padding: '30px', borderRadius: '20px', backgroundColor: '#ffffff' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#06bbcc', fontWeight: 600 }}>
          Chat with Student AI
        </Typography>

        <TextField
          label="Type your message"
          variant="outlined"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          onClick={handleChatSubmit}
          disabled={loading}
          sx={{
            backgroundColor: '#06bbcc',
            '&:hover': { backgroundColor: '#0499a8' },
            color: '#fff',
            marginTop: '10px',
            padding: '8px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
          }}
        >
          Send
        </Button>

        {loading && <CircularProgress sx={{ marginTop: '20px', color: '#06bbcc' }} />}

        {chatResponse && !loading && (
          <Card sx={{ marginTop: '30px', backgroundColor: '#f1ffff', border: '2px solid #06bbcc', borderRadius: '12px' }}>
            <CardContent sx={{ padding: '24px' }}>
              {chatResponse.split('\n').map(renderParagraph)}
            </CardContent>
          </Card>
        )}
      </Paper>
    </Box>
  );
};

export default BankingAI;
