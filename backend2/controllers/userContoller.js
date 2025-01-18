const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToke = require('../middleware/authenticateToken');
const Product = require('../models/productModel');


const loginHandler = async(req, res) => {
    const {email, password} = await req.body;
    const user = await User.findOne({email : email});
    if(!user) {
        return res.status(404).json({message : "User Email Doesn't Exists"});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(404).json({message: "Password is Invalid"});
    }
    const token = jwt.sign({
        username : user.username,
        email,
        id: user._id
    }, process.env.ACCESS_TOKEN, {expiresIn: '24h'});

    res.header('Authorization', token);
    res.status(200).json({message : "Logged in Successfully",
        id : user._id,
        token : token,
        user : user
    });
}

const signupHandler = expressAsyncHandler(async(req, res) => {
    try {
        const {username, email, password, isAdmin} = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({message: 'Please fill all fields'});
        }
        const userExists = await User.findOne({email, username});
        if(userExists) {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {...req.body, password: hashedPassword};
        const user = await User.create(newUser);

        const token = jwt.sign({
            username : user.username, 
            email,
            id: user._id
        }, process.env.ACCESS_TOKEN, {expiresIn: '24h'});
        
        res.header('Authorization', token);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({
            message : "Failed to Sign Up",
            error : error.message
        });
    }
})

const postUserDetails = expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const {country, city, address, pincode, phone} = await req.body;
    if(!country || !city || !address || !pincode || !phone) {
        return res.status(400).json({message : "Some Fields are Missing"});
    }
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user) {
            return res.send(404).json({message : "User Not Found to Update"});
        }
        if (user.phone === phone) {
            console.log("Same phone number");
            await User.findByIdAndUpdate(id, {country, city, address, pincode})
        } else {
            console.log("Different phone number");
            await User.findByIdAndUpdate(id, req.body);
        }
        const UpdatedUser = await User.findById(id);
        console.log(UpdatedUser);
        res.status(200).json({message : `Updated Details of ${UpdatedUser.username} Successfully`});
    } catch (err) {
        return res.status(400).json({message : "Error in Updating the Details, Phone number is Already registered"});
    }
    return;
})

const getUserDetails = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({messaage : "User Not Found"});
        }
        const {country, city, address, pincode, phone, isAdmin} = user;
        const details = {country, city, address, pincode, phone, isAdmin};
        res.status(200).json(details);
    } catch (error) {
        res.status(404).json({message : "Error Getting Details"});
    }
}

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find({}).sort({updatedAt : -1})
        res.status(200).json(users);
    } catch (error) {
        return res.status(404).json({message : "Error Loading Users"});
    }
}


const showCart = async(req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({message : "User doesm't exist"});
        }

        const products = await Promise.all(
            user.cart.map((prod) => Product.findById(prod))
        );

        console.log(products);
        return res.status(200).json(products);

    } catch (error) {
        return res.status(404).json({message : "Couldn't Load Cart Products"})
    }
}

module.exports = {
    loginHandler,
    signupHandler,
    postUserDetails,
    getUserDetails,
    getAllUsers,
    showCart
};