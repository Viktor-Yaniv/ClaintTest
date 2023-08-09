import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatBox.css"; // Import your CSS file for styling
import { Spinner } from 'react-bootstrap';


const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const chatContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true); // Set loading state to true
    fetchUser();
    fetchMessages();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:5000/Header", {
          headers: { Authorization: token },
        });
        setUser(response.data.data);
      }
      setIsLoading(false); // Set loading state to false after fetching user
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsLoading(false); // Set loading state to false in case of an error
    }
  };

  const fetchMessages = async () => {
  try {
    const response = await axios.get("http://localhost:5000/chat");
    setMessages(response.data);
    setIsLoading(false); // Set loading state to false after fetching messages
  } catch (error) {
    console.error("Error fetching messages:", error);
    setIsLoading(false); // Set loading state to false in case of an error
  }
};

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("token");
      if (newMessage.trim() !== "") {
        const messageData = {
          content: newMessage,
          timestamp: new Date().toISOString(),
        };

        await axios.post("http://localhost:5000/chatbox", messageData, {
          headers: { Authorization: token },
        });
        setNewMessage("");
        fetchMessages(); // Fetch messages again after sending a new message
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', border: 'thick double #32a1ce' }}>

      {isLoading  ? (
          <div className="px-3">
          <div className="text-center" style={{padding:'30px'}}>
            <Spinner animation="border" variant="primary" role="status" />
            <div className="h3 text-primary mt-3">Loading...</div>
          </div>
        </div>)
      : user ? (
        <div className="all-chatBox">
        <h2>🗨 צ'אט</h2>

        <div className="chat-container" ref={chatContainerRef}>

          {messages.map((message, index) => (
            <div key={index} className="chat-message" style={{ direction: "rtl" }}>
              <div className="message-frame">
                <div className="author-info">
                  <img className="author-image" src={`http://localhost:5000/${message.author.image}`} alt="Profile" />
                  <a href={`/users/${message.author.id}`} className="message-user">{message.author.username}</a>
                </div>
                <span className="message-text">{message.message}</span>
                <span className="message-timestamp">{new Date(message.timestamp).toLocaleString('he-IL')}</span>
              </div>
            </div>
          ))}


        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="כתוב הודעה..."
          />
          <button onClick={handleSendMessage}>הגב</button>
        </div>
      </div>
      
       
      ) : (
        <div>Loading user information...</div>
      )}
    </div>
  );
};

export default ChatBox;
