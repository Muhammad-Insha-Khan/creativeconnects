import React, { useState } from 'react';
import InputField from '../components/InputField';
import Botton from '../components/Botton';
import '../styles/Signin.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('skillSwapper'); // Default to SkillSwapper
  const navigate = useNavigate();

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    const apiUrl =
      userType === 'seller'
        ? 'https://creativeconnects.inshakhanbhai78.repl.co/api/seller/signin'
        : userType === 'buyer'
          ? 'https://cece364f-9505-4ba8-bfc2-5f7c78a75f2b-00-3mv3m5iuz7ehw.sisko.replit.dev/api/buyer/signin'
          : 'http://localhost:5000/api/skillSwapper/signin'; // SkillSwapper sign-in URL

    try {
      // Send POST request to the back-end for sign-in
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { slug } = data.user; // Extract slug from response

        localStorage.setItem('token', data.token);

        // Append the role to the user object before saving
        const userWithRole = {
          ...data.user,
          role: userType === 'skillSwapper' ? 'SkillSwapper' : userType.charAt(0).toUpperCase() + userType.slice(1), // Capitalize
        };

        localStorage.setItem('user', JSON.stringify(userWithRole));

        Swal.fire({
          title: 'Success!',
          text: 'You are now logged in!',
          icon: 'success',
          confirmButtonText: 'Go to Dashboard',
        }).then(() => {
          // Navigate to different dashboards based on user type
          if (userType === 'seller') {
            navigate(`/SellerDashboard/${slug}`);
          } else if (userType === 'buyer') {
            navigate(`/BuyerDashboard/${slug}`);
          } else {
            navigate(`/SkillSwapper/${slug}`); // Redirect to Skill Swapper dashboard
          }
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Something went wrongs, please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Server Error!',
        text: 'An error occurred, please try again later.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  return (
    <div className="sign">
      <div className="Signinfloating-circle"></div>
      <div className="Signincontainer">
        <div className="Signincol1">
          <h1 className='signin-col1-heading'>WELCOME TO CREATIVE CONNECT!</h1>
          <p className='signin-col1-para'>
            Sign in to manage your freelance profile, explore new projects, and collaborate with professionals worldwide.
          </p>
          <Botton type="button" onClick={() => navigate('/register')}>
            Register Now
          </Botton>
        </div>
        <div className="Signincol2">
          <h1 className='sign-col2-heading'>SIGN IN YOUR ACCOUNT</h1>

          <div className="UserType-Selection">
            <p className="UserType-Heading">Select Your Role</p>
            <div className="UserType-Options">

              <label className={`UserType-Option ${userType === 'buyer' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  checked={userType === 'buyer'}
                  onChange={() => setUserType('buyer')}
                />
                <span>Buyer</span>
              </label>

              <label className={`UserType-Option ${userType === 'seller' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  checked={userType === 'seller'}
                  onChange={() => setUserType('seller')}
                />
                <span>Seller</span>
              </label>

              <label className={`UserType-Option ${userType === 'skillSwapper' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  checked={userType === 'skillSwapper'}
                  onChange={() => setUserType('skillSwapper')}
                />
                <span>Skill Swapper</span>
              </label>

            </div>
          </div>

          <InputField

            type="email"
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="Signin-Email"
          >
            Enter your Email
          </InputField>
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="Signin-Pass"
          >
            Enter your Password
          </InputField>
          <div className="submit"></div>
          <Botton className="signin-button" type="submit" onClick={handleSignIn}>
            SIGN IN
          </Botton>
          <p className='Signin-col2-lastpara'>
            By joining, you agree to the Creative Connect Terms of Service and to
            occasionally receive emails from us. Please read our Privacy Policy to
            learn how we use your personal data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
