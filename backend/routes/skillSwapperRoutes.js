const express = require('express');
const { registerUser, signinSkillSwapper, deleteSkillSwapperAccount, updateSkillSwapperProfile, getSkillSwapperProfile, uploadOpportunity, getAllOpportunities, getUploadedSwapsCount, getOtherOpportunities, sendSwapRequest, getNotifications } = require('../controllers/SkillSwapperController');
const protect = require('../middleware/authMiddleware');
const SkillSwapper = require('../models/SkillSwapper');
const router = express.Router();



// POST route for user registration
router.post('/register', registerUser);
router.post('/signin', signinSkillSwapper);

// ✅ Delete buyer account with first name confirmation
router.delete('/delete', protect, deleteSkillSwapperAccount); // 🔥 New route

//account edit
router.put('/update', protect, updateSkillSwapperProfile);

router.get('/email/:email', async (req, res) => {
    try {
        const user = await SkillSwapper.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: "Swapper not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//detials show in edit-profile
router.get('/profile', protect, getSkillSwapperProfile);

router.post('/upload', protect, uploadOpportunity);

router.get('/opportunities', protect, getAllOpportunities);

router.get('/count', getUploadedSwapsCount);


router.get('/others', getOtherOpportunities);


router.post('/request', sendSwapRequest);
router.get('/notifications', getNotifications);
module.exports = router;