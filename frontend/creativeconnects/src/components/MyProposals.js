import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyProposals.css'; // Optional: Add your styles here

const MyProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  /** 
    useEffect(() => {
      const fetchProposals = async () => {
        try {
          const token = localStorage.getItem('token');
  
          const response = await axios.get('http://localhost:5000/api/buyer/my-proposals', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          setProposals(response.data.projectProposals);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching proposals:', error);
          setLoading(false);
        }
      };
  
      fetchProposals();
    }, []);
  
    if (loading) return <p>Loading proposals...</p>;
  */
  return (
    <div className="my-proposals">
      <h2>My Submitted Project Proposals</h2>
      {proposals.length !== 0 ? (
        <p>No proposals submitted yet.</p>
      ) : (
        <ul>
          {proposals.map((proposal, index) => (
            <li key={index} className="proposal-card">
              <h3>{proposal.projectTitle}</h3>
              <p><strong>Skills:</strong> {proposal.requiredSkills}</p>
              <p><strong>Budget:</strong> ${proposal.minBudget} - ${proposal.maxBudget}</p>
              <p><strong>Time Limit:</strong> {proposal.timeLimit} weeks</p>
              <p><strong>Level:</strong> {proposal.expertiseLevel}</p>
              <p><strong>Description:</strong> {proposal.projectDescription}</p>
              <p><strong>Submitted:</strong> {new Date(proposal.dateSubmitted).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProposals;
