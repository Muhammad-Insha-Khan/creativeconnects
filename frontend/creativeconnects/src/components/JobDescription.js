import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/JobDescription.css';
import InputField from './InputField';
import Button from '../components/Botton';

const JobDescription = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [educationalBackground, setEducationalBackground] = useState('');
  const [skillsQualifications, setSkillsQualifications] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobType, setJobType] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!jobTitle) newErrors.jobTitle = 'Please enter job title';
    if (!workingHours) newErrors.workingHours = 'Please enter working hours';
    if (!companyName) newErrors.companyName = 'Please enter company name';
    if (!educationalBackground) newErrors.educationalBackground = 'Please enter education';
    if (!skillsQualifications) newErrors.skillsQualifications = 'Please enter skills';
    if (!jobDescription) newErrors.jobDescription = 'Please enter description';
    if (!jobType) newErrors.jobType = 'Please select job type';
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

    const jobData = {
      jobTitle,
      workingHours,
      companyName,
      educationalBackground,
      skillsQualifications,
      jobDescription,
      jobType
    };

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/buyer/add-job-description', jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      Swal.fire({
        title: 'Success!',
        text: response.data.message || 'Job description submitted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
  // After user clicks "OK", wait 0.5 seconds and reload
  setTimeout(() => {
    window.location.reload();
  }, 100);
});

      // Reset form
      setJobTitle('');
      setWorkingHours('');
      setCompanyName('');
      setEducationalBackground('');
      setSkillsQualifications('');
      setJobDescription('');
      setJobType('');
      setErrors({});
    } catch (error) {
      console.error('Error submitting job description:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  return (
    <div className="addJobDescription-container">
      <h2>Submit Job Description</h2>
      <form onSubmit={handleSubmit}>
        <div className="addJobDescription-info">
          <div>
            <InputField
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            {errors.jobTitle && <p className="error-text">{errors.jobTitle}</p>}
          </div>
          <div>
            <InputField
              type="text"
              placeholder="Working Hours"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
            />
            {errors.workingHours && <p className="error-text">{errors.workingHours}</p>}
          </div>
        </div>

        <div className="addJobDescription-info">
          <div>
            <InputField
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            {errors.companyName && <p className="error-text">{errors.companyName}</p>}
          </div>
          <div>
            <InputField
              type="text"
              placeholder="Educational Background"
              value={educationalBackground}
              onChange={(e) => setEducationalBackground(e.target.value)}
            />
            {errors.educationalBackground && <p className="error-text">{errors.educationalBackground}</p>}
          </div>
        </div>

        <div className="addJobDescription-info">
          <div>
            <InputField
              type="text"
              placeholder="Skills & Qualifications"
              value={skillsQualifications}
              onChange={(e) => setSkillsQualifications(e.target.value)}
            />
            {errors.skillsQualifications && <p className="error-text">{errors.skillsQualifications}</p>}
          </div>
          <div>
            <select
              className="addJobDescription-dropdown"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">Select Job Type</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-Site</option>
            </select>
            {errors.jobType && <p className="error-text">{errors.jobType}</p>}
          </div>
        </div>

        <div>
          <textarea
            className="addJobDescription-textarea"
            placeholder="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          {errors.jobDescription && <p className="error-text">{errors.jobDescription}</p>}
        </div>

        <div className="addJobDescription-button">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default JobDescription;
