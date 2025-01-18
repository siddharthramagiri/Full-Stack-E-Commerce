const User = require('../models/userModel');

const adminAuthenticate = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if(user.isAdmin) next();
        else return res.status(404).json({message : "Admin Authorization Failed"});
    } catch (error) {
        return res.status(404).json({message : "Admin Not found"});
    }
}

module.exports = adminAuthenticate