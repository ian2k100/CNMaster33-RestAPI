const Games = require("./gamesModel");

exports.addGames = async (req, res) => {
    try {
        const newGames = Games.create(req.body);
        res.status(200).send({games: newGames});
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
}

exports.FindGames = async (req, res) => {
    try{
        const findGames = await Games.find({}).select("user.username gameName gameSystem gameGenre");
        res.status(200).send({findGames});
    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
}

exports.updateGames = async (req, res) => {
    try{
        if(req.body.newGamesName) {
            let updateGames = await Games.findOneAndUpdate(
                {username: req.body.username},
                {oldGamesName: req.body.gamesName},
                {newGamesName: req.body.newGamesName},
            )
            res.status(200).send({updateGames, message: `You've updated ${req.body.oldGamesName} to ${req.body.newGamesName}`})
        } else if(req.body.newGamesSystem) {
            let updateGames = await Games.findOneAndUpdate(
                {username: req.body.username},
                {gamesName: req.body.gamesName},
                {newGamesSystem: req.body.newGamesSystem}
            )
            res.status(200).send({updateGames, message: `You've updated ${req.body.gamesName} game system to ${req.body.newGamesSystem}`})
        } else if (req.body.newGamesGenre) {
            let updateGames = await Games.findOneAndUpdate(
                {username: req.body.username},
                {gamesName: req.body.gamesName},
                {newGamesGenre: req.body.newGamesGenre}
            )
            res.status(200).send({updateGames, message: `You've updated ${req.body.gamesName} genre to ${req.body.newGamesGenre}`})
        } else {
            res.status(404).send({
                error:"Cannot find or update the thing you wanted ",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }   
};

exports.deleteGames = async (req, res) => {
    try {
        const deleteGames = await Games.findOneAndDelete({
            username: req.user.username,
            gamesName: req.user.gamesname
        })
        res.status(200).send({deleteGames, message:`Tou have deleted ${deleteGames.gamesName}`})
    } catch (error) {
        console.log(error)
        res.status(500).send({err: error.message})
    }
}