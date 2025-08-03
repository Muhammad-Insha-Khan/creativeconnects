import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/ProjectProposalsList.css';

const ProjectProposalsList = () => {
  const [proposals, setProposals] = useState([]);
  const [visibleProposals, setVisibleProposals] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const listInnerRef = useRef();

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/buyer/project-proposals', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProposals(response.data.projectProposals);
        setVisibleProposals(response.data.projectProposals.slice(0, 1));
      } catch (err) {
        setError('Failed to load project proposals.');
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
    setVisibleProposals(proposals);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = proposals.filter((p) =>
      p.projectTitle.toLowerCase().includes(term.toLowerCase())
    );
    setVisibleProposals(filtered);
  };

  const handleScrollTop = () => {
    if (listInnerRef.current) {
      listInnerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) return <div className="proposalsloading">Loading project proposals...</div>;
  if (error) return <div className="proposalserror">{error}</div>;
  if (proposals.length === 0) return <div className="no-proposals">No project proposals found.</div>;

  return (
    <div className="proposals-container">
      <h2>My Project Proposals</h2>

      {/* Search bar shown only when "Show All" is active */}
      {showAll && (
        <input
          type="text"
          placeholder="Search proposals..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="proposalssearch-bar"
        />
      )}

      <div className="proposalsscrollable-list" ref={listInnerRef}>
        {visibleProposals.map((proposal, idx) => (
          <div key={idx} className="proposal-card">
            <h3>{proposal.projectTitle}</h3>
            <p><strong>Required Skills:</strong> {proposal.requiredSkills}</p>
            <p><strong>Budget:</strong> ${proposal.minBudget} - ${proposal.maxBudget}</p>
            <p><strong>Time Limit:</strong> {proposal.timeLimit} weeks</p>
            <p><strong>Expertise Level:</strong> {proposal.expertiseLevel}</p>
            <p><strong>Description:</strong> {proposal.projectDescription}</p>
            <p className="proposalsdate-submitted">
              Submitted on: {new Date(proposal.dateSubmitted).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="proposalsbutton-bar">
        {!showAll && proposals.length > 1 && (
          <button className="proposalsshow-all-btn" onClick={handleShowAll}>
            Show More
          </button>
        )}
        {showAll && (
          <>
            <button className="proposalsscroll-top-btn" onClick={handleScrollTop}>
              Scroll to Top
            </button>
            <button
              className="proposalsshow-all-btn"
              onClick={() => {
                setShowAll(false);
                setSearchTerm('');
                setVisibleProposals(proposals.slice(0, 1));
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

export default ProjectProposalsList;
