import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/SwapOpportunitiesList.css';

const SwapOpportunitiesList = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [visibleOpportunities, setVisibleOpportunities] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const listRef = useRef();

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/skillswapper/opportunities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOpportunities(response.data);
        setVisibleOpportunities(response.data.slice(0, 1));
      } catch (err) {
        setError('Failed to load skill swap opportunities.');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
    setVisibleOpportunities(opportunities);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = opportunities.filter((o) =>
      o.title.toLowerCase().includes(term.toLowerCase())
    );
    setVisibleOpportunities(filtered);
  };

  const handleScrollTop = () => {
    listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="loading">Loading opportunities...</div>;
  if (error) return <div className="error">{error}</div>;
  if (opportunities.length === 0) return <div className="no-data">No opportunities posted yet.</div>;

  return (
    <div className="swap-list-container">
      <h2 className="swap-title">All Skill Swap Opportunities</h2>

      {showAll && (
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="swap-search"
        />
      )}

      <div className="swap-scrollable" ref={listRef}>
        {visibleOpportunities.map((opp, idx) => (
          <div key={idx} className="swap-card">
            <h3>{opp.title}</h3>
            <p><strong>Posted By:</strong> {opp.name}</p>
            <p><strong>Description:</strong> {opp.description}</p>
            <p><strong>Offering:</strong> {opp.skillOffering}</p>
            <p><strong>Seeking:</strong> {opp.skillSeeking}</p>
            <p className="date-submitted">
              Submitted on: {new Date(opp.dateSubmitted).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="swap-buttons">
        {!showAll && opportunities.length > 1 && (
          <button className="swap-btn" onClick={handleShowAll}>Show All</button>
        )}
        {showAll && (
          <>
            <button className="swap-btn" onClick={handleScrollTop}>Scroll to Top</button>
            <button
              className="swap-btn"
              onClick={() => {
                setShowAll(false);
                setSearchTerm('');
                setVisibleOpportunities(opportunities.slice(0, 1));
              }}
            >
              Show Less
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SwapOpportunitiesList;
