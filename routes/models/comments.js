const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user :
    {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    comment: 
    {
        type: String,
        required: true
    },
    rating: 
    {
        type : Number,
        require : true
    }},
    {
        timestamps : true
    }
);

var Comments = mongoose.model('Comment', commentSchema);
module.exports = Comments;