const {Schema,model, default: mongoose}=require('mongoose');

// schema
const commentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    message: { type: String, required: true },
},
    { timestamps: true }
)

// compile schema to form comment model
const Comment=new model('comment',commentSchema);

module.exports= Comment;