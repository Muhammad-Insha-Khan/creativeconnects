import React, { useState } from 'react';
import '../styles/Ongoingproject.css';

const OngoingProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'Project A',
      time: '3 months',
      budget: '$5000',
      freelancer: 'John Doe',
      details: 'This project involves developing a complete e-commerce website for a client.',
    },
    {
      id: 2,
      name: 'Project B',
      time: '6 months',
      budget: '$12000',
      freelancer: 'Jane Smith',
      details: 'This project is focused on building a CRM system with complex features.',
    },
    {
      id: 3,
      name: 'Project C',
      time: '1 month',
      budget: '$2000',
      freelancer: 'Sam Wilson',
      details: 'A simple landing page design for a tech startup.',
    },
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="projects-container">
      <h2 className="projects-heading">Ongoing Projects</h2>
      <div className="projects-list">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <h3 className="project-name">{project.name}</h3>
            <button className="more-details-btn" onClick={() => handleProjectClick(project)}>
              More Details
            </button>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedProject.name}</h2>
            <p><strong>Time:</strong> {selectedProject.time}</p>
            <p><strong>Budget:</strong> {selectedProject.budget}</p>
            <p><strong>Freelancer:</strong> {selectedProject.freelancer}</p>
            <p><strong>Details:</strong> {selectedProject.details}</p>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OngoingProjects;
