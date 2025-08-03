const express = require('express');
const {
  registerBuyer,
  signinBuyer,
  submitProjectProposal,
  addJobDescription,
  getProjectProposals,
  getJobDescriptions,
  deleteBuyerAccount, // 
  updateBuyerProfile,
  getBuyerProfile,
  getAllJobDescriptions,
  getAllProjectProposals,
  getProjectRequests,
  getProposalsBySeller

} = require('../controllers/buyerController');
const Buyer = require('../models/Buyer');

// const { getProjectRequests } = require('../controllers/requestController');


const protect = require('../middleware/authMiddleware');
const { deleteProjectRequest } = require('../controllers/requestController');

const router = express.Router();

// ✅ Register route
router.post('/register', registerBuyer);

// ✅ Sign-in route
router.post('/signin', signinBuyer);

// ✅ Submit project proposal
router.post('/submit-proposal', protect, submitProjectProposal);

// ✅ Add job description
router.post('/add-job-description', protect, addJobDescription);

// ✅ Get all project proposals of logged-in buyer
router.get('/project-proposals', protect, getProjectProposals);

// ✅ Get all job descriptions of logged-in buyer
router.get('/job-descriptions', protect, getJobDescriptions);

// ✅ Delete buyer account with first name confirmation
router.delete('/delete', protect, deleteBuyerAccount); // 🔥 New route

//account edit
router.put('/update', protect, updateBuyerProfile);

//detials show in edit-profile
router.get('/profile', protect, getBuyerProfile);

//detials show in all-job-descriptions
router.get('/all-job-descriptions', getAllJobDescriptions);

// Project proposals submitted  by buyer (for sellers to view)
router.get('/all-project-proposals', getAllProjectProposals);



router.get('/project-requests', protect, getProjectRequests);
// Buyer views all project requests (notifications)

// Buyer views all project requests (notifications)
router.delete('/project-requests/:buyerId/:requestId', deleteProjectRequest);

// Route for seller to view sent proposals
router.get('/seller-proposals', getProposalsBySeller);

router.get('/email/:email', async (req, res) => {
  try {
    const user = await Buyer.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "Buyer not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;