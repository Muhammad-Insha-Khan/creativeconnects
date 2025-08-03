const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    raterId: { type: mongoose.Schema.Types.ObjectId, required: true },
    raterRole: { type: String, required: true },
    ratedId: { type: mongoose.Schema.Types.ObjectId, required: true },
    ratedRole: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String }
},
    {
        timestamps: true // ✅ THIS ADDS createdAt and updatedAt
    });

module.exports = mongoose.model('Rating', ratingSchema);