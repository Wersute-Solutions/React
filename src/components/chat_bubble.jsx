import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Bubble = styled(Box)(({ theme, isleft }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: isleft ? 'flex-start' : 'flex-end',
  marginBottom: theme.spacing(2),
}));

const MessageBox = styled(Box)(({ theme, isleft }) => ({
  maxWidth: '60%',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isleft ? theme.palette.grey[300] : theme.palette.primary.main,
  color: isleft ? theme.palette.text.primary : theme.palette.common.white,
  textAlign: 'left',
}));

const TimeBox = styled(Typography)(({ theme, isleft }) => ({
  fontSize: '0.75rem',
  marginTop: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  alignSelf: isleft ? 'flex-start' : 'flex-end',
}));

const ChatBubble = ({ message, isleft, time }) => {
  return (
    <Bubble isleft={isleft}>
      <MessageBox isleft={isleft}>
        <Typography variant="body1">{message}</Typography>
      </MessageBox>
      <TimeBox isleft={isleft}>{time}</TimeBox>
    </Bubble>
  );
};

export default ChatBubble;
