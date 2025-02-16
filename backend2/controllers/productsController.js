const Product = require('../models/productModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');


const updateStocks = (stocks, existingStocks) => {
    const stockMap = new Map();
    existingStocks.map(({size, stock}) => stockMap.set(size,stock))
    stocks.map(({size, stock}) => {
        const count = stockMap.get(size);
        count == null ? stockMap.set(size,1) : stockMap.set(size,count+stock);
    })
    return Array.from(stockMap, ([size, stock]) => ({size, stock}));
}

const addProduct = async (req, res) => {
    try {
        let { productName, price, image, category, stocks, description, productType} = req.body;
        if (!productName || !price || !image || !category || !stocks) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const imageExists = await Product.findOne({ image: image });
        let product = await Product.findOne({ productName: productName });
        if (imageExists && product) {
            let ExistingStocks = product.stocks;
            ExistingStocks = updateStocks(stocks, ExistingStocks);
            const id = product.id;
            
            product = await Product.findByIdAndUpdate(id,{stocks : ExistingStocks})

            return res.status(200).json({
                message: "Incremented stocks and Updated",
                product: product
             });

        } else if (imageExists) {
            return res.status(400).json({ message: "Product already existed" });
        }

        console.log(req.body);
        const newProduct = new Product(req.body);

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error saving product:", error); // Log the error details
        res.status(400).json({
            message: "Error Adding Product",
            error: error.message // Send the error message in the response
        });
    }
};


const showProduct = async(req, res) => {
    const pid = req.params.pid;
    try {
        const product = await Product.findById(pid);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(404).json({message : "Product Not Found"});
    }
}


const addToCart = async(req, res) => {
    try {
        const id = req.params.id;
        const pid = req.params.pid;
        const product = await Product.findById(pid);
        if(!product) {
            return res.status(400).json({message : "Product Does't Exists"});
        }

        const updated = await User.findByIdAndUpdate(id,
            { $addToSet : {cart : pid} },
            {new : true}
        ).populate('cart');

        if(!updated) {
            return res.status(400).json({message : "User Does't Exists"});
        }

        res.status(200).json({message : "Added to cart", updated});
    } catch (error) {
        res.status(404).json({message : "Couldn't Add Product to cart"});
    }
}

const addToWishlist = async(req, res) => {
    try {
        const {id, pid} = req.params;
        const product = await Product.findById(pid);
        if(!product) {
            return res.status(400).json({message : "Product Does't Exists"});
        }

        const updated = await User.findByIdAndUpdate(id,
            { $addToSet : {wishlist : pid} },
            {new : true}
        ).populate('wishlist');

        if(!updated) {
            return res.status(400).json({message : "User Does't Exists"});
        }

        res.status(200).json({message : "Added to wishlist", updated});
    } catch (error) {
        res.status(404).json({message : "Couldn't Add Product to wishlist"});
    }
}


const deleteFromCart = async(req, res) => {
    try {
        const {id, pid} = req.params;
        const user = await User.findByIdAndUpdate(id,
            { $pull: {cart : pid}},
            {new : true}
        )
        console.log(user);

        if(!user) {
            return res.status(404).json({message : "User Doesn't exist"});
        }
        res.status(200).json({message : "Deleted From the cart", user})
    } catch (error) {
        return res.status(404).json({message : "Error Deleting Product"});
    }
}

const showAllProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({message : "Error Loading Products"});
    }

}

module.exports = {
    addProduct,
    showProduct,
    addToCart,
    addToWishlist,
    deleteFromCart,
    showAllProducts
}