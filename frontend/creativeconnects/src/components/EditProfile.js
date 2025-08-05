import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../styles/EditProfile.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  // ✅ Load user data from backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch('https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/buyer/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setFormData((prev) => ({
            ...prev,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phone: data.phone || '',
          }));
        } else {
          Swal.fire('Error', data.message || 'Failed to load profile.', 'error');
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Server error while loading profile.', 'error');
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone } = formData;
    if (!firstName || !lastName || !email || !phone) {
      Swal.fire('Error', 'All fields are required.', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire('Unauthorized', 'Please log in.', 'warning');
        return;
      }

      const res = await fetch('http://localhost:5000/api/buyer/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          title: 'Success',
          text: 'Profile updated. Logging you out...',
          icon: 'success',
        }).then(() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        });
      } else {
        Swal.fire('Failed', result.message || 'Something went wrong.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Server error. Try again later.', 'error');
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Phone</label>
          <PhoneInput
            country="pk"
            value={formData.phone}
            onChange={(phone) =>
              setFormData((prev) => ({ ...prev, phone }))
            }
            inputProps={{
              name: 'phone',
              required: true,
            }}
          />
        </div>

        <div className="input-group">
          <label>New Password (optional)</label>
          <input
            type="password"
            name="password"
            placeholder="Leave blank to keep current password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="update-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
