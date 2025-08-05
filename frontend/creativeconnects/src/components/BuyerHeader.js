import React, { useState } from 'react';
import '../styles/Header.css';
import { FaCog, FaUser, FaBell, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import Clickabletext from './Clickabletext';
import Dropdown from './Dropdown';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AccountPopup from './AccountPopup';
import ChatSearch from "../components/ChatSearch"

const BuyerHeader = () => {
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const navigate = useNavigate();


  const handleReport = () => alert('Report clicked');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      confirmButtonColor: '#00796b',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/');
    });
  };

  const handleAgreement = () => {
    navigate('/Client-Contract');
  };

  const handleEditProfile = () => {
    setShowAccountPopup(false);
    navigate('/edit-profile-buyer');
  };
  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: 'Confirm Account Deletion',
      text: 'This action is irreversible. Enter your password to confirm:',
      input: 'password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Delete Account',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    });

    if (!result.isConfirmed || !result.value) return;

    const password = result.value.trim();
    const token = localStorage.getItem('token');

    const deleteEndpoints = [
      'https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/buyer/delete',
      // adjust endpoint if named differently
    ];

    try {
      let deleted = false;

      for (const url of deleteEndpoints) {
        const res = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ password })
        });

        const data = await res.json();

        if (res.ok) {
          deleted = true; // at least one account deleted
        }
      }

      if (deleted) {
        Swal.fire('Deleted!', 'Your account(s) have been deleted.', 'success');
        localStorage.clear();
        navigate('/');
      } else {
        Swal.fire('Error', 'Failed to delete any account. Please check password or try again.', 'error');
      }
    } catch (err) {
      console.error('DELETE ERROR:', err);
      Swal.fire('Error', 'Something went wrong on the server.', 'error');
    }
  };

  const settingsOptions = [
    { label: 'Logout', icon: FaSignOutAlt, onClick: handleLogout },
  ];

  return (
    <header className="header-wrapper">
      <div className="desktop-header">
        <div className="logo"></div>
        <div className="headersearch-bar">
          <ChatSearch />
        </div>
        <div className="actions">
          <Notification Icon={FaBell} text="Notifications" />
          <Clickabletext
            icon={FaUser}
            text="Account"
            onClick={() => setShowAccountPopup(true)}
          />
          <Clickabletext
            icon={FaUser}
            text="Chat"
            onClick={() => navigate('/Chat')}
          />
          <Dropdown icon={FaCog} text="" options={settingsOptions} />
        </div>
      </div>
      {/* ✅ Mobile Header */}
      <div className="header mobile-header">
        <div className="logo"></div>
        <div className="headersearch-bar">
          <ChatSearch />
        </div>
        <div className="mobile-dropdown">

          <Dropdown
            icon={FaCog}
            text=""
            options={[
              {
                label: <Notification Icon={FaBell} text="Notifications" />,
                onClick: () => { },
              },
              {
                label: (
                  <Clickabletext
                    icon={FaUser}
                    text="Account"
                    onClick={() => setShowAccountPopup(true)}
                  />
                ),
              },
              {
                label: (
                  <Clickabletext
                    icon={FaUser}
                    text="Chat"
                    onClick={() => navigate('/Chat')}
                  />
                ),
              },
              {
                label: 'Logout',
                icon: FaSignOutAlt,
                onClick: handleLogout,
              },
            ]}
          />
        </div>
      </div>

      {showAccountPopup && (
        <AccountPopup
          onClose={() => setShowAccountPopup(false)}
          onEdit={handleEditProfile}
          onDelete={handleDeleteAccount}
        />
      )}
    </header>
  );
};

export default BuyerHeader;
