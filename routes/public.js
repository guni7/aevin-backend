const router = require('express').Router();
const User = require('../model/User');
const youtube = require('./youtubeFunctions');
//public apis (for end users)

router.get('/:username', async (req, res) => {
    const usernameExists = await User.findOne({username: req.params.username});

    if (!usernameExists) return res.status(200).json({error: "No such username"});

    dataObject = {
        profilePicture: usernameExists.profilePicture,
        links: usernameExists.links,
        name: usernameExists.name,
        youtubeid: usernameExists.youtubeid,
        posts: usernameExists.posts.sort((a, b) => b.time - a.time),
        username: usernameExists.username
    }
    res.status(200).json(dataObject);
})

router.get('/:username/manifestData', async (req, res) => {
    const usernameExists = await User.findOne({username: req.params.username});

    if (!usernameExists) return res.status(200).json({error: "No such username"});

    dataObject = {
        profilePicture: usernameExists.profilePicture,
        name: usernameExists.name,
        icon64: usernameExists.icon64,
        icon192: usernameExists.icon192,
        appName: usernameExists.appName,
        username: usernameExists.username,
    }
    res.status(200).json(dataObject);
})

router.get('/:username/links', async (req, res) => {
    const usernameExists = await User.findOne({username: req.params.username});

    if (!usernameExists) return res.status(200).json({error: "No such username"});

    console.log(usernameExists);

    res.status(200).json({
        links: usernameExists.links,
    })
});

router.get('/:youtubeid/blog', async (req, res) => {
    const youtubeid = req.params.youtubeid
    const list = await youtube.getVideos(youtubeid);
    console.log(list);
    const thumbnailList = [];
    res.status(200).json({
        thumbnails: list,
    })
})

module.exports = router;
