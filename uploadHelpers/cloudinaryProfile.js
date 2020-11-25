const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
let streamifier = require('streamifier');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.uploadBuffer = async (buffer) => {

   return new Promise((resolve, reject) => {
     let cld_upload_stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
         }
       }
     );

     streamifier.createReadStream(buffer).pipe(cld_upload_stream);
   });

};

