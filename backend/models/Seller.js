const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  fieldDomain: { type: String, required: true },
  skills: { type: [String], required: true },
    role: { type: String, default: "Seller" },
    projectCount: {type: Number},
  rating: {type: Number },

}, { timestamps: true });




module.exports = mongoose.model('Sellerss', sellerSchema);
