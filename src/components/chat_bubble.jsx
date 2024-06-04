import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Bubble = styled(Box)(({ theme, isLeft }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: isLeft ? 'flex-start' : 'flex-end',
  marginBottom: theme.spacing(2),
}));

const MessageBox = styled(Box)(({ theme, isLeft }) => ({
  maxWidth: '60%',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isLeft ? theme.palette.grey[300] : theme.palette.primary.main,
  color: isLeft ? theme.palette.text.primary : theme.palette.common.white,
  textAlign: 'left',
}));

const TimeBox = styled(Typography)(({ theme, isLeft }) => ({
  fontSize: '0.75rem',
  marginTop: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  alignSelf: isLeft ? 'flex-start' : 'flex-end',
}));

const ChatBubble = ({ message, isLeft, time }) => {
  return (
    <Bubble isLeft={isLeft}>
      <MessageBox isLeft={isLeft}>
        <Typography variant="body1">{message}</Typography>
      </MessageBox>
      <TimeBox isLeft={isLeft}>{time}</TimeBox>
    </Bubble>
  );
};

export default ChatBubble;
