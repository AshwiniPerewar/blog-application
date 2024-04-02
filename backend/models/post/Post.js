const {Schema,model,mongoose}=require('mongoose');

// schema
const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true,enum:["html","css","reactjs","js","nodejs",
"expressjs","mongodb"] },
    coverImage: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    comments:{ type: mongoose.Schema.Types.ObjectId, ref: "comment" },
},
    { timestamps: true }
)

// compile schema to form post model
const Post=new model('post',postSchema);

module.exports=Post;