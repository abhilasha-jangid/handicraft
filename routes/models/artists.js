const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: 
    {
        type: String,
        unique: true,
        required: true,
    },
    discription :
    {
        type : String
    },
    image_url : 
    {
        type : String,
        unique : true,
        required : true
    },
    featured:
    {
        type : Boolean
    }
});

var Artists = mongoose.model('Artist', artistSchema);
module.exports = Artists;
