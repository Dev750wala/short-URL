const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const urlSchema = new mongoose.Schema({
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        // original URL
        redirectUrl: {
            required: true,
            type: String,
        },
        visitHistory: [ {
            timestamp: { type: Number}
        }]
    },
    {timestamps: true},
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;