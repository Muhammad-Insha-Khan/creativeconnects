import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SwapperNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = user.id || user._id;

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUserId) return;
      try {
        const res = await axios.get(
          `https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/skillswapper/notifications?userId=${currentUserId}`
        );
        setNotifications(res.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    fetchNotifications();
  }, [currentUserId]);

  const handleDelete = (requestIndex) => {
    setNotifications(prev =>
      prev.filter((_, idx) => idx !== requestIndex)
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setShowPopup(!showPopup)} style={bellButtonStyle}>
        🔔
      </button>

      {showPopup && (
        <div style={popupStyle}>
          <button style={closeBtnStyle} onClick={() => setShowPopup(false)}>×</button>
          <h4 style={headerStyle}>📬 Notifications</h4>

          {notifications.length === 0 ? (
            <p style={emptyStyle}>No new requests.</p>
          ) : (
            notifications.map((req, index) => {
              // Safely handle null sender
              const sender = req.fromUserId || {};
              const firstName = sender.firstName || 'Unknown';
              const lastName = sender.lastName || '';

              return (
                <div key={index} style={notificationCardStyle}>
                  <p>
                    <strong>From:</strong> {firstName} {lastName}
                  </p>
                  <p>
                    <strong>Message:</strong> {req.message || '(no message)'}
                  </p>
                  <p style={smallDateStyle}>
                    <strong>On:</strong> {new Date(req.date).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleDelete(index)}
                    style={deleteBtnStyle}
                  >
                    Dismiss
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

// Styles
const bellButtonStyle = {
  backgroundColor: '#f9f9f9',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '18px'
};
const popupStyle = {
  position: 'absolute',
  top: '40px',
  right: '0',
  width: '320px',
  maxHeight: '420px',
  overflowY: 'auto',
  backgroundColor: '#fff',
  border: '2px solid #004d40',
  borderRadius: '10px',
  padding: '15px',
  boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
  zIndex: 1000
};
const closeBtnStyle = {
  position: 'absolute',
  top: '5px',
  right: '10px',
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  color: '#004d40'
};
const headerStyle = {
  marginBottom: '10px',
  color: '#00796b',
  textAlign: 'center'
};
const emptyStyle = {
  textAlign: 'center',
  color: '#999'
};
const notificationCardStyle = {
  backgroundColor: '#e0f2f1',
  padding: '10px',
  borderRadius: '8px',
  marginBottom: '10px',
  borderLeft: '4px solid #004d40',
  color: '#004d40'
};
const smallDateStyle = {
  fontSize: '12px',
  marginTop: '6px'
};
const deleteBtnStyle = {
  marginTop: '8px',
  padding: '4px 8px',
  backgroundColor: '#c62828',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '12px'
};

export default SwapperNotifications;
