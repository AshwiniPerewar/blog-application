const Comment = require("../../models/comment/Comment");

// fetching all Comments
const getCommentCntrl = async (req, res) => {
    try {
        const Comment = await Comment.find({});
        res.send({ message: "Fetched By Id Successfully", Comment })
    }
    catch (err) {
        res.send(err);
    }
}

// fetching Comment by id
const getCommentByidCntrl = async (req, res) => {
    try {
        const id = req.params.id();
        console.log(id)
        const singleComment = await Comment.findById(id);
        res.send({ message: "Fetched By Id Successfully", singleComment })
    }
    catch (err) {
        res.send(err);
    }
}

// create new Comment controller
const createCommentCntrl=async(req, res) => {
    try {
        console.log(req.body)

        const{user,message} = req.body;
        const newComment = await new Comment({user,message});
        console.log(newComment)
        newComment.save();
        res.send({message:"Created Successfully",newComment})
    }
    catch (err) {
        console.log(err)

        res.send(err);
    }
}



// update Comment controller
const updateCommentCntrl=async(req, res) => {
    try {
        const id = req.params.id;
        const updateComment = await Comment.findByIdAndUpdate(id,req.body);
        res.send({message:"Updated Successfully"})
    }
    catch (err) {
        res.send(err);
    }
}

// delete Comment controller
const deleteCommentCntrl=async(req, res) => {
    try {
        const id = req.params.id;
        await deleteComment.findByIdAndDelete(id);
        res.send({message:"Deleted Successfully"})
    }
    catch (err) {
        res.send(err);
    }
}

module.exports = {
    getCommentCntrl,getCommentByidCntrl,createCommentCntrl, updateCommentCntrl, deleteCommentCntrl
}