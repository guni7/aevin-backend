const mongoose = require('mongoose');

const viewerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    profilePicture: {
        type: String,
        default: undefined,
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Viewer', viewerSchema);
