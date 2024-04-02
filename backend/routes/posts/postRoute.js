const express=require('express');
const postRoute = express.Router();
const {createPostCntrl,  updatePostCntrl, deletePostCntrl, fetchPostsCntrl, fetchSinglePostCntrl } = require('../../controllers/posts/postCntrl');
const protected=require("../../middlewares/protected")
const multer = require('multer');
const storage=require("../../config/cloudinary")

const upload = multer({storage});
// Create new Post 
postRoute.post('/', upload.single("file"),createPostCntrl );

// Fetching all Posts
postRoute.get('/', fetchPostsCntrl);

// Fetch Post by id
postRoute.get('/:id',fetchSinglePostCntrl );

// Update Post by id
postRoute.patch('/:id', protected, upload.single("file"), updatePostCntrl);

// Delete Posts by id
postRoute.delete('/:id', deletePostCntrl);


module.exports = { postRoute };