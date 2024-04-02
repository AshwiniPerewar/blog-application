const express=require('express');
const commentRoute = express.Router();
const {createCommentCntrl,  updateCommentCntrl, deleteCommentCntrl, fetchCommentsCntrl, fetchSingleCommentCntrl } = require('../../controllers/comments/CommentCntrl');
const protected=require("../../middlewares/protected")


// Fetching all Comments
commentRoute.get('/',fetchCommentsCntrl);

// Fetch Comment by id
commentRoute.get('/:id',fetchSingleCommentCntrl );

// Create new Comment 
commentRoute.post('/:id',protected, createCommentCntrl );


// Update Comment by id
commentRoute.patch('/:id',protected, updateCommentCntrl);


// Delete Comments by id
commentRoute.delete('/:id',protected, deleteCommentCntrl);


module.exports = { commentRoute };