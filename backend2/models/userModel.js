const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    country : {
        type: String,
        default: ""
    }, 
    city : {
        type: String,
        default: "",
    }, 
    address: {
        type: String,
        default: "",
    },
    pincode: {
        type : String,
        default: "",
    },
    phone: {
        type: String,
        unique : true,
        default : "",
    },
    cart: [
        type = mongoose.Schema.Types.ObjectId,
        ref = 'Product'
    ],
    orders: [
        type = mongoose.Schema.Types.ObjectId,
        ref = 'Product'
    ],
    wishlist: [
        type = mongoose.Schema.Types.ObjectId,
        ref = 'Product'
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});


module.exports = mongoose.model('User', userSchema);