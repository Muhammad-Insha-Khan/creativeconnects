const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating'); // Adjust if in different path

router.post('/ratings', async (req, res) => {
    try {

        const newRating = new Rating(req.body);
        await newRating.save();
        res.status(201).json(newRating);
    } catch (err) {
        console.error("Error saving rating:", err); // 👈
        res.status(500).json({ message: 'Failed to save rating', error: err.message });
    }
});
router.get('/:ratedId', async (req, res) => {
    try {
        const ratings = await Rating.find({ ratedId: req.params.ratedId });
        res.status(200).json(ratings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching ratings', error: err.message });
    }
});
module.exports = router;