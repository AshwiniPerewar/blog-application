const Post = require("../../models/post/Post");

// fetching all Posts
const getPostCntrl = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.send({ message: "Fetched By Id Successfully", posts })
    }
    catch (err) {
        res.send(err);
    }
}

// fetching Post by id
const getPostByidCntrl = async (req, res) => {
    try {
        const id = req.params.id();
        console.log(id)
        const singlePost = await Post.findById(id);
        res.send({ message: "Fetched By Id Successfully", singlePost })
    }
    catch (err) {
        res.send(err);
    }
}

// create new Post controller
const createPostCntrl=async(req, res) => {
    try {
        console.log(req.body)

        const{title,description,category,coverImage} = req.body;
        const newPost = await new Post({title,description,category,coverImage});
        console.log(newPost)
        newPost.save();
        res.send({message:"Created Successfully",newPost})
    }
    catch (err) {
        console.log(err)

        res.send(err);
    }
}



// update Post controller
const updatePostCntrl=async(req, res) => {
    try {
        const id = req.params.id;
        const updatePost = await Post.findByIdAndUpdate(id,req.body);
        res.send({message:"Updated Successfully"})
    }
    catch (err) {
        res.send(err);
    }
}

// delete Post controller
const deletePostCntrl=async(req, res) => {
    try {
        const id = req.params.id;
        await Post.findByIdAndDelete(id);
        res.send({message:"Deleted Successfully"})
    }
    catch (err) {
        res.send(err);
    }
}

module.exports = {
    getPostCntrl,getPostByidCntrl,createPostCntrl, updatePostCntrl, deletePostCntrl
}