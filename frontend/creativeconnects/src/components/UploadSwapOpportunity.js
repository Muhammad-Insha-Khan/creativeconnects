import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/UploadSwapOpportunity.css';

const skillOptions = [
  'Web Development',
  'Graphic Design',
  'Digital Marketing',
  'UI/UX Design',
  'Content Writing',
  'Video Editing',
  'Photography',
];

const UploadSwapOpportunity = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillOffering: '',
    skillSeeking: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const response = await axios.post(
        'http://localhost:5000/api/skillswapper/upload',
        formData,
        config
      );

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.data.message || 'Opportunity uploaded successfully',
        timer: 300000, // Show success alert briefly
        showConfirmButton: false,
      });

      setFormData({
        title: '',
        description: '',
        skillOffering: '',
        skillSeeking: '',
      });

      // Reload page after 50 milliseconds
      setTimeout(() => {
        window.location.reload();
      }, 50);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:
          error.response?.data?.message ||
          'Something went wrong while uploading the opportunity.',
      });
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-heading">Upload Skill Swap Opportunity</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Opportunity Title"
          value={formData.title}
          onChange={handleChange}
          className="upload-input"
        />

        <textarea
          name="description"
          placeholder="Opportunity Description"
          value={formData.description}
          onChange={handleChange}
          className="upload-textarea"
        ></textarea>

        <select
          name="skillOffering"
          value={formData.skillOffering}
          onChange={handleChange}
          className="upload-select"
        >
          <option value="">Select Skill You're Offering</option>
          {skillOptions.map((skill, index) => (
            <option key={index} value={skill}>{skill}</option>
          ))}
        </select>

        <select
          name="skillSeeking"
          value={formData.skillSeeking}
          onChange={handleChange}
          className="upload-select"
        >
          <option value="">Select Skill You're Looking For</option>
          {skillOptions.map((skill, index) => (
            <option key={index} value={skill}>{skill}</option>
          ))}
        </select>

        <button type="submit" className="upload-button">
          Submit Opportunity
        </button>
      </form>
    </div>
  );
};

export default UploadSwapOpportunity;