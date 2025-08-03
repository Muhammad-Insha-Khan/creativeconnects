import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/OtherOpportunities.css';

const OtherOpportunities = () => {
  const [opps, setOpps] = useState([]);
  const [filteredOpps, setFilteredOpps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = user.id || user._id;

  useEffect(() => {
    const fetchOpps = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/skillswapper/others?currentUserId=${currentUserId}`
        );
        setOpps(res.data);
        setFilteredOpps(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) fetchOpps();
    else setLoading(false);
  }, [currentUserId]);

  const sendRequest = async (opp) => {
    try {
      await axios.post(
        'http://localhost:5000/api/skillswapper/request',
        {
          fromUserId: currentUserId,
          toUserId: opp.userId,
          opportunityId: opp.opportunityId,
          message: `Hi! I'm interested in "${opp.title}".`,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      Swal.fire({
        icon: 'success',
        title: 'Swap Request Sent',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response?.data?.message || 'Failed to send request',
      });
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = opps.filter((opp) => {
      const title = opp.title?.toLowerCase() || '';
      const offering = opp.skillOffering?.toLowerCase() || '';
      const seeking = opp.skillSeeking?.toLowerCase() || '';
      const userName = opp.userName?.toLowerCase() || '';
      const email = opp.email?.toLowerCase() || '';

      return (
        title.includes(term) ||
        offering.includes(term) ||
        seeking.includes(term) ||
        userName.includes(term) ||
        email.includes(term)
      );
    });

    setFilteredOpps(filtered);
  };

  const handleBack = () => {
    navigate(-1); // Go back
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="opportunity-container">
      <div className="opportunity-header">
        <button className="back-btn" onClick={handleBack}>← Back</button>
        <input
          type="text"
          placeholder="Search by title, skill, or user..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <h2>Other Users’ Opportunities</h2>

      {filteredOpps.length === 0 ? (
        <p className="no-results">No opportunities found</p>
      ) : (
        <div className="opportunity-list">
          {filteredOpps.map((opp) => (
            <div
              key={`${opp.userId}_${opp.opportunityId}`}
              className="opportunity-card"
            >
              <h3>{opp.title}</h3>
              <p><strong>By:</strong> {opp.userName} ({opp.email})</p>
              <p><strong>Offering:</strong> {opp.skillOffering}</p>
              <p><strong>Seeking:</strong> {opp.skillSeeking}</p>
              <p>{opp.description}</p>
              <p className="posted-date">
                Posted: {new Date(opp.dateSubmitted).toLocaleDateString()}
              </p>
              <div className="button-bar">
                <button
                  className="request-btn"
                  onClick={() => sendRequest(opp)}
                >
                  Request Swap
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OtherOpportunities;