const {Schema,model,mongoose}=require('mongoose');

// schema
const UserSchema = new Schema({
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profileImage: { type: String },
    coverImage: { type: String},
    posts: [{ type: mongoose.Schema.Types.ObjectId,  ref: "Post" }],
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}]
},
    { timestamps: true }
)

// compile schema to form user model
const User=new model('user',UserSchema);

module.exports=User;