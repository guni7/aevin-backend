const router = require('express').Router();
const verify = require('./verifyToken');
const verifyViewer = require('./verifyViewerToken');
const {editLinksValidation} = require('../validation');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../model/User');
const Viewer = require('../model/Viewer');
const fetchFavicon = require('@meltwater/fetch-favicon').fetchFavicon;
const uniqid = require('uniqid');
const upload = require('../uploadHelpers/multer');
const cloudinary = require('../uploadHelpers/cloudinary');
const cloudinaryProfile = require('../uploadHelpers/cloudinaryProfile');
const sharp = require('sharp')
const fs = require('fs');

//edit link data(for bloggers)
//TODO api to edit youtube, instagram,
router.post('/api/edit/youtubeid/', verify, (req, res) => {

    const editData = JSON.parse(req.query.editData);

    console.log(editData)
    const id = req.user._id;

    User.updateOne(
        {_id: id},
        {
            $set:
            {
                youtubeid: editData
            }
        }
    ).then(data => res.send(data))
     .catch(err => console.log(err));

})
// make a new post
router.post('/api/createPost/', verify, upload.array('image'), async(req, res) => {

    //img

    const editData = JSON.parse(req.query.editData);

    const uploader = async (path) => await cloudinary.uploads(path, 'Images');

    const urls = []

    const id = req.user._id;

    const file = req.files[0]

    const { path } = file

    const newPath = await uploader(path)

    urls.push(newPath)

    fs.unlinkSync(path)

    url = newPath.url.slice(0,4) + 's' + newPath.url.slice(4)
    //img end

    let postArray = [];
    post = editData.editData[0];
    console.log(editData.editData)
    let content = post.content;

    content[0].url = url;

    let postObj = {
        id: uniqid(),
        userid: id,
        userName: req.user.name,
        type: post.type,
        content,
        time: Date.now(),
        likes : [],
        comments:[]
    }

    console.log(postObj);
    User.updateOne(
        {_id: id},
        { $push: {"posts" : postObj }  }
    ).then(data => res.send(data))
        .catch(err => res.send(err))
})
//edit profile picture api
router.post('/api/upload/profilePicture/old', verify, upload.array('image'), async (req, res) => {

    const uploader = async (path) => await cloudinary.uploads(path, 'Images');

    const urls = []

    const id = req.user._id;

    const file = req.files[0]

    //icon generation

    //icon generation end

    const { path } = file
    const newPath = await uploader(path)

    urls.push(newPath)

    fs.unlinkSync(path)

    console.log(newPath);

    User.updateOne(
        {_id: id},
        {
            $set:
            {
                profilePicture: newPath.url
            }
        }
    ).then(data => res.send(data))
     .catch(err => console.log(err));

})

router.post('/api/edit/links/', verify, async(req, res) => {
    //send data from client like this where x is stringified
    // const x = {

    // editData: [
    //         {
    //             "link": "linkdata"
    //             "name": "link name"
    //         },
    //         {
    //             "name": "link name"
    //             "link": "linkdata"
    //         }
    //     ]
    // }

    const editData = JSON.parse(req.query.editData);
    const id = req.user._id;
    let linkId = 1;
    let linkArray = [];
    links = editData.editData;
    console.log(links);

    try{
        for(let obj of links){
            const url = await fetchFavicon(obj.link)
            let linkObj = {
                id: linkId,
                linkURL: obj.link,
                name: obj.name,
                url,
            }
            linkId += 1
            linkArray.push(linkObj);
        }
    }catch(error){
        console.log(error)
        }


    User.updateOne(
        {_id: id},
        {
            $set:
            {
                links: linkArray
            }
        }
    ).then(data => res.send(data))
     .catch(err => console.log(err));

});

router.post('/api/upload/profilePicture/', verify, upload.array('image'), async (req, res) => {
    const id = req.user._id;
    let icon64, icon192, icon512;
    const file = req.files[0]

    //icon generation
    const overlay64 = new Buffer(
      '<svg><rect x="0" y="0" width="64" height="64" /></svg>'
    )
    const overlay192 = new Buffer(
      '<svg><rect x="0" y="0" width="192" height="192" /></svg>'
    )
    const overlay512 = new Buffer(
      '<svg><rect x="0" y="0" width="512" height="512" /></svg>'
    )

    sharp(file.path)
        .resize({width: 64, height: 64})
        .composite([{
            input: overlay64,
            blend: 'dest-in'
        }])
        .toBuffer()
        .then(async (data )=> {
            const result = await cloudinaryProfile.uploadBuffer(data)
            url = result.url.slice(4) + 's' + result.url.slice(4)
            icon64 = url
            console.log("icon64", result.url)
        })
        .catch(err => {
            console.log(err)
        })

    sharp(file.path)
        .resize({width: 192, height: 192})
        .composite([{
            input: overlay192,
            blend: 'dest-in'
        }])
        .toBuffer()
        .then(async (data )=> {
            const result = await cloudinaryProfile.uploadBuffer(data)
            url = result.url.slice(4) + 's' + result.url.slice(4)
            icon192 = url
            console.log("icon192", icon192)
        })
        .catch(err => {
            console.log(err)
        })
    sharp(file.path)
        .resize({width: 512, height: 512})
        .composite([{
            input: overlay512,
            blend: 'dest-in'
        }])
        .toBuffer()
        .then(async (data )=> {
            const result = await cloudinaryProfile.uploadBuffer(data)
            url = result.url.slice(4) + 's' + result.url.slice(4)
            icon512 = url
            fs.unlinkSync(file.path)

            User.updateOne(
                {_id: id},
                {
                    $set:
                    {
                        profilePicture: icon512,
                        icon64: icon64,
                        icon192: icon192,
                    }
                })
                .then(data => res.send(data))
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.log(err)

        })

    //icon generation end

})

//interaction apis
router.post('/api/addComment/', verifyViewer, (req, res) => {

    const editData = JSON.parse(req.query.editData);
    const commentData = editData.editData[0]
    const commentObj = {
        id: uniqid(),
        postID: commentData.postID,
        viewerUsername: commentData.viewerUsername,
        viewerName: commentData.viewerName,
        commentData: commentData.commentData,
        userUsername: commentData.userUsername,
        time: Date.now()
    }
    User.updateOne(
        {"username": commentObj.userUsername, "posts.id": commentObj.postID},
        { "$push":
            {
                "posts.$.comments": commentObj
            }
        }
    ).then(data => res.send(data))
        .catch(err => res.send(err))
})

router.post('/api/addCommentUser/', verify, (req, res) => {

    const editData = JSON.parse(req.query.editData);
    const commentData = editData.editData[0]
    const commentObj = {
        id: uniqid(),
        postID: commentData.postID,
        viewerUsername: commentData.viewerUsername,
        viewerName: commentData.viewerName,
        commentData: commentData.commentData,
        userUsername: commentData.userUsername,
        time: Date.now()
    }
    User.updateOne(
        {"username": commentObj.userUsername, "posts.id": commentObj.postID},
        { "$push":
            {
                "posts.$.comments": commentObj
            }
        }
    ).then(data => res.send(data))
        .catch(err => res.send(err))
})

router.post('/api/addLike/', verifyViewer, (req, res) => {
    const editData = JSON.parse(req.query.editData)
    const likeData = editData.editData[0]
    //postID redundant fix it
    const likeObj = {
        postID: likeData.postID,
        viewerUsername: likeData.viewerUsername,
        viewerName: likeData.viewerName,
        userUsername: likeData.userUsername
    }
    User.updateOne(
        {"username": likeObj.userUsername, "posts.id": likeObj.postID},
        { "$push":
            {
                "posts.$.likes": likeObj
            }
        }
    ).then(data => res.send(data))
        .catch(err => res.send(err))
})

module.exports = router;
