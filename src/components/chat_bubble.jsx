import React from 'react';
import { Paper, Typography } from '@mui/material';

const ChatBubble = ({ message, isLeft, time }) => {
  return (
    <div style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', marginBottom: '10px' }}>
      <Paper
        elevation={3}
        style={{
          padding: '10px',
          maxWidth: '80%',
          backgroundColor: isLeft ? '#ffffff' : '#e1ffc7', 
          borderRadius: '8px',
        }}
      >
        <Typography variant="body1">{message}</Typography>
        <Typography variant="caption" style={{ textAlign: 'right', marginTop: '5px' }}>{time}</Typography>
      </Paper>
    </div>
  );
};

export default ChatBubble;
