const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    appName:{
        type: String,
        default: undefined,
    },
    icon64: {
        type: String,
        default: undefined,
    },
    icon192: {
        type: String,
        default: undefined,
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    links: {
        type: Array,
        default: []
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    posts: {
        type: Array,
        default: [],
    },
    youtubeid: {
        type: String,
        default: "",
    },
    instagramid: {
        type: String,
        default: undefined,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
