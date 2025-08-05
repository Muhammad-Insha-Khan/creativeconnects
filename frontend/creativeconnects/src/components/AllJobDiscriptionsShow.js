import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AllJobDiscriptionsShow.css'; // custom CSS

const AllJobDiscriptionsShow = () => {
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDescriptions = async () => {
      try {
        const response = await axios.get('https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/seller/signin/api/jobs/all-job-descriptions');
        setJobDescriptions(response.data.jobDescriptions || []);
      } catch (error) {
        console.error('Error fetching job descriptions:', error);
      }
    };

    fetchJobDescriptions();
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobDescriptions.filter(job =>
    job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skillsQualifications?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="AllJobDescriptions-wrapper">
      <button className="AllJobDescriptions-back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      <h2 className="AllJobDescriptions-title">All Job Descriptions</h2>

      <input
        type="text"
        placeholder="Search by title, company, or skills..."
        className="AllJobDescriptions-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredJobs.length === 0 ? (
        <p className="AllJobDescriptions-no-data">No job descriptions found.</p>
      ) : (
        filteredJobs.map((job, index) => (
          <div key={index} className="AllJobDescriptions-card">
            <div className="AllJobDescriptions-details">
              <p><strong>Job Title:</strong> {job.jobTitle}</p>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Working Hours:</strong> {job.workingHours}</p>
              <p><strong>Education:</strong> {job.educationalBackground}</p>
              <p><strong>Skills:</strong> {job.skillsQualifications}</p>
              <p><strong>Type:</strong> {job.jobType}</p>
              <p><strong>Description:</strong> {job.jobDescription}</p>
              <p><strong>Posted On:</strong> {new Date(job.datePosted).toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllJobDiscriptionsShow;
