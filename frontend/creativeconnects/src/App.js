import './App.css';
import WelcomePage from './pages/Welcome';
import Registration from './pages/Registration';
import { Route, Routes } from 'react-router-dom';
// import BuyerDashboard from './Buyer/BuyerDashboard';
// import SellerDashboard from './Seller/SellerDashboard';
import ProtectedRoute from './ProtectedRoute';
//import SkillSwapperDashboard from './Swapper/SkillSwapperDashboard';
import SkillSwapperMainDashboard from './Swapper/SkillSwapperMainDashboard';
import BuyerMainDashboard from './Buyer/BuyerMainDashboard';
import SellerMainDashboard from './Seller/SellerMainDashboard';
import ClientContractPage from './pages/ClientContractPage';
import EditProfile from './components/EditProfile';
import SellerProfileEdit from './components/SellerProfileEdit';
import SkillSwapperProfileEdit from './components/SkillSwapperProfileEdit';
import AllProjectProposals from './components/AllProjectProposals';
import AllJobDiscriptionsShow from './components/AllJobDiscriptionsShow';
import OtherOpportunities from './components/OtherOpportunities';
import Chat from './components/ChatMessage';

function App() {
  return (
    <Routes>
      <Route path="/" element={< WelcomePage />} />
      <Route path="/*" element={< h1>PAGE NOT FOUND</h1>} />
      <Route path="/register" element={<Registration />} />
      <Route path="/Chat" element={<Chat />} />
      {/* BUYER ROUTING */}

      <Route path="/BuyerDashboard/:slug" element={<ProtectedRoute><BuyerMainDashboard></BuyerMainDashboard></ProtectedRoute>} />

      {/* SKILLSWAPPER*/}
      <Route path="/SkillSwapper/:slug" element={<ProtectedRoute><SkillSwapperMainDashboard></SkillSwapperMainDashboard></ProtectedRoute>} />


      {/* SELLER*/}
      <Route path="/SellerDashboard/:slug" element={<SellerMainDashboard />} />
      .
      <Route path="/Client-Contract" element={<ClientContractPage />} />

      <Route path="/edit-profile-buyer" element={<EditProfile />} />

      <Route path="/edit-profile-seller" element={<SellerProfileEdit />} />

      <Route path="/edit-profile-skillswapper" element={<SkillSwapperProfileEdit />} />

      <Route path="/All-ProjectProposal" element={<AllProjectProposals />} />

      <Route path="/All-JobDiscriptionShow" element={<AllJobDiscriptionsShow />} />

      <Route path="/OtherOpportunity" element={<OtherOpportunities />} />
      <Route path='/OtherOpportunity' elemnet={<OtherOpportunities />} />



    </Routes>
  );
}

export default App;