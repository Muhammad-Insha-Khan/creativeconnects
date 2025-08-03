import React, { useEffect, useState } from 'react';
import Signin from '../components/Sign';
import '../styles/WelcomePage.css';

const WelcomePage = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [showWelcomeText, setShowWelcomeText] = useState(true);

  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowWelcomeText(false); // Hide the welcome text after 5 seconds
    }, 1500);

    const signinTimer = setTimeout(() => {
      setShowSignin(true); // Show signin form after 5 seconds
    }, 1500);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(signinTimer);
    };
  }, []);

  return (
    <div className='welcome'>
      {showWelcomeText && !showSignin ? (
        <div className="welcome-section">
          <h1>Welcome to <span>Creative Connect</span></h1>
          <p>Your go-to platform for freelancing opportunities and creative collaborations.</p>
        </div>
      ) : (
        <Signin />
      )}
    </div>
  );
};

export default WelcomePage;
