const SkillSwapper = require('../models/SkillSwapper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // For sending email

// User Registration
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, expertiseHave, expertiseLookingFor } = req.body;

    // Check if the user already exists
    const existingUser = await SkillSwapper.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new SkillSwapper({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      expertiseHave,
      expertiseLookingFor
    });

    await newUser.save();

    // Send email after successful registration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or any other service
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password' // You can use environment variables for security
      }
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Registration Successful',
      text: `Hello ${firstName},\n\nThank you for registering with Creative Connects! We're excited to have you on board.\n\nBest regards,\nCreative Connects Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

const signinSkillSwapper = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await SkillSwapper.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password with hashed password stored in the DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const slug = `${user.firstName}-${user.lastName}-${user._id}${randomDigits}`;

    res.json({
      message: 'Sign-in successful', 
      token, 
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          expertiseHave: user.expertiseHave,
          expertiseLookingFor: user.expertiseLookingFor,
          slug,
        },
      
      
      
      
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSkillSwapperAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await SkillSwapper.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    await SkillSwapper.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// ediT PROFILE

const updateSkillSwapperProfile = async (req, res) => {
  try {
    const user = await SkillSwapper.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'SkillSwapper not found' });
    }

    const { firstName, lastName, email, phone, password } = req.body;

    // Update fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// get data to appears in edit profile

const getSkillSwapperProfile = async (req, res) => {
  try {
    const user = await SkillSwapper.findById(req.user.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//changing skills
const uploadOpportunity = async (req, res) => {
  try {
    const { title, description, skillOffering, skillSeeking } = req.body;

    const user = await SkillSwapper.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.opportunities.push({
      title,
      description,
      skillOffering,
      skillSeeking
    });

    await user.save();

    res.status(201).json({ message: 'Opportunity uploaded successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllOpportunities = async (req, res) => {
  try {
    const users = await SkillSwapper.find({}, 'firstName lastName opportunities');

    const allOpportunities = users.flatMap(user =>
      user.opportunities.map(opportunity => ({
        name: `${user.firstName} ${user.lastName}`,
        ...opportunity.toObject(),
      }))
    );

    res.status(200).json(allOpportunities);
  } catch (err) {
    console.error('Error fetching opportunities:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


//STATS
const getUploadedSwapsCount = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await SkillSwapper.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ count: user.opportunities.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOtherOpportunities = async (req, res) => {
  try {
    const { currentUserId } = req.query;
    const users = await SkillSwapper.find({ _id: { $ne: currentUserId } });
    const opportunities = users.flatMap(user =>
      user.opportunities.map(opp => ({
        ...opp._doc,
        userId: user._id,
        userName: `${user.firstName} ${user.lastName}`,
        email: user.email
      }))
    );
    res.json(opportunities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching opportunities' });
  }
};




const sendSwapRequest = async (req, res) => {
  
  
  const { fromUserId, toUserId, opportunityId, message } = req.body
  

    const targetUser = await SkillSwapper.findById(toUserId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    targetUser.swapRequests.push({ fromUserId, opportunityId, message, status: 'pending', date: new Date() });
    await targetUser.save();

    res.status(200).json({ message: 'Swap request sent!' });
  
};

// Get notifications — all received requests
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await SkillSwapper.findById(userId)
      .populate('swapRequests.fromUserId', 'firstName lastName email');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.swapRequests);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = { registerUser , signinSkillSwapper , deleteSkillSwapperAccount,updateSkillSwapperProfile,getSkillSwapperProfile , uploadOpportunity , getAllOpportunities, getUploadedSwapsCount, getOtherOpportunities,sendSwapRequest ,getNotifications};
