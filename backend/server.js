const express = require('express');
const dotenv = require('dotenv');
const Groq = require('groq-sdk');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const buyerRoutes = require('./routes/buyerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const errorHandler = require('./middleware/errorHandler');
const skillSwapperRoutes = require('./routes/skillSwapperRoutes');
const jobRoutes = require('./routes/jobRoutes');
const http = require("http");
const { Server } = require("socket.io");
const Buyer = require("./models/Buyer");
const Seller = require("./models/Seller");
const SkillSwapper = require("./models/SkillSwapper");
const Message = require("./models/Message");
const chatSearchRoutes = require('./routes/chatSearchRoutes');
const chatRoutes = require('./routes/chatRoutes');
const axios = require("axios");

require("dotenv").config();
dotenv.config()
// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// API routes
app.use('/api', chatSearchRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/skillswapper', skillSwapperRoutes);
app.use('/api/request', require('./routes/requestRoutes'));
const ratingRoutes = require('./routes/ratingRoutes');
app.use('/api/jobs', jobRoutes);
app.use('/messages', chatRoutes); // Optional chat route


// rating
app.use('/api/ratings', ratingRoutes);




// Get all users
app.get("/users", async (req, res) => {
  try {
    const buyers = await Buyer.find();
    const sellers = await Seller.find();
    const swappers = await SkillSwapper.find();

    const allUsers = [
      ...buyers.map(u => ({
        _id: u._id,
        name: `${u.firstName} ${u.lastName}`,
        role: "Buyer",
        profilePic: `https://ui-avatars.com/api/?name=${u.firstName}+${u.lastName}`
      })),
      ...sellers.map(u => ({
        _id: u._id,
        name: `${u.firstName} ${u.lastName}`,
        role: "Seller",
        profilePic: `https://ui-avatars.com/api/?name=${u.firstName}+${u.lastName}`
      })),
      ...swappers.map(u => ({
        _id: u._id,
        name: `${u.firstName} ${u.lastName}`,
        role: "SkillSwapper",
        profilePic: `https://ui-avatars.com/api/?name=${u.firstName}+${u.lastName}`
      }))
    ];

    res.json(allUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get messages between 2 users
app.get("/messages/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  const msgs = await Message.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 }
    ]
  }).sort({ timestamp: 1 });
  res.json(msgs);
});

// Translation using AI (Groq)
const translateMessage = async (message, targetLanguage) => {
  if (!message || typeof message !== 'string') return '';

  const direction = targetLanguage === 'ur'
    ? 'Translate the following English text to Urdu.'
    : 'Translate the following Urdu text to English.';

  try {
    const response = await axios.post(
      process.env.GROQ_API_URL,
      {
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: `${direction} Only return the translated sentence without explanation or extra formatting.`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const translated = response.data.choices[0].message.content.trim();
    return translated;
  } catch (error) {
    console.error('Groq Translation Error:', error.response?.data || error.message);
    return message;
  }
};
// Socket.IO logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
  });

  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, message, targetLang = "ur" } = data;

    try {
      const translated = await translateMessage(message, targetLang); // ✅ await the translation

      const msg = new Message({
        senderId,
        receiverId,
        messageOriginal: message,
        messageTranslated: translated,
        timestamp: new Date()
      });

      await msg.save();

      io.to(receiverId).emit("receiveMessage", {
        senderId,
        messageOriginal: message,
        messageTranslated: translated,
        timestamp: msg.timestamp
      });
    } catch (error) {
      console.error("Message save/send error:", error);
    }
  });
});

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));