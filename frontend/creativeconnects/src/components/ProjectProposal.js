import React, { useState } from 'react';
import InputField from './InputField';
import '../styles/ProjectProposal.css';
import Button from '../components/Botton';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProjectProposal = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [expertiseLevel, setExpertiseLevel] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!projectTitle) newErrors.projectTitle = 'Please enter project title';
    if (!requiredSkills) newErrors.requiredSkills = 'Please enter required skills';
    if (!minBudget) newErrors.minBudget = 'Please enter minimum budget';
    if (!maxBudget) newErrors.maxBudget = 'Please enter maximum budget';
    if (!timeLimit) newErrors.timeLimit = 'Please enter time limit';
    if (!expertiseLevel) newErrors.expertiseLevel = 'Please select expertise level';
    if (!projectDescription) newErrors.projectDescription = 'Please enter project description';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill all required fields.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    const projectData = {
      projectTitle,
      requiredSkills,
      minBudget,
      maxBudget,
      timeLimit,
      expertiseLevel,
      projectDescription
    };

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/buyer/submit-proposal',
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Swal.fire({
        title: 'Success!',
        text: response.data.message || 'Project proposal submitted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // After user clicks "OK", wait 0.5 seconds and reload
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });

      // Clear form
      setProjectTitle('');
      setRequiredSkills('');
      setMinBudget('');
      setMaxBudget('');
      setTimeLimit('');
      setExpertiseLevel('');
      setProjectDescription('');
      setErrors({})
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Server Error!',
        text: 'An error occurred, please try again later.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  return (
    <div className="projectProposal-container">
      <h2 className="PROJECTINFORMATIONHeading">PROJECT INFORMATION </h2>
      <form onSubmit={handleSubmit}>
        <div className="projectProposal-info">
          <div>
            <InputField
              type="text"
              placeholder="Project Title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            {errors.projectTitle && <p className="error-text">{errors.projectTitle}</p>}
          </div>
          <div>
            <InputField
              type="text"
              placeholder="Required Skills/Technologies"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
            />
            {errors.requiredSkills && <p className="error-text">{errors.requiredSkills}</p>}
          </div>
        </div>

        <div className="projectProposal-info">
          <div>
            <InputField
              type="number"
              placeholder="MIN Budget $"
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value)}
            />
            {errors.minBudget && <p className="error-text">{errors.minBudget}</p>}
          </div>
          <div>
            <InputField
              type="number"
              placeholder="MAX Budget $"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
            />
            {errors.maxBudget && <p className="error-text">{errors.maxBudget}</p>}
          </div>
        </div>

        <div className="projectProposal-info">
          <div>
            <InputField
              type="number"
              placeholder="Time Limit (Weeks)"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
            {errors.timeLimit && <p className="error-text">{errors.timeLimit}</p>}
          </div>
          <div>
            <select
              className="projectProposal-dropdown"
              value={expertiseLevel}
              onChange={(e) => setExpertiseLevel(e.target.value)}
            >
              <option value="">Select Expertise Level</option>
              <option value="entry">Entry-level</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
            {errors.expertiseLevel && <p className="error-text">{errors.expertiseLevel}</p>}
          </div>
        </div>

        <div>
          <textarea
            className="projectProposal-textarea"
            placeholder="Enter Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          ></textarea>
          {errors.projectDescription && <p className="error-text">{errors.projectDescription}</p>}
        </div>

        <div className="projectProposal-button">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectProposal;
