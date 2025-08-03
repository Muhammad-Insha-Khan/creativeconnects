const mongoose = require('mongoose');

// Define the schema for SkillSwapper users
const skillSwapperSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  expertiseHave: { type: [String], required: true },
  expertiseLookingFor: { type: [String], required: true },
  role: { type: String, default: "SkillSwapper" },
  projectCount: {
    type: Number,
    default: 0, // or whatever makes sense
  },
  rating: {
    type: Number,
    default: null, // or 0 if needed
  },

  opportunities: [{

    title: { type: String, required: true },

    description: { type: String, required: true },

    skillOffering: { type: String, required: true },

    skillSeeking: { type: String, required: true },

    dateSubmitted: { type: Date, default: Date.now }

  }],



  swapRequests: [

    {

      fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillSwapper' },

      opportunityId: { type: String },

      message: { type: String },

      status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },

      date: { type: Date, default: Date.now }

    }

  ]

});

module.exports = mongoose.model('SkillSwapper', skillSwapperSchema);