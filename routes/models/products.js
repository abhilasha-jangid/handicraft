const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
    price: 
    {
        type : Number,
        require : true
    }
});

var Products = mongoose.model('Product', productSchema);
module.exports = Products;