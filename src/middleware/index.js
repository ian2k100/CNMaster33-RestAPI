const bcrypt = require("bcrypt");
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
        if (await bcrypt.compare(req.body.password, userinfo.password)){
            req.user = userInfo;
        } else {
            res.status(500).send({ message: "You have entered the wrong password"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message})
    }
}