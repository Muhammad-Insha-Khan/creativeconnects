// components/Notification.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const handleDelete = async (requestId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const buyerId = user?._id || user?.id;
    const token = localStorage.getItem('token');

    try {
      await axios.delete(
        `https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/buyer/project-requests/${buyerId}/${requestId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setNotifications(prev =>
        prev.filter(notification => notification._id !== requestId)
      );
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const buyerId = user?._id || user?.id;

        if (!buyerId) return;

        const res = await axios.get(`https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/buyer/project-requests?buyerId=${buyerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setNotifications(res.data.projectRequests);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();
  }, []);

  const dynamicPopupStyle = isMobile
    ? {
      ...popupStyle,
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      borderRadius: '0',
      padding: '20px',
      zIndex: 9999,
      overflowY: 'scroll'
    }
    : popupStyle;

  return (
    <div style={{ position: 'relative', zIndex: 1000 }}>
      <button
        onClick={() => setShowPopup(!showPopup)}
        style={bellButtonStyle}
      >
        🔔
      </button>

      {showPopup && (
        <div style={dynamicPopupStyle}>
          <button style={closeBtnStyle} onClick={() => setShowPopup(false)}>×</button>
          <h4 style={headerStyle}>📬 Notifications</h4>

          {notifications.length === 0 ? (
            <p style={emptyStyle}>No new proposals.</p>
          ) : (
            notifications.map((req, index) => (
              <div key={index} style={notificationCardStyle}>
                <p><strong>Project:</strong> {req.projectTitle || 'N/A'}</p>
                <p><strong>From:</strong> {req.sellerName}</p>
                <p><strong>Msg:</strong> {req.sellerMessage}</p>
                <p><strong>On:</strong> {new Date(req.dateRequested).toLocaleString()}</p>
                <button
                  onClick={() => handleDelete(req._id)}
                  style={deleteBtnStyle}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// Styles
const bellButtonStyle = {
  backgroundColor: '#f8f9fa',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '18px',
  zIndex: 1001
};

const popupStyle = {
  position: 'absolute',
  top: '40px',
  right: '0',
  width: '300px',
  maxHeight: '400px',
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
  top: '10px',
  right: '15px',
  background: 'none',
  border: 'none',
  fontSize: '22px',
  cursor: 'pointer',
  color: '#004d40',
  zIndex: 1001
};

const headerStyle = {
  marginBottom: '15px',
  color: '#00796b',
  textAlign: 'center',
  fontSize: '18px'
};

const emptyStyle = {
  textAlign: 'center',
  color: '#999',
  marginTop: '20px'
};

const notificationCardStyle = {
  backgroundColor: '#e0f2f1',
  padding: '12px',
  borderRadius: '8px',
  marginBottom: '12px',
  borderLeft: '4px solid #004d40',
  color: '#004d40'
};

const deleteBtnStyle = {
  marginTop: '5px',
  padding: '5px 10px',
  backgroundColor: '#c62828',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '12px'
};

export default Notification;
