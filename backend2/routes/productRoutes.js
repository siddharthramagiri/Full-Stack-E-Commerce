const express = require('express')
const {
    addProduct, 
    showProduct, 
    addToCart,
    addToWishlist,
    deleteFromCart
} = require('../controllers/productsController');

const adminAuthenticate = require('../middleware/authenticateAdmin');
const authenticateToke = require('../middleware/authenticateToken');


const productRoutes = express.Router();

productRoutes.post('/admin/:id/addproduct', authenticateToke, adminAuthenticate, 
    addProduct
);

productRoutes.get('/show/:pid', showProduct)
productRoutes.put('/addtoCart/:pid/:id', authenticateToke, addToCart)
productRoutes.put('/addtowish/:pid/:id', authenticateToke, addToWishlist)

productRoutes.delete('/deleteCart/:pid/:id', authenticateToke, deleteFromCart)


module.exports = productRoutes;