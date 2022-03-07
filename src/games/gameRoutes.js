const { Router } = require('express');
const { addGames, FindGames, updateGames, deleteGames } = require('./gamesController');
const gamesRouter = Router();

gamesRouter.post("/gameadd", addGames);

gamesRouter.get("/gamefind", FindGames);

gamesRouter.put("/gameupdate", updateGames);

gamesRouter.delete("/gamedelete", deleteGames);

module.exports = gamesRouter;


