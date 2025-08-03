import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SentProposalsList.css';

const SentProposalsList = () => {
  const [proposals, setProposals] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSentProposals = async () => {
      try {
        const token = localStorage.getItem('token');
        const seller = JSON.parse(localStorage.getItem('user'));
        const sellerId = seller?._id || seller?.id;

        const res = await axios.get(`http://localhost:5000/api/buyer/seller-proposals?sellerId=${sellerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setProposals(res.data.proposals);
        setFiltered(res.data.proposals);
      } catch (err) {
        console.error('Error fetching proposals:', err);
      }
    };

    fetchSentProposals();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFiltered(
      proposals.filter((p) =>
        p.projectTitle?.toLowerCase().includes(term) ||
        p.buyerName?.toLowerCase().includes(term) ||
        p.sellerMessage?.toLowerCase().includes(term)
      )
    );
  };

  const scrollToTop = () => {
    document.querySelector('.scrollable-list')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="proposals-container">
      <h2>📝 Search Proposals</h2>

      <input
        type="text"
        className="search-bar"
        placeholder="Search by project, buyer, or message..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="scrollable-list">
        {filtered.length === 0 ? (
          <p className="no-proposals">No proposals found.</p>
        ) : (
          <ol>
            {filtered.map((proposal, index) => (
              <li key={index} className="proposal-card">
                <h3>{proposal.projectTitle || 'Untitled Project'}</h3>
                <p><strong>Buyer:</strong> {proposal.buyerName}</p>
                <p><strong>Message:</strong> {proposal.sellerMessage}</p>
                <p className="date-submitted">
                  Sent On: {new Date(proposal.dateRequested).toLocaleString()}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="button-bar">
        <button className="scroll-top-btn" onClick={scrollToTop}>↑ Scroll to Top</button>
      </div>
    </div>
  );
};

export default SentProposalsList;
