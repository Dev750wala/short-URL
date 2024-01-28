const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
        shortID: {
            type: String,
            required: true,
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        totalAnalytics: [{
            timestamp: { type: Number },
            ipAddress: { type: String },
        }]
    }, { timestamps: true },
);

const url = mongoose.model('url', urlSchema);

module.exports = url;