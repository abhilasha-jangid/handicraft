
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:
        {
            type: String,
            unique: true,
            required: true,
        },
    product:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
    category_image:
        {
            type: String
        }
});

var Categories = mongoose.model('Category', categorySchema);
module.exports = Categories;