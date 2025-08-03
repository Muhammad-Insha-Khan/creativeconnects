import '../styles/ChatMessage.css';
import React, { useEffect, useState } from 'react';
import Chat from "../components/Chat";

const ChatMessage = () => {
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("🔍 Raw userData from localStorage:", userData);
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log("🔍 Parsed user object:", user);
        if (user?.id) {
          setCurrentUserId(user.id);
          console.log("✅ Found user ID:", user.id);
        } else {
          console.warn("⚠️ User object does not contain id:", user);
        }
      } catch (e) {
        console.error("❌ Failed to parse user from localStorage:", e);
      }
    } else {
      console.warn("⚠️ No user found in localStorage.");
    }
  }, []);
  return (
    <div>
      {currentUserId ? (
        <Chat currentUserId={currentUserId} />
      ) : (
        <p>Loading chat... (user not logged in?)</p>
      )}
    </div>
  );
};
export default ChatMessage;
