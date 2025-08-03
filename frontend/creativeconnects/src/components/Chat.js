import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import axios from "axios";
import "../styles/ChatMessage.css";
import classNames from "classnames";
import { useNavigate } from 'react-router-dom';

export default function Chat({ currentUserId }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        console.log("Fetched users:", res.data);
        setUsers(res.data); // No filter
        setFilteredUsers(res.data);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };

    fetchUsers();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Is socket connected?", socket.connected);

    socket.on("connect", () => {
      console.log("✅ Socket connected successfully");
      // ✅ Join room on connect
      if (currentUserId) {
        socket.emit("joinRoom", currentUserId);
        console.log("🔔 Joined room after connect:", currentUserId);
      }
    });

    // ✅ Also join room immediately (in case already connected)
    if (currentUserId && socket.connected) {
      socket.emit("joinRoom", currentUserId);
      console.log("🔔 Joined room immediately:", currentUserId);
    }
  }, [currentUserId]);

  // Load messages when selecting user
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/messages/${currentUserId}/${selectedUser._id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();

    const handleReceiveMessage = (msg) => {
      console.log("📩 Received message:", msg);
      if (msg.senderId === selectedUser._id || msg.receiverId === selectedUser._id) {
        setMessages(prev => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [selectedUser, currentUserId]);

  // Send message
  const sendMessage = () => {
    if (!input.trim() || !selectedUser) return;

    const newMessage = {
      senderId: currentUserId,
      receiverId: selectedUser._id,
      message: input
    };
    console.log("📤 Sending message:", newMessage);
    socket.emit("sendMessage", newMessage);

    setMessages(prev => [
      ...prev,
      {
        ...newMessage,
        messageOriginal: input,
        messageTranslated: input,
        timestamp: new Date()
      }
    ]);
    setInput("");
  };
  const handleBack = () => {
    navigate(-1); // Go back
  };
  // Search handler
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };
  const isMobile = window.innerWidth <= 768;
  return (
    <div className="chat-container">
      {/* Sidebar */}
      {(!selectedUser || !isMobile) && (
        <div className="sidebar" style={{ display: selectedUser ? 'none' : 'block' }}>
          <h3 className="sidebar-title">Search Users</h3>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />

          <ul className="contact-list">
            {searchTerm && filteredUsers.map(user => (
              <li
                key={user._id}
                className={classNames("contact-item", {
                  active: selectedUser && user._id === selectedUser._id
                })}
                onClick={() => setSelectedUser(user)}
              >
                <img src={user.profilePic} alt={user.name} className="avatar" />
                <div className="contact-info">
                  <strong>{user.name}</strong><br />
                  <small>{user.role}</small>
                </div>
              </li>
            ))}
          </ul>
          <button className="chatback-btn" onClick={handleBack}>← Back</button>

        </div>)}


      {/* Chat Area */}
      <div className="chat-area">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <div className="user-info">
                <img src={selectedUser.profilePic} alt={selectedUser.name} className="avatar" />
                <strong>{selectedUser.name}</strong>
              </div>
              <div className="translate-toggle top-right">
                <label>
                  <input
                    type="checkbox"
                    checked={autoTranslate}
                    onChange={() => setAutoTranslate(!autoTranslate)}
                  />
                  Auto Translate
                </label>
                <button className="chatback-btn" onClick={handleBack}>← Back</button>
              </div>
            </div>

            <div className="messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={classNames("message", {
                    "sent": msg.senderId === currentUserId,
                    "received": msg.senderId !== currentUserId
                  })}
                >
                  {autoTranslate ? msg.messageTranslated : msg.messageOriginal}
                </div>
              ))}
            </div>

            <div className="input-area">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="placeholder">Search and select a user to start chatting.</div>

        )}
      </div>
    </div>
  );
}
