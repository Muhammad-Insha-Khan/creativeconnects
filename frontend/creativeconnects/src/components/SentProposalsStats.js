import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SentProposalsStats = () => {
  const [proposalCount, setProposalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSentProposalsCount = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const sellerId = user?._id || user?.id;

        if (!sellerId) {
          setError('Seller ID not found');
          setLoading(false);
          return;
        }

        const res = await axios.get(`https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/seller/sent-proposals-count?sellerId=${sellerId}`);

        if (res.data && typeof res.data.count === 'number') {
          setProposalCount(res.data.count);
        } else {
          setError('Invalid response from server');
        }
      } catch (err) {
        console.error('Error fetching sent proposals count:', err);
        setError('Failed to load sent proposals count');
      } finally {
        setLoading(false);
      }
    };

    fetchSentProposalsCount();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading proposal stats...</p>;
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
          <div style={styles.statHeading}>Total Proposals Sent</div>
          <div style={styles.statNumber}>{proposalCount}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  stat: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  statCard: {
    margin: '15px',
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    background: 'linear-gradient(145deg, #00796b, #004d40)',
    color: 'white',
    borderRadius: '15px',
    border: 'none',
    gap: '20px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
    overflow: 'hidden',
    cursor: 'default',
  },
  statContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  statIcon: {
    fontSize: '2.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '18px',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    flexShrink: 0,
  },
  statHeading: {
    fontSize: '1.3rem',
    fontWeight: 600,
    margin: '5px 0',
    letterSpacing: '1px',
  },
  statNumber: {
    fontSize: '2.3rem',
    fontWeight: 800,
    marginTop: '5px',
    color: '#ffeb3b',
    letterSpacing: '2px',
  },
};

export default SentProposalsStats;
