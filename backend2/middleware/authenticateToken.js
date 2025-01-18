const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


const authenticateToke = async(req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization
        if(authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            if(!token) {
                return res.status(400).json({message : "User is Not Authenticated"});
            }
        }
        console.log("User is Authenticated. \n token :  ", token)
        const user = jwt.verify(token, process.env.ACCESS_TOKEN);
        const id = req.params.id;
        if(user.id !== id) {
            return res.status(404).json({message : "Request Failed"});
        }
        next();
    } catch (err) {
        res.status(404).json({message : "Authorization Declined"});
    }
}

module.exports = authenticateToke;