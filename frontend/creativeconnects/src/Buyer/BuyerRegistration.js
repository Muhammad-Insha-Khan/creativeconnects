import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import '../styles/BuyerRegistration.css';
import BuyerContractABI from "../contracts/BuyerContract.json";
import getWeb3 from "../utils/web3";
import logo from "../images/creativeconnects.png";

const BuyerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fieldDomain: '',
    interests: [],
    interestToAdd: '',
  });

  const fieldDomains = ['IT', 'Software Development', 'Technician', 'Design', 'Business'];

  const interests = [
    'Technology',
    'Business',
    'Design',
    'Music',
    'Photography',
    'Writing',
    'Traveling',
    'Cooking',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddInterest = () => {
    const selectedInterest = formData.interestToAdd;

    if (!selectedInterest) {
      Swal.fire({
        title: 'Invalid Selection',
        text: 'Please select a valid interest to add.',
        icon: 'error',
        background: '#00796b',
        color: '#4caf50',
      });
      return;
    }

    if (formData.interests.length < 3 && !formData.interests.includes(selectedInterest)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, selectedInterest],
        interestToAdd: '',
      });
    } else if (formData.interests.length >= 3) {
      Swal.fire({
        title: 'Limit Reached',
        text: 'You can only select up to 3 interests.',
        icon: 'warning',
        background: '#00796b',
        color: '#4caf50',
      });
    } else {
      Swal.fire({
        title: 'Duplicate Interest',
        text: 'This interest has already been added.',
        icon: 'error',
        background: '#00796b',
        color: '#4caf50',
      });
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: 'Password Mismatch',
        text: 'Passwords do not match.',
        icon: 'error',
        background: '#00796b',
        color: '#4caf50',
      });
      return false;
    }

    if (!formData.email.includes('@')) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'error',
        background: '#00796b',
        color: '#4caf50',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BuyerContractABI.networks[networkId];

      if (!deployedNetwork) {
        alert("Error: Smart contract not deployed on this network.");
        return;
      }

      const contract = new web3.eth.Contract(
        BuyerContractABI.abi,
        deployedNetwork.address
      );

      // Check if email already exists in the blockchain
      const emailExists = await contract.methods.isEmailRegistered(formData.email).call();
      if (emailExists) {
        Swal.fire({
          title: "Error",
          text: "This email is already registered. Please use a different email.",
          icon: "error",
        });
        return;
      }

      // Register the buyer if email is not found
      await contract.methods
        .registerBuyer(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.phone,
          formData.fieldDomain
        )
        .send({ from: accounts[0], gas: 500000 });

      Swal.fire({
        title: "Registration Successful",
        text: "You have been registered on the blockchain!",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: error.message,
        icon: "error",
      });
    }
    ////////////////////////////////////
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("https://fdd95903-fa27-4990-89e9-22e66a027c97-00-32oh6wtdcgz1y.pike.replit.dev/api/buyer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Registration Successful",
          text: data.message,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Registration Failed",
          text: data.message || "Something went wrong, please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error during registration. Please try again.",
        icon: "error",
      });
    }
  };
  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      fieldDomain: '',
      interests: [],
      interestToAdd: '',
    });

    Swal.fire({
      title: 'Form Cleared',
      text: 'All input fields have been reset.',
      icon: 'info',
      background: '#00796b',
      color: '#4caf50',
    });
  };

  const handleBack = () => {
    window.location.reload();
  };

  return (
    <div className="Buyer-container">
      <div className="Buyer-col1">
        <h1 className='BuyerWelHeading'>Welcome to Creative Connects</h1>
        <p className='BuyerWelPara'>Join a community where you can connect, collaborate, and share your creative skills and interests.</p>
        <button className="Buyerback" onClick={handleBack}>

          Back
        </button>
        <img src={logo} alt="Logo" style={{ width: "300px", margin: "20px" }} />
      </div>
      <div className="Buyer-col2">
        <h1 className='Buyer-col2-head'>BUYER REGISTRATION</h1>
        <form className='Buyer-col2-form' onSubmit={handleSubmit}>
          <div className="Buyer-input-row">
            <div className="Buyer-input-half">
              <label className="Buyer-label" htmlFor="f-name">First Name</label>
              <input
                type="text"
                id="f-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Buyer-input-half">
              <label htmlFor="l-name">Last Name</label>
              <input
                type="text"
                id="l-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="Buyer-input-row">
            <div className="Buyer-input-half">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Buyer-input-half">
              <label htmlFor="phone">Phone Number</label>
              <PhoneInput
                country="pk"
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true,
                }}
                enableSearch
                containerStyle={{ width: '200px' }}         // Full wrapper
                inputStyle={{
                  width: '240px',
                  padding: '10px 10px 10px 50px'
                }}
              />
            </div>
          </div>

          <div className="Buyer-input-row">
            <div className="Buyer-input-half">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Buyer-input-half">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label htmlFor="field-domain">Field Domain</label>
          <select
            id="field-domain"
            name="fieldDomain"
            value={formData.fieldDomain}
            onChange={handleChange}
          >
            <option value="">Select a field domain</option>
            {fieldDomains.map((domain, index) => (
              <option key={index} value={domain}>
                {domain}
              </option>
            ))}
          </select>

          <label htmlFor="interests">Select an Interest</label>
          <select
            id="interests"
            name="interests"
            value={formData.interestToAdd || ''}
            onChange={(e) => setFormData({ ...formData, interestToAdd: e.target.value })}
          >
            <option value="">Select an interest</option>
            {interests.map((interest, index) => (
              <option key={index} value={interest}>
                {interest}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddInterest}>
            Add Interest
          </button>
          <p>Selected Interests: {formData.interests.join(', ')}</p>

          <div className="Buyerbutton-row">
            <button type="submit" className="Buyer-submit">
              Register
            </button>
            <button type="button" className="Buyer-clear" onClick={handleClear}>
              <span className="Buyerclear-icon">×</span> Clear
            </button>
          </div>
        </form>
      </div>
      <div className="floating-circle"></div>
    </div>
  );
};

export default BuyerRegistration;
