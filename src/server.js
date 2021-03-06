require("./db/connection");
const express = require("express");
const cors = require("cors")
const userRouter = require("./user/userRoutes");
const gamesRouter = require("./games/gameRoutes");
const app = express();
const port = 5001; 

app.use(express.json());

app.use(cors());

app.use(userRouter);
app.use(gamesRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});