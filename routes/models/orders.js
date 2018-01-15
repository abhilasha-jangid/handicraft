const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    
    user :
    {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    product :
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    }]
},
{
    timestamps : true
});

var Orders = mongoose.model('Order', orderSchema);
module.exports = Orders;