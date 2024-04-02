const cloudinary=require( 'cloudinary').v2;
const multer = require("multer-storage-cloudinary");
         
cloudinary.config({ 
  cloud_name: 'dfmxnuf5k', 
  api_key: '955585744756561', 
  api_secret: 'Dc_C-TnQp2WloiP53vBBSBWo0OY' 
});


const storage = new multer.CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "joeg", "png"],
    params: {
        folder: "blog-application",
    Transformation: [{ width: 400, height: 400 , crop:"limit"}]
    }
});

module.exports = storage;