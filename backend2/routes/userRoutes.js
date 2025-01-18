const express = require('express');
const authenticateToke = require('../middleware/authenticateToken.js')
const adminAuthenticate = require('../middleware/authenticateAdmin.js')


const {
    loginHandler, 
    signupHandler, 
    postUserDetails,
    getUserDetails,
    getAllUsers,
    showCart
} = require('../controllers/userContoller.js');


const userRoutes = express.Router();

userRoutes.post('/login', loginHandler)
userRoutes.post('/signup', signupHandler)
userRoutes.get('/admin/:id/getAllusers', authenticateToke, adminAuthenticate, getAllUsers)
userRoutes.get('/details/:id', authenticateToke, getUserDetails)
userRoutes.put('/updatedetails/:id', authenticateToke, postUserDetails)
userRoutes.get('/cart/:id', showCart)

module.exports = {userRoutes};