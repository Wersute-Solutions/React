import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Backdrop, CircularProgress, TextField, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import AppBarCus from '../../components/appbar_custom';
import DrawerCus from '../../components/drawer_custom_freelancer';
import ChatBubble from '../../components/chat_bubble';

export default function Chat() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const socketRef = useRef(null);

  useEffect(() => {
    // Replace with your WebSocket URL and token
    const roomId = 1;
    const jwtToken = 'your-jwt-token';
    const username = 'your-username'; // Replace with the actual username

    socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${roomId}/?token=${jwtToken}`);

    socketRef.current.onopen = () => {
      // Request chat history once the connection is established
      socketRef.current.send(JSON.stringify({ type: "query_history" }));
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "chat_message") {
        setMessages((prevMessages) => [
          ...prevMessages, 
          { message: data.message, isLeft: data.user !== username, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      } else if (data.type === "chat_history") {
        const chatHistory = JSON.parse(data.messages);
        setMessages(chatHistory.map(msg => ({
          message: msg.content,
          isLeft: msg.user !== username,
          time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })));
      }
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket closed');
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const messageData = { message: newMessage, user: 'your-username', time: currentTime };
      socketRef.current.send(JSON.stringify({ message: newMessage }));
      setMessages([...messages, { ...messageData, isLeft: false }]);
      setNewMessage("");
    }
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <>
      <AppBarCus onMenuIconClick={toggleMenu} showMenuIcon fixed/>
      <DrawerCus open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {isLoading ? (
          <Backdrop open={isLoading}>
            <CircularProgress color="primary" />
          </Backdrop>
        ) : (
          <>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              marginBottom: "20px",
              position: "fixed",
              top: "64px",  
              left: 0,
              width: "100%",
              backgroundColor: "#f0f0f0",
              zIndex: 1,
              padding: "10px 20px",
              borderBottom: "1px solid #ddd",
              boxSizing: "border-box"
            }}>
              <IconButton onClick={handleBackClick}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" style={{ marginLeft: "10px", fontWeight: "bold" }} >
                Chat with John Doe
              </Typography>
            </div>

            <div style={{ 
              flex: 1, 
              overflowY: "auto", 
              marginTop: "130px",
              marginBottom: "60px" 
            }}>
              {messages.map((msg, index) => (
                <ChatBubble key={index} message={msg.message} isLeft={msg.isLeft} time={msg.time} />
              ))}
            </div>

            <form
              onSubmit={handleSendMessage}
              style={{
                display: "flex",
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: "10px",
                backgroundColor: "#fff",
                borderTop: "1px solid #ddd",
                boxSizing: "border-box",
              }}
            >
              <TextField
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                variant="outlined"
                fullWidth
                style={{ marginRight: "10px" }}
              />
              <Button type="submit" variant="contained" color="primary" style={{ flexShrink: 0 }}>
                Send
              </Button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
