import React, { useEffect, useState } from 'react';
import Footer from '../components/footer';
import Proposal from '../components/Proposal';
import BuyerDashboardSlider from './BuyerDashboardSlider';
import '../styles/BuyerDashboard.css';
import MyProposals from '../components/MyProposals';
import ProjectProposalsList from '../components/ProjectProposalsList';
import JobDescriptionsList from '../components/JobDescriptionsList';
import ProjectProposalsStats from '../components/ProjectProposalsStats';
import JobDescriptionsStats from '../components/JobDescriptionsStats';
import BuyerHeader from '../components/BuyerHeader';
import OnlineDuration from '../components/OnlineDuration';
import RatingSystem from '../components/RatingSystem'; // ✅ Import your rating component

const BuyerMainDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showRatingSystem, setShowRatingSystem] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user?.id) {
          setCurrentUser({ _id: user.id, role: "Buyer" }); // Assuming buyer here
        }
      } catch (e) {
        console.error("Failed to parse user:", e);
      }
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="header-section">
        <BuyerHeader />
      </div>

      <div className="slider-section">
        <BuyerDashboardSlider />
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
              <Proposal />
            </div>
            <div className="stats-column">
              <ProjectProposalsStats />
              <JobDescriptionsStats />
              <OnlineDuration />
            </div>
          </div>

          <div className="my-propsal-section">
            <MyProposals />
          </div>

          <div>
            <ProjectProposalsList />
          </div>

          <div>
            <JobDescriptionsList />
          </div>
        </>
      )}

      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default BuyerMainDashboard;