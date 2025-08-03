import React, { useEffect, useState } from 'react';

const OnlineDuration = () => {
  const [activeTime, setActiveTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) return `${hrs} hr ${mins} min`;
    if (mins > 0) return `${mins} min ${secs} sec`;
    return `${secs} sec`;
  };

  return (
    <div style={styles.stat}>
      <div
        style={styles.statCard}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
          e.currentTarget.style.background = 'linear-gradient(145deg, #004d40, #00796b)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.background = 'linear-gradient(145deg, #00796b, #004d40)';
        }}
      >
        <div style={styles.statIcon}>⏱️</div>
        <div style={styles.statContent}>
          <div style={styles.statHeading}>Online Duration</div>
          <div style={styles.statNumber}>{formatTime(activeTime)}</div>
        </div>
      </div>
    </div>
  );
};

const isMobile = window.innerWidth <= 768;

const styles = {
  stat: {
    display: 'flex',
    justifyContent: isMobile ? 'center' : 'flex-end',
    flexWrap: isMobile ? 'wrap' : 'nowrap',
  },
  statCard: {
    margin: isMobile ? '10px auto' : '15px',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    padding: isMobile ? '16px' : '20px',
    background: 'linear-gradient(145deg, #00796b, #004d40)',
    color: 'white',
    borderRadius: '15px',
    border: 'none',
    gap: '20px',
    width: isMobile ? '90%' : '350px',
    maxWidth: '100%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
    overflow: 'hidden',
    cursor: 'default',
    textAlign: 'center', // center all text
  },
  statContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: isMobile ? '2em' : '2.8em',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '14px',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    flexShrink: 0,
  },
  statHeading: {
    fontSize: isMobile ? '1em' : '1.2em',
    fontWeight: 500,
    margin: '5px 0',
    letterSpacing: '1px',
  },
  statNumber: {
    fontSize: isMobile ? '1.4em' : '1.7em',
    fontWeight: 700,
    marginTop: '5px',
    color: '#ffeb3b',
    letterSpacing: '2px',
  },
};

export default OnlineDuration;
