const {Schema,model,mongoose}=require('mongoose');

// schema
const postSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true,enum:["reactjs","css","js"] },
    coverImage: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    comment:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
},
    { timestamps: true }
)

// compile schema to form post model
const Post=new model('post',postSchema);

module.exports=Post;