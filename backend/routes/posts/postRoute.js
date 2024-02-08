const express=require('express');
const postRoute = express.Router();
const {createPostCntrl,  updatePostCntrl, deletePostCntrl, getPostCntrl, getPostByidCntrl } = require('../../controllers/posts/postCntrl');


// Fetching all Posts
postRoute.get('/', getPostCntrl);

// Fetch Post by id
postRoute.get('/:id',getPostByidCntrl );

// Create new Post 
postRoute.post('/register',createPostCntrl );


// Update Post by id
postRoute.patch('/:id', updatePostCntrl);


// Delete Posts by id
postRoute.delete('/:id', deletePostCntrl);


module.exports = { postRoute };