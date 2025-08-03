import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../styles/Slider.css";




export default function SkillSwapperDashboardSlider() {
  const [user, setUser] = useState(null);
  const { slug } = useParams();
  const [isParagraph, setIsParagraph] = useState(true);


  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Redirect to login if no user is found
      window.location.href = '/';
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsParagraph((prev) => !prev);
    }, 4000); // Toggle every 4 seconds
    return () => clearInterval(interval);
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="slider-container">
        <h1 className="slider-heading">
          <h2>Welcome to your Dashboard, {user.firstName}!</h2>      </h1>
        <div className="slidercontent-container">
          {/* Text visibility controlled by isParagraph */}
          <div
            className={`slidercontent text-slide ${isParagraph ? "visible" : "hidden"}`}
          >
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Field Domain: {user.expertiseHave}</p>
            <p>Interests: {user.expertiseLookingFor}</p>
            <p>Your unique slug: {slug}</p>
          </div>
          {/* List visibility controlled by isParagraph */}
          <div
            className={`slidercontent list-slide ${!isParagraph ? "visible" : "hidden"}`}
          >
            <p id="slidercreative-connects-message">This is another paragraph that will alternate in and out.</p>
          </div>
        </div>
      </div>



    </div>
  )
}

