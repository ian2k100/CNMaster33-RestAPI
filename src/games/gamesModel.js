const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    gamesName: {
        type: String,
        required:true
    },

    gameSystem: {
        type: String,
        required: true
    },
    gamesGenre: {
        type: String,
        required: true
    }
})

const Games = mongoose.model("CIL-user-Games", gamesSchema);

module.exports = Games;