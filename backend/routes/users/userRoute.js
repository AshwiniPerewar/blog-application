const express=require('express');
const userRoute = express.Router();
const protected=require("../../middlewares/protected")
const {registerUserCntrl, loginCntrl, updateUserCntrl, deleteUserCntrl, fetchUserCntrl, fetchUserByidCntrl, profileCntrl, updatePasswordCntrl, uploadProfileImageCntrl, uploadCoverImageCntrl } = require('../../controllers/users/userCntrl');
const multer = require('multer');
const storage=require("../../config/cloudinary")

const upload = multer({storage});
// Fetching all Users
userRoute.get('/', fetchUserCntrl);

// upload profile image 
userRoute.put('/profile-image-upload',
    protected,
    upload.single('file'),
    uploadProfileImageCntrl);

// upload profile image 
userRoute.put('/cover-image-upload',
    protected,
    upload.single('file'),
    uploadCoverImageCntrl);

// Fetch user by id
userRoute.get('/profile',protected,profileCntrl );


// egister new user 
userRoute.post('/signup',registerUserCntrl );


// user login
userRoute.post('/login',loginCntrl);

// Update user password by id
userRoute.patch('/update-password/:id', updatePasswordCntrl);

// Fetch user by id
userRoute.get('/:id',fetchUserByidCntrl );

// Update user details by id
userRoute.patch('/:id', updateUserCntrl);

// Delete users by id
userRoute.delete('/:id', deleteUserCntrl);


module.exports = userRoute;