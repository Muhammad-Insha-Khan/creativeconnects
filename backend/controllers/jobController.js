// controllers/jobController.js
const Buyer = require('../models/Buyer');

const getAllJobDescriptions = async (req, res) => {
  try {
    const buyers = await Buyer.find({}, 'jobDescriptions');

    // Merge all jobDescriptions from all buyers
    const allJobs = buyers.flatMap(buyer => buyer.jobDescriptions);

    res.status(200).json({ jobDescriptions: allJobs });
  } catch (error) {
    console.error('Error fetching job descriptions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllJobDescriptions };
