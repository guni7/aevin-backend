const multer = require('multer');

//storage engine

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null,Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(!file.mimetype === 'image/jpeg' || !file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb({ message: 'Unsupported file format' }, false)
    }
    cb(null, true)
}

const upload = multer({
    storage: storage ,
    fileFilter: fileFilter
})

module.exports = upload;
