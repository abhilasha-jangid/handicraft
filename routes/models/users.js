const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    pincode:
        {
            type: String,
            required: true
        },
    password:
        {
            type: String,
            required: true
        },
    phone:
        {
            type: String,
            unique: true,
            required: true
        },
    address:
        {
            type: String,
            require: true
        },
    email:
        {
            type: String,
            unique: true,
            sparse: true
        },
    cart:
        [
            {
                product:
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Product'
                    },
                quantity:
                    {
                        type: Number
                    }
            }

        ],
    fb:
        {
            fb_id: {
                type: String,
                unique: true,
                sparse: true
            },
            image_url: {
                type: String,
                unique: true,
                sparse: true
            }
        }
});

var Users = mongoose.model('User', userSchema);
module.exports = Users;