const express=require('express');
const commentRoute = express.Router();
const {createCommentCntrl,  updateCommentCntrl, deleteCommentCntrl, getCommentCntrl, getCommentByidCntrl } = require('../../controllers/comments/CommentCntrl');


// Fetching all Comments
commentRoute.get('/', getCommentCntrl);

// Fetch Comment by id
commentRoute.get('/:id',getCommentByidCntrl );

// Create new Comment 
commentRoute.post('/register',createCommentCntrl );


// Update Comment by id
commentRoute.patch('/:id', updateCommentCntrl);


// Delete Comments by id
commentRoute.delete('/:id', deleteCommentCntrl);


module.exports = { commentRoute };