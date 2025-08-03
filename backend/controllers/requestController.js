const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');

// ✅ Send a proposal to a buyer's project
const requestProject = async (req, res) => {
  try {
    const { projectId, buyerId, sellerMessage, sellerId } = req.body;

    // Get seller and buyer from DB
    const seller = await Seller.findById(sellerId);
    const buyer = await Buyer.findById(buyerId);

    if (!seller || !buyer) {
      return res.status(404).json({ message: 'Seller or Buyer not found' });
    }
      const project = buyer.projectProposals.id(projectId);
if (!project) {
      return res.status(404).json({ message: 'Project not found in buyer proposals' });
    }

    // Add proposal into buyer's projectRequests array
    buyer.projectRequests = buyer.projectRequests || []; // ensure field exists
    buyer.projectRequests.push({
      projectId,
      sellerId: seller._id,
      sellerName: `${seller.firstName} ${seller.lastName}`,
      sellerMessage,
      dateRequested: new Date(),
      read: false,
      projectTitle: project.projectTitle
    });

    await buyer.save();
    res.status(200).json({ message: 'Proposal sent successfully' });
  } catch (err) {
    console.error('Proposal Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get all project requests for a buyer (notifications)
const getProjectRequests = async (req, res) => {
  try {
    const { buyerId } = req.query; // 👈 You must pass this as query param from frontend

    const buyer = await Buyer.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    res.status(200).json({ projectRequests: buyer.projectRequests });
  } catch (err) {
    console.error('Notification Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProjectRequest = async (req, res) => {
  try {
    const { buyerId, requestId } = req.params;

    const buyer = await Buyer.findById(buyerId);
    if (!buyer) return res.status(404).json({ message: 'Buyer not found' });

    buyer.projectRequests = buyer.projectRequests.filter(
      (req) => req._id.toString() !== requestId
    );

    await buyer.save();
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (err) {
    console.error('Delete Notification Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = {
  requestProject,
  getProjectRequests,
  deleteProjectRequest,

};
