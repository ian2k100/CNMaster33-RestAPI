const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user/userModel.js");

exports.hashPass = async (req, res, next) => {
    try {
        // const tempPass = req.body.pass;
        // const hashedPass = await bcrypt.hash(tempPass, 8);
        // req.body.pass = hashedPass
        req.body.pass = await bcrypt.hash(req.body.pass, 8);
        next();
    } catch (error) {
        console.log(error)
        res.status(500).send({err: error.message});
    }
}

exports.decryptPassword = async(req, res, next) => {
    try { 
        const userInfo = await User.findOne({ username: req.body.username });
        if (await bcrypt.compare(req.body.password, userInfo.password)){
            req.user = userInfo;
            next();
        } else {
            res.status(500).send({ message: "You have entered the wrong password"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message})
    }
}

exports.tokenAuth = async (req,res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer", "");
        const decoded = await jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded._id);
        req.user = user;
        next(); 
    } catch (error){
        console.log(error);
        res.status(500).send({ err: error.message})
    }
}