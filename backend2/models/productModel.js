const mongoose = require('mongoose')

const stcokSchema = mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    }
})

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    description : {
        type : String,
    },
    stocks : [stcokSchema],
    productType : {
        type: String,
        required : true
    }
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;