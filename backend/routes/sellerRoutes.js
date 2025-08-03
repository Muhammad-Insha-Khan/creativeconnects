const express = require('express');
const { registerSeller, signinSeller, deleteSellerAccount, updateSellerProfile, getSellerProfile, getSentProposalsCount, getAllSellers, } = require('../controllers/sellerController');
const protect = require('../middleware/authMiddleware');
const Seller = require('../models/Seller');
const router = express.Router();

router.post('/register', registerSeller); // Endpoint to register a seller

router.post('/signin', signinSeller);

router.delete('/delete', protect, deleteSellerAccount);


//account edit
router.put('/update', protect, updateSellerProfile);

//detials show in edit-profile
router.get('/profile', protect, getSellerProfile);

router.get('/sent-proposals-count', getSentProposalsCount);
router.get('/all-sellers', getAllSellers); // temp route

router.get('/email/:email', async (req, res) => {
    try {
        const user = await Seller.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: "Seller not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;