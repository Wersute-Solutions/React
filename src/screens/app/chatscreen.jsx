import React, { useState, useEffect, useRef } from 'react';
import { Backdrop, CircularProgress, TextField, Button, } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AppBarCus from '../../components/appbar_custom';
import DrawerCus from '../../components/drawer_custom_freelancer';
import ChatBubble from '../../components/chat_bubble';
import { createChatRoom } from '../../api/chat';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Chat() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const { clientId, freelancerId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const initializeChat = async () => {
      try {
        setIsLoading(true);
        const chatroom = await createChatRoom(clientId, freelancerId);
        console.log("Chatroom created:", chatroom);
        const jwtToken = localStorage.getItem("accessToken");
        socketRef.current = new WebSocket(`wss://api-v1.wersute.com/ws/chat/${chatroom.id}/?token=${jwtToken}`);0

        socketRef.current.onopen = () => {
          console.log('WebSocket connection established');
          setIsWebSocketOpen(true);
          socketRef.current.send(JSON.stringify({ type: 'query_history' }));
        };

        socketRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'chat_history') {
            const historyMessages = JSON.parse(data.messages);
            const formattedMessages = historyMessages.map(msg => ({
              message: msg.content,
              user: msg.user,
              time: new Date(msg.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true, month: 'short', day: 'numeric' }),
              isLeft: msg.user !== user.user_id,
              timestamp: msg.timestamp,
            }));
            setMessages(formattedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
          } else {
            const newMsg = data.message;
            const formattedMessage = {
              message: newMsg,
              user: data.user,
              time: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true, month: 'short', day: 'numeric' }),
              isLeft: data.user !== user.username,
              timestamp: Date(),
            };
            setMessages(prevMessages => {
              const updatedMessages = [...prevMessages, formattedMessage];
              return updatedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            });
          }
        };

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to create chatroom:", error);
        setIsLoading(false);
      }
    };

    initializeChat();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [clientId, freelancerId, user.username]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "" && isWebSocketOpen) {
      const messageData = {
        type: 'chat_message',
        message: newMessage,
        timestamp: new Date().toISOString(),
      };
      socketRef.current.send(JSON.stringify(messageData));
      setNewMessage("");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <AppBarCus onMenuIconClick={toggleMenu} showMenuIcon fixed />
      <DrawerCus open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          marginLeft: isMobile? "0px": "100px"
        }}
      >
        {isLoading ? (
          <Backdrop open={isLoading}>
            <CircularProgress color="primary" />
          </Backdrop>
        ) : (
          <>
            <div style={{
              flex: 1,
              overflowY: "auto",
              marginTop: "130px",
              marginBottom: "60px"
            }}>
              {messages.map((msg, index) => (
                <ChatBubble key={index} message={msg.message} isLeft={msg.isLeft} time={msg.time} />
              ))}
              <div ref={messagesEndRef} />
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
                style={{ marginLeft: isMobile? "0px": "110px" }}
              />
              {isMobile && <Button type="submit" variant="contained" color="primary" style={{ flexShrink: 0, marginLeft:"10px" }}>
                Send
              </Button>}
            </form>
          </>
        )}
      </div>
    </>
  );
}
