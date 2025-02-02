const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({

    shortID: {
        type: String,
        reqired: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        unique: true,
        required: true
    },
    visitHistory: [
        {timestamp: {type: Number}}
    ]
    
},
{
    timestamps: true
}
);

const URL = mongoose.model("url", urlSchema);

module.exports = {URL};