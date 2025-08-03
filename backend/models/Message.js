const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: String,
    senderRole: String,
    receiverId: String,
    receiverRole: String,
    messageOriginal: String,
    messageTranslated: String,
    timestamp: Date
});

module.exports = mongoose.model("Message", messageSchema);
