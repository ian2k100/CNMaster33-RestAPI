const User = require("./userModel");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
    try {
        // req is request and res is response 
        const newUser = await User.create(req.body);
        const token = await jwt.sign({ _id: newUser._id}, process.env.SECRET);
        console.log(`This is the request body ${newUser}`) //console.log(req.body)
        res.status(200).send({
            message: "Successfully created user",
            user: newUser.username,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
};

exports.login = async (req, res) => {
    try {
        res.status(200).send({ user: req.user.username });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Unseccessful, please check logs"});
    }
}

exports.testUser = async (req, res) => {
    try{
        res.status(200).send({message: "This is the test route"})
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
};

exports.findUser = async (req, res) => {
    try{
        findUser = await User.find({username: req.body.username});
        console.log(req.body);
        res.status(200).send({user: findUser})
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
}

exports.updateUser = async (req, res) => {
    try{
        if (req.body.newUsername) {
            let updateUser = await User.findOneAndUpdate(
                { email: req.body.email },
                { username: req.body.newUsername},
            )
            res.status(200).send({updateUser, message: `You have updated you're username to ${req.body.username}`})
        } else if (req.body.newEmail) {
                let updateUser = await User.findOneAndUpdate(
                    {username: req.body.username},
                    {email: req.body.newEmail},
                )
                res.status(200).send({updateUser, message: `You have updated you're email ${req.body.email}`})
        } else if (req.body.newPass) {
                let updateUser = await User.findOneAndUpdate(
                    {username: req.body.username},
                    {pass: req.body.newPass}
                )
                res.status(200).send({updateUser, message: `You have updated you're password ${req.body.pass}`})
        }else {
            res.status(404).send({
                error:"Cannot find or update the thing you wanted ",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }   
};

exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findOneAndDelete({
            username: req.body.username
        })
        res.status(200).send({deleteUser, message:`You have deleted ${deleteUser.username}`})
    } catch (error) {
        console.log(error)
        res.status(500).send({err: error.message})
    }
}