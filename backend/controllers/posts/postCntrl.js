const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");
const { decryptToken } = require("../../utils/generateToken");
const handleValidationErrDB = require("../../utils/validationError");
const { ObjectId } = require('mongodb');

// create new Post controller
const createPostCntrl=async(req, res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decryptUser = decryptToken(token);
        const id = decryptUser.id;
        console.log(id)
        const{title,content,category} = req.body;
        const newPost = await Post.create({title,content,category,coverImage:req.file.path,user:id});
        await User.findByIdAndUpdate(id, { $push: { posts: newPost._id } })
        res.send({message:"Post Created Successfully",newPost})
    }
    catch (err) {
        res.send(next(handleValidationErrDB(err)));
    }
}


// fetching all Posts
const fetchPostsCntrl = async (req, res, next) => {
    let { sortBy, category } = req.query;
    console.log(category)
    // const sortBy = req.query;
    console.log(sortBy)
     try {
         const posts = await Post.find(category ? {category}:{}).sort(sortBy).limit(10).populate("user");
        res.send({ message: "Fetched All Posts Successfully", posts })
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

// fetching Post by id
const fetchSinglePostCntrl = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const id = req.params.id;
        const post = await Post.findById(id).populate("user").populate({ path: "comments" });
        res.send({ message: "Post Fetched Successfully", post })
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

// update Post controller
const updatePostCntrl=async(req, res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decryptUser = decryptToken(token);
        const { title, content, category } = req.body;
        const coverImage = req.body.file ? req.body.file : req.file.path;
        const findPost = await Post.findById(req.params.id);
        if (decryptUser.id == findPost.user) {
                console.log(decryptUser.id , findPost.user)
                await Post.findByIdAndUpdate(req.params.id, { title, content, category,coverImage });
                res.send({ message: "Post Updated Successfully" })
            }
            else
                return (next(appErr("You are not allowed to update this post",403)))       
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

// delete Post controller
const deletePostCntrl=async(req, res,next) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        // const decryptUser = decryptToken (token);
        const findPost = await Post.findByIdAndDelete(req.params.id);
        // if(decryptUser.id==findPost.user)
        // {
        // await Post.findByIdAndDelete(id);
        res.send({message:"Post Deleted Successfully"})
        // }
        // else
        //     return(next(appErr("You are not allowed to delete this post" ,403)))
    }
    catch (err) {
        res.send(next(appErr(err.message)));
    }
}

module.exports = {
    fetchPostsCntrl,fetchSinglePostCntrl,createPostCntrl, updatePostCntrl, deletePostCntrl
}