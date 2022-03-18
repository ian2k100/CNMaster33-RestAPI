const { Router } = require("express");
const { addUser, login, testUser, findUser, updateUser, deleteUser } = require("./userControllers");
const { hashPass, decryptPassword, tokenAuth} = require("../middleware");
const userRouter = Router();


//http verbs and /user is the end point, this runs the function in insomina 
userRouter.post("/user", hashPass, addUser);

userRouter.get("/token", tokenAuth, login);

userRouter.post("/login", decryptPassword, login)

userRouter.get("/test", testUser);

userRouter.get("/find", findUser);

userRouter.put("/update", updateUser);

userRouter.delete("/delete", deleteUser);

module.exports = userRouter;