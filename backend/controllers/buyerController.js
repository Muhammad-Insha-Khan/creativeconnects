const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Buyer = require('../models/Buyer');

const registerBuyer = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, fieldDomain, interests } = req.body;

    // Check for existing user
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Create new buyer
    const newBuyer = await Buyer.create({ firstName, lastName, email, phone, password, fieldDomain, interests });

    // Generate token
    const token = jwt.sign({ id: newBuyer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'Registration successful',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const signinBuyer = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if buyer exists
    const buyer = await Buyer.findOne({ email });
    if (!buyer) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: buyer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const slug = `${buyer.firstName}-${buyer.lastName}-${buyer._id}${randomDigits}`;

    res.status(200).json({
      message: 'Sign-in successful',
      token,
      user: {
        id: buyer._id,
        firstName: buyer.firstName,
        lastName: buyer.lastName,
        email: buyer.email,
        phone: buyer.phone,
        fieldDomain: buyer.fieldDomain,
        interests: buyer.interests,
        slug,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


//fuctyion
const submitProjectProposal = async (req, res) => {
  const { projectTitle, requiredSkills, minBudget, maxBudget, timeLimit, expertiseLevel, projectDescription } = req.body;

  try {
    // Find the buyer by ID (assuming the buyer is logged in and the token contains the buyer ID)
    const buyer = await Buyer.findById(req.user.id);
    if (!buyer) {
      return res.status(400).json({ message: 'Buyer not found' });
    }

    // Add the new proposal to the projectProposals array
    buyer.projectProposals.push({
      projectTitle,
      requiredSkills,
      minBudget,
      maxBudget,
      timeLimit,
      expertiseLevel,
      projectDescription
    });

    // Save the updated buyer
    await buyer.save();

    res.status(200).json({ message: 'Project proposal submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//new on efunc
const addJobDescription = async (req, res) => {
  try {
    // Extract job description data from the request body
    const { jobTitle, workingHours, companyName, educationalBackground, skillsQualifications, jobDescription, jobType } = req.body;

    // Validate the data
    if (!jobTitle || !workingHours || !companyName || !educationalBackground || !skillsQualifications || !jobDescription || !jobType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the buyer (authenticated user)
    const buyer = await Buyer.findById(req.user.id);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    // Add the job description to the buyer's jobDescriptions array
    buyer.jobDescriptions.push({
      jobTitle,
      workingHours,
      companyName,
      educationalBackground,
      skillsQualifications,
      jobDescription,
      jobType,
    });

    // Save the buyer document
    await buyer.save();

    // Respond with success message
    res.status(200).json({ message: 'Job description submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProjectProposals = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }
    res.status(200).json({ projectProposals: buyer.projectProposals });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all job descriptions of logged-in buyer
const getJobDescriptions = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    res.status(200).json({ jobDescriptions: buyer.jobDescriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//delete

const deleteBuyerAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const buyer = await Buyer.findById(req.user.id);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    await Buyer.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ediT PROFILE

const updateBuyerProfile = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    const { firstName, lastName, email, phone, password } = req.body;

    // Update fields
    buyer.firstName = firstName || buyer.firstName;
    buyer.lastName = lastName || buyer.lastName;
    buyer.email = email || buyer.email;
    buyer.phone = phone || buyer.phone;

    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      buyer.password = await bcrypt.hash(password, salt);
    }

    await buyer.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: buyer._id,
        firstName: buyer.firstName,
        lastName: buyer.lastName,
        email: buyer.email,
        phone: buyer.phone,
      },
    });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// get data to appears in edit profile

const getBuyerProfile = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id).select('-password'); // exclude password
    if (!buyer) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(buyer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



const getAllJobDescriptions = async (req, res) => {
  try {
    const buyers = await Buyer.find({}, 'firstName lastName jobDescriptions');
    const allJobs = [];

    buyers.forEach((buyer) => {
      buyer.jobDescriptions.forEach((job) => {
        allJobs.push({
          ...job.toObject(),
          buyerName: `${buyer.firstName} ${buyer.lastName}`,
          buyerId: buyer._id,
        });
      });
    });

    res.status(200).json({ jobDescriptions: allJobs });
  } catch (error) {
    console.error('Error fetching all jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


//6/29/2025
const getAllProjectProposals = async (req, res) => {
  try {
    // Return all project proposals posted by all buyers
    const buyers = await Buyer.find({}, 'firstName lastName email projectProposals');
    const allProjects = [];
    buyers.forEach(buyer => {
      buyer.projectProposals.forEach(project => {
        allProjects.push({
          ...project.toObject(),
          buyerId: buyer._id,
          buyerName: `${buyer.firstName} ${buyer.lastName}`,
           buyerEmail: buyer.email
        });
      });
    });
    res.status(200).json({ projectProposals: allProjects });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getProjectRequests = async (req, res) => {
  try {
    const { buyerId } = req.query;

    if (!buyerId) {
      return res.status(400).json({ message: 'Buyer ID is required' });
    }

    const buyer = await Buyer.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    res.status(200).json({ projectRequests: buyer.projectRequests });
  } catch (error) {
    console.error('Error fetching project requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Show Only Proposals Sent by Logged-In Seller
const getProposalsBySeller = async (req, res) => {
  try {
    const { sellerId } = req.query;

    if (!sellerId) {
      return res.status(400).json({ message: 'Seller ID is required' });
    }

    const buyers = await Buyer.find({ 'projectRequests.sellerId': sellerId });

    let proposals = [];

    for (const buyer of buyers) {
      const matchedProposals = buyer.projectRequests.filter(req => req.sellerId.toString() === sellerId);
      
      // Attach buyer's name for UI (optional)
      matchedProposals.forEach(p => {
        proposals.push({
          ...p.toObject(),
          buyerName: `${buyer.firstName} ${buyer.lastName}`,
        });
      });
    }

    res.status(200).json({ proposals });
  } catch (err) {
    console.error('Error fetching seller proposals:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { registerBuyer, signinBuyer, submitProjectProposal , addJobDescription , getProjectProposals , getJobDescriptions , deleteBuyerAccount , updateBuyerProfile , getBuyerProfile ,getAllJobDescriptions ,getAllProjectProposals , getProjectRequests , getProposalsBySeller };
