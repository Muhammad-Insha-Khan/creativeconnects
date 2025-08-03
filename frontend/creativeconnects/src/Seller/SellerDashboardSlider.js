import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/Slider.css";


function SellerDashboardSlider() {
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
        <div className="slider-heading">
          <h2>Welcome to your Dashboard, {user.firstName}!</h2>
        </div>
        <div className="slidercontent-container">
          <div
            className={`slidercontent text-slide ${isParagraph ? "visible" : "hidden"}`}
          >
            <p >Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Field Domain: {user.fieldDomain}</p>
            <p>Interests: {user.interests}</p>
            <p>Your unique slug: {slug}</p>
          </div>

          <div
            className={`slidercontent list-slide ${!isParagraph ? "visible" : "hidden"}`}
          >
            <p id="slidercreative-connects-message">

              Hey {user.firstName}, welcome again! Creative Connects is your personal hub to meet fellow creatives and passionate professionals. <br />
              Here, you can showcase your talents, collaborate on real-world projects, and build meaningful connections. <br />
              Whether you're a designer, developer, writer, or strategist, there's always a place for your skills to shine. <br />
              Start exploring opportunities, exchange ideas, and grow together with a supportive creative community.

            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerDashboardSlider
