const mongoose = require("mongoose");
const Games = require("../games/gamesModel");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    },
    games: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `${Games}`,
        unique: false
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;