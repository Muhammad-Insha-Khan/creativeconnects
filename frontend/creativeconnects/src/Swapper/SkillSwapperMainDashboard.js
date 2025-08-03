import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import Headers from '../components/SkillSwapperHeader';
import Slider from '../components/Slider';
import Footer from '../components/footer';
import OngoingProjects from '../components/Ongoingprojects';
import Stats from '../components/Stats';
import SkillSwapperDashboardSlider from './SkillSwapperDashboardSlider'
import Project from '../components/project';
import '../styles/BuyerDashboard.css'; // Add a CSS file for styling
import Chat from "../components/Chat";
import ChatSearch from "../components/ChatSearch"
import SkillSwapperHeader from '../components/SkillSwapperHeader';
import UploadSwapOpportunity from '../components/UploadSwapOpportunity';
import SwapOpportunitiesList from '../components/SwapOpportunitiesList';
import OnlineDuration from '../components/OnlineDuration';
import UploadedSwapsStats from '../components/UploadedSwapsStats';
import RatingSystem from '../components/RatingSystem';

const SkillSwapperMainDashboard = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [showRatingSystem, setShowRatingSystem] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user?.id) {
          setCurrentUser({ _id: user.id, role: "SkillSwapper" }); // Assuming buyer here
        }
      } catch (e) {
        console.error("Failed to parse user:", e);
      }
    }
  }, []);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("🔍 Raw userData from localStorage:", userData);
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log("🔍 Parsed user object:", user);
        if (user?.id) {
          setCurrentUserId(user.id);
          console.log("✅ Found user ID:", user.id);
        } else {
          console.warn("⚠️ User object does not contain id:", user);
        }
      } catch (e) {
        console.error("❌ Failed to parse user from localStorage:", e);
      }
    } else {
      console.warn("⚠️ No user found in localStorage.");
    }
  }, []);
  const handleClick = () => {

    navigate('/OtherOpportunity');
  };
  return (
    <div className="dashboard-container">
      <div className="header-section">
        <SkillSwapperHeader />
      </div>
      <div className="slider-section">
        <SkillSwapperDashboardSlider />
      </div>
      {/* ✅ Toggle Button to Show/Hide Rating System */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button onClick={() => setShowRatingSystem(!showRatingSystem)}>
          {showRatingSystem ? 'Back to Dashboard' : 'Go to Rating System'}
        </button>
      </div>

      {showRatingSystem && currentUser ? (
        <RatingSystem currentUserId={currentUser._id} currentUserRole={currentUser.role} />
      ) : (
        <>
          <div className="content-container">
            <div className="proposal-column">
              <UploadSwapOpportunity></UploadSwapOpportunity>
            </div>

            <div className="stats-column">



              <UploadedSwapsStats />

              <OnlineDuration></OnlineDuration>

              <div className='nn' onClick={handleClick} style={{ cursor: 'pointer' }} number={2}>

                <Stats heading="Request For Swap" />

              </div>

            </div>
          </div>
        </>
      )}

      <div className="projects-section">
        <SwapOpportunitiesList />
      </div>
      <div className="footer-section">
        <Footer />
      </div>
    </div >
  );
};

export default SkillSwapperMainDashboard
