import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const ChatBubble = ({ message, isLeft, time }) => {
  return (
    <Box
      display="flex"
      justifyContent={isLeft ? 'flex-start' : 'flex-end'}
      mb={2}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          maxWidth: '75%',
          backgroundColor: isLeft ? '#f0f0f0' : '#0b93f6',
          color: isLeft ? 'black' : 'white',
          borderRadius: '16px',
          borderBottomLeftRadius: isLeft ? '0px' : '16px',
          borderBottomRightRadius: isLeft ? '16px' : '0px',
          boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
          {message}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: isLeft ? 'left' : 'right',
            color: isLeft ? 'text.secondary' : 'white',
            mt: 1,
          }}
        >
          {time}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatBubble;
