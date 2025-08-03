import React, { useEffect, useState } from 'react';
import Headers from '../components/SellerHeader';
import Footer from '../components/footer';
import OngoingProjects from '../components/Ongoingprojects';
import Stats from '../components/Stats';
import Project from '../components/project'
import SellerDashboardSlider from './SellerDashboardSlider'
import '../styles/BuyerDashboard.css';
import ChatSearch from "../components/ChatSearch"
import SellerProfileEdit from '../components/SellerProfileEdit';
import SellerHeader from '../components/SellerHeader';
import SentProposalsList from '../components/SentProposalsList';
import SentProposalsStats from '../components/SentProposalsStats';
import OnlineDuration from '../components/OnlineDuration';
import RatingSystem from '../components/RatingSystem';
const SellerMainDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const [showRatingSystem, setShowRatingSystem] = useState(false);
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
  return (
    <div className="dashboard-container">
      <div className="header-section">
        <SellerHeader />
      </div>
      <div className="slider-section">
        <SellerDashboardSlider />
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

              <SentProposalsList />

            </div>

            <div className="stats-column">

              <SentProposalsStats />

              <OnlineDuration />


            </div>
          </div>


        </>
      )}

      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default SellerMainDashboard
