import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadedSwapsStats = () => {
  const [uploadCount, setUploadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUploadedSwaps = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?._id || user?.id;

        if (!userId) {
          setError('User ID not found');
          setLoading(false);
          return;
        }

        const res = await axios.get(`https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/skillswapper/count?userId=${userId}`);

        if (res.data && typeof res.data.count === 'number') {
          setUploadCount(res.data.count);
        } else {
          setError('Invalid response from server');
        }
      } catch (err) {
        console.error('Error fetching upload count:', err);
        setError('Failed to load uploaded swaps count');
      } finally {
        setLoading(false);
      }
    };

    fetchUploadedSwaps();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading uploaded swaps...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

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
        <div style={styles.statIcon}></div>
        <div style={styles.statContent}>
          <div style={styles.statHeading}>Swaps Uploaded</div>
          <div style={styles.statNumber}>{uploadCount}</div>
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


export default UploadedSwapsStats;
