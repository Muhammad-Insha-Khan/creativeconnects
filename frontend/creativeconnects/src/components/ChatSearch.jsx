import React, { useState } from 'react';
import axios from 'axios';
import "../styles/chatSearch.css"
const ChatSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [response, setResponse] = useState('');

  const handleSearch = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user?.role;

    try {
      const res = await axios.post('https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/chat-search', {
        query,
        role,
      });

      // Only show SkillSwappers if current role is SkillSwapper and result role is also SkillSwapper
      const filteredResults = role === 'SkillSwapper'
        ? res.data.results?.filter(r => r.role === 'SkillSwapper')
        : res.data.results || [];

      console.log('Filtered Search Results:', filteredResults);
      setResults(filteredResults);
      setResponse(res.data.message);
    } catch (err) {
      console.error('Error fetching data:', err);
      setResponse('Error occurred');
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  return (
    <div className="usersearch-wrapper">
      <div className="usersearch-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ai Based Search"
          className="usersearch-input"
        />
        <button onClick={handleSearch} className="usersearch-button">🔍</button>
      </div>
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{response}</p>

      {results.length > 0 && (
        <div className="usersearch-results">
          {results.map((item, index) => (
            <div
              key={item._id || index}
              className="usersearch-result-item"
            >
              {/* Buyer sees Sellers or SkillSwappers */}
              {role === 'Buyer' && item.firstName && (
                <>
                  <strong>Name:</strong> {item.firstName} {item.lastName || ''}<br />
                  <strong>Role:</strong> {item.role}<br />
                  <strong>Skills:</strong> {Array.isArray(item.skills) ? item.skills.join(', ') : item.skills}<br />
                  <strong>Domain:</strong> {item.fieldDomain || 'N/A'}<br />
                  <strong>Phone:</strong> {item.phone || 'N/A'}<br />
                  <strong>Email:</strong> {item.email || 'N/A'}<br />
                  <strong>Projects:</strong> {item.projectCount || 'N/A'}<br />
                  <strong>Rating:</strong> {item.rating || 'N/A'}<br />
                </>
              )}

              {/* Seller sees Project Proposals */}
              {role === 'Seller' && Array.isArray(item.projectProposals) && item.projectProposals.length > 0 && (
                <>
                  <strong>Proposals:</strong><br />
                  {item.projectProposals.map((proj, idx) => (
                    <div key={idx} style={{ marginLeft: '15px', marginBottom: '10px' }}>
                      <strong>Title:</strong> {proj.projectTitle}<br />
                      <strong>Skills:</strong> {proj.requiredSkills}<br />
                      <strong>Budget:</strong> {proj.minBudget} - {proj.maxBudget}<br />
                      <strong>Time:</strong> {proj.timeLimit} days<br />
                      <strong>Level:</strong> {proj.expertiseLevel}<br />
                      <strong>Description:</strong> {proj.projectDescription}<br />
                    </div>
                  ))}
                </>
              )}

              {/* Seller sees Job Descriptions */}
              {role === 'Seller' && Array.isArray(item.jobDescriptions) && item.jobDescriptions.length > 0 && (
                <>
                  <strong>Jobs:</strong><br />
                  {item.jobDescriptions.map((job, idx) => (
                    <div key={idx} style={{ marginLeft: '15px', marginBottom: '10px' }}>
                      <strong>Title:</strong> {job.jobTitle}<br />
                      <strong>Company:</strong> {job.companyName}<br />
                      <strong>Hours:</strong> {job.workingHours}<br />
                      <strong>Education:</strong> {job.educationalBackground}<br />
                      <strong>Skills:</strong> {job.skillsQualifications}<br />
                      <strong>Description:</strong> {job.jobDescription}<br />
                      <strong>Type:</strong> {job.jobType}<br />
                    </div>
                  ))}
                </>
              )}

              {/* SkillSwapper sees only other SkillSwappers */}
              {role === 'SkillSwapper' && item.role === 'SkillSwapper' && item.firstName && (
                <>
                  <strong>Name:</strong> {item.firstName} {item.lastName || ''}<br />
                  <strong>Domain:</strong> {item.fieldDomain || 'N/A'}<br />
                  <strong>Email:</strong> {item.email || 'N/A'}<br />
                  <strong>Phone:</strong> {item.phone || 'N/A'}<br />
                  <strong>ExpertiseHave: </strong> {item.expertiseHave || 'N/A'}<br />
                  <strong>ExpertiseLookingFor: </strong> {item.expertiseLookingFor || 'N/A'}<br />
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatSearch;
