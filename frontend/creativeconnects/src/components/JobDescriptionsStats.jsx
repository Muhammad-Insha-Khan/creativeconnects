import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobDescriptionsStats = () => {
  const [jobCount, setJobCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/buyer/job-descriptions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.jobDescriptions) {
          setJobCount(res.data.jobDescriptions.length);
        } else {
          setError('Invalid response format');
        }
      } catch (err) {
        setError('Failed to load job descriptions');
      } finally {
        setLoading(false);
      }
    };

    fetchJobCount();
  }, []);

  if (loading) return <p>Loading job stats...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

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
          <div style={styles.statHeading}>Total Job Descriptions</div>
          <div style={styles.statNumber}>{jobCount}</div>
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
  },
  statCard: {
    margin: isMobile ? '10px auto' : '15px',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    textAlign: 'center',
    padding: isMobile ? '16px' : '20px',
    background: 'linear-gradient(145deg, #00796b, #004d40)',
    color: 'white',
    borderRadius: '15px',
    border: 'none',
    gap: isMobile ? '12px' : '20px',
    maxWidth: isMobile ? '100%' : '350px',
    width: isMobile ? '90%' : '350px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
    overflow: 'hidden',
    cursor: 'default',
  },
  statContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: isMobile ? 'center' : 'flex-start',
  },
  statIcon: {
    fontSize: isMobile ? '2.5em' : '3em',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '15px',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    flexShrink: 0,
  },
  statHeading: {
    fontSize: isMobile ? '1.1em' : '1.3em',
    fontWeight: 500,
    margin: '5px 0',
    letterSpacing: '1px',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: isMobile ? '1.5em' : '2em',
    fontWeight: 700,
    marginTop: '5px',
    color: '#ffeb3b',
    letterSpacing: '2px',
    textAlign: 'center',
  },
};

export default JobDescriptionsStats;
