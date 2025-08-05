import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Back button support
import axios from 'axios';
import '../styles/AllProjectProposals.css';
import SellerHeader from './SellerHeader';

const AllProjectProposals = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [sentProposals, setSentProposals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate(); // ✅ useNavigate for back

  let sellerId;
  try {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    sellerId = storedUser && (storedUser.id || storedUser._id);
  } catch {
    sellerId = null;
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/seller/signin/api/buyer/all-project-proposals', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setProjects(res.data.projectProposals);
        setFilteredProjects(res.data.projectProposals);
      })
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  const handleSendProposal = async (project) => {
    if (!sellerId) {
      alert('Seller ID not found. Please log in as a seller.');
      return;
    }

    if (sentProposals.includes(project._id)) return;

    try {
      await axios.post('http://localhost:5000/api/request/project-request', {
        projectId: project._id,
        buyerId: project.buyerId,
        sellerMessage: message,
        sellerId: sellerId,
      });

      setSentProposals(prev => [...prev, project._id]);
      setMessage('');
      setSelectedProject(null);
    } catch (error) {
      console.error('Error sending proposal:', error);
      alert('Error sending proposal');
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = projects.filter(project => {
      const title = project.projectTitle?.toLowerCase() || '';
      const buyer = project.buyerName?.toLowerCase() || '';
      const email = project.buyerEmail?.toLowerCase() || '';
      const skills = project.requiredSkills?.toLowerCase() || '';

      return (
        title.includes(term) ||
        buyer.includes(term) ||
        email.includes(term) ||
        skills.includes(term)
      );
    });

    setFilteredProjects(filtered);
  };

  return (
    <div className="AllProjectProposals-wrapper">
      {/* ✅ Back Button */}
      <button className="AllProjectProposals-back-btn" onClick={() => navigate(-1)}>⬅ Back</button>

      <h2 className="AllProjectProposals-title">Available Projects</h2>

      {/* ✅ Search Field */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by title, skills, or buyer..."
        className="AllProjectProposals-search"
      />

      {filteredProjects.length === 0 ? (
        <p className="AllProjectProposals-no-projects">No projects available.</p>
      ) : (
        filteredProjects.map(project => (
          <div key={project._id} className="AllProjectProposals-card">
            <h3 className="AllProjectProposals-header">{project.projectTitle}</h3>
            <p><strong>Buyer Name:</strong> {project.buyerName}</p>
            <p><strong>Buyer Email:</strong> {project.buyerEmail}</p>
            <p><strong>Skills:</strong> {project.requiredSkills}</p>
            <p><strong>Budget:</strong> ${project.minBudget} - ${project.maxBudget}</p>
            <p><strong>Time Limit:</strong> {project.timeLimit} weeks</p>
            <p><strong>Expertise:</strong> {project.expertiseLevel}</p>
            <p><strong>Description:</strong> {project.projectDescription}</p>

            {sentProposals.includes(project._id) ? (
              <div className="AllProjectProposals-sent-success">
                <div className="checkmark"></div>
                <span className="AllProjectProposals-sent-label">Proposal Sent</span>
              </div>
            ) : selectedProject === project._id ? (
              <div className="AllProjectProposals-box">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Write your proposal message"
                  className="AllProjectProposals-textarea"
                />
                <div className="AllProjectProposals-buttons">
                  <button className="AllProjectProposals-send-btn" onClick={() => handleSendProposal(project)}>Send</button>
                  <button className="AllProjectProposals-cancel-btn" onClick={() => setSelectedProject(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <button
                className="AllProjectProposals-proposal-btn"
                onClick={() => setSelectedProject(project._id)}
              >
                Send Proposal
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AllProjectProposals;
