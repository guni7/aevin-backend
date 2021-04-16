const router = require('express').Router();
const User = require('../model/User');
const Viewer = require('../model/Viewer');
const {
    loginValidation,
    registerValidation,
    viewerRegisterValidation,
    viewerLoginValidation } = require('../validation');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    const {error} = registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    //check if user is in db

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    //hash the password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username,
        links: req.body.links,
        youtubeid: req.body.youtubeid,
        instagramid: req.body.instagramid,
        posts: req.body.posts,
        profilePicture: req.body.profilePicture,
        icon64: req.body.icon64,
        icon192: req.body.icon192,
        appName: req.body.appName,
    });

    //const viewer = new Viewer({
    //    name: req.body.name,
    //    email: req.body.email,
    //    password: hashedPassword,
    //    username: req.body.username,
    //    profilePicture: req.body.profilePicture,
    //});
    try{
        const savedUser = await user.save();


        //create and assign a token
        const token = jwt.sign({ _id: user.id} , process.env.TOKEN_SECRET);
        res.header('auth-token', token).json({ loginSuccess : true, token, user});

        res.send({ user: user.id });
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    try{
        const { error } = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //check if user is in db
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send('Email is wrong');
        //is password correct
        const validPass = await bcrypt.compare(req.body.password, user.password);

        if (!validPass) return res.status(400).send('Invalid Password');

        //create and assign a token
        const token = jwt.sign({ _id: user._id} , process.env.TOKEN_SECRET);
        res.header('auth-token', token).json({ loginSuccess : true, token, user});
    } catch( err ) {
        res.status(500).json({ err: err.message })
    }
})

router.post('/tokenIsValid', async (req, res) => {
    try{
        const token = req.header('auth-token');
        if (!token) return res.status(200).json({valid: false});

        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if(!verified) return res.status(200).json({valid: false});

        const user = await User.findById(verified._id);
        const userObj = {
            id: user._id,
            name: user.name,
            username: user.username,
            profilePicture: user.profilePicture,
            links: user.links,
            posts: user.posts.sort((a, b) => b.time - a.time),
            youtubeId: user.youtubeid,
        }
        console.log(user)
        if (!user) return res.status(200).json({valid: false})

        return res.status(200).json({valid: true, userObj})
    } catch( err ) {
        res.status(500).json({err: err.message})
    }
})

router.post('/viewer/register', async (req, res) => {

    const {error} = viewerRegisterValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    //check if user is in db

    const emailExist = await Viewer.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    //hash the password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const viewer = new Viewer({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username,
        profilePicture: req.body.profilePicture,
    });
    try{
        const savedViewer = await viewer.save();
        res.send({ viewer : viewer.id });
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/viewer/login', async (req, res) => {
    try{
        const { error } = viewerLoginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //check if viewer is in db
        const viewer = await Viewer.findOne({email: req.body.email});
        if (!viewer) return res.status(400).send('Email is wrong');
        //is password correct
        const validPass = await bcrypt.compare(req.body.password, viewer.password);

        if (!validPass) return res.status(400).send('Invalid Password');

        //create and assign a token
        const token = jwt.sign({ _id: viewer._id} , process.env.TOKEN_SECRET);
        res.header('auth-token', token).json({ loginSuccess : true, token, viewer});
    } catch( err ) {
        res.status(500).json({ err: err.message })
    }
})
router.post('/viewer/tokenIsValid', async (req, res) => {
    try{
        const token = req.header('auth-token-viewer');
        if (!token) return res.status(200).json({valid: false});

        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if(!verified) return res.status(200).json({valid: false});

        const viewer = await Viewer.findById(verified._id);
        const viewerObj = {
            id: viewer._id,
            name: viewer.name,
            username: viewer.username,
            profilePicture: viewer.profilePicture,
        }
        console.log(viewerObj)
        if (!viewer) return res.status(200).json({valid: false})

        return res.status(200).json({valid: true, viewerObj})
    } catch( err ) {
        res.status(500).json({err: err.message})
    }
})


module.exports = router;
