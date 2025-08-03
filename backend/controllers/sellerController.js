
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const Buyer = require('../models/Buyer');

const registerSeller = async (req, res) => {
  const { firstName, lastName, email, phone, password, fieldDomain, skills , projectCount, rating } = req.body;

  try {
    const sellerExists = await Seller.findOne({ email });
    if (sellerExists) {
      return res.status(400).json({ message: 'Seller already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = await Seller.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      fieldDomain,
      skills,
      projectCount, // <-- Must include
      rating 
    });

    // Send a registration email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Successful Registration',
      text: `Dear ${firstName},\n\nThank you for registering with Creative Connects.\n\nBest Regards,\nCreative Connects Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error sending email: ${error.message}`);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    res.status(201).json(newSeller);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const signinSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find seller by email
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
    const slug = `${seller.firstName}-${seller.lastName}-${seller._id}${randomDigits}`;

    res.status(200).json({ message: 'Sign-in successful',
    token,
    user: {
      id: seller._id,
      firstName: seller.firstName,
      lastName: seller.lastName,
      email: seller.email,
      phone: seller.phone,
      fieldDomain: seller.fieldDomain,
      skills: seller.skills,
      slug,
    },});
  } catch (error) {
    console.error('Error in signin:', error.message); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
};
// DELETE SELLER ACCOUNT 
const deleteSellerAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const seller = await Seller.findById(req.user.id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    await Seller.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// editProfile
const updateSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.user.id);
    if (!seller) {
      return res.status(404).json({ message: 'SELLER not found' });
    }

    const { firstName, lastName, email, phone, password } = req.body;

    // Update fields
    seller.firstName = firstName || seller.firstName;
    seller.lastName = lastName || seller.lastName;
    seller.email = email || seller.email;
    seller.phone = phone || seller.phone;

    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      seller.password = await bcrypt.hash(password, salt);
    }

    await seller.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: seller._id,
        firstName: seller.firstName,
        lastName: seller.lastName,
        email: seller.email,
        phone: seller.phone,
      },
    });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// get data to appears in edit profile

const getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.user.id).select('-password'); // exclude password
    if (!seller) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getSentProposalsCount = async (req, res) => {
  try {
    const { sellerId } = req.query;

    if (!sellerId) {
      return res.status(400).json({ message: 'Seller ID is required' });
    }

    // Aggregate all projectRequests where sellerId matches
    const allBuyers = await Buyer.find({
      'projectRequests.sellerId': sellerId
    });

    let count = 0;

    allBuyers.forEach((buyer) => {
      const matchedProposals = buyer.projectRequests.filter(
        (req) => req.sellerId.toString() === sellerId
      );
      count += matchedProposals.length;
    });

    res.status(200).json({ count });
  } catch (err) {
    console.error('Error fetching sent proposal count:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    console.error("Error fetching sellers:", error.message);
    res.status(500).json({ message: "Server error fetching sellers" });
  }
};
module.exports = { registerSeller , signinSeller, deleteSellerAccount , updateSellerProfile ,getSellerProfile ,getSentProposalsCount ,  getAllSellers};
