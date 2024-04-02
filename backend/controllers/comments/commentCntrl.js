const Comment = require("../../models/Comment/Comment");
const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");
const { decryptToken } = require("../../utils/generateToken");
const handleValidationErrDB = require("../../utils/validationError");

// create new Comment controller
const createCommentCntrl=async(req, res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decryptUser = decryptToken (token);
        const { message } = req.body;
        // create comment
        const newComment = await Comment.create({ user: decryptUser.id, message });
        const commentid = newComment._id;
        // push comment id into post collection
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$push:{comments:commentid}})
        // push comment id into user collection
        const updatedUser=await User.findByIdAndUpdate(decryptUser.id,{$push:{comments:commentid}})
        res.send({message:"Comment Created Successfully",newComment})
    }
    catch (err) {
        res.send(err);
    }
}


// fetching all Comments
const fetchCommentsCntrl = async (req, res,next) => {
    try {
        const Comments = await Comment.find({});
        res.send({ message: "Fetched All Comments Successfully", Comments })
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

// fetching Comment by id
const fetchSingleCommentCntrl = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id)
        const singleComment = await Comment.findById(id);
        res.send({ message: "Comment Fetched Successfully", singleComment })
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

// update Comment controller
const updateCommentCntrl=async(req, res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decryptUser = decryptToken (token);
        const { message } = req.body;
        const findComment = await Comment.findById(req.params.id);
        console.log(findComment)
            if (decryptUser.id == findComment.user) {
                await Comment.findByIdAndUpdate(req.params.id, { message });
                res.send({ message: "Comment Updated Successfully" })
            }
            else
                return (next(appErr("You are not allowed to update this Comment",403)))       
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

// delete Comment controller
const deleteCommentCntrl=async(req, res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decryptUser = decryptToken(token);
        console.log(req.params.id)
        const findComment = await Comment.findById(req.params.id);
        console.log(findComment)
        if(decryptUser.id==findComment.user)
        {
            const deleted=await Comment.findByIdAndDelete(req.params.id);
            console.log(deleted)
        res.send({message:"Comment has been 8Deleted Successfully"})
        }
        else
            return(next(appErr("You are not allowed to delete this Comment" ,403)))
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

module.exports = {
    fetchCommentsCntrl,fetchSingleCommentCntrl,createCommentCntrl, updateCommentCntrl, deleteCommentCntrl
}