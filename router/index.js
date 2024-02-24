const express = require("express");
const User = require("../models/user-model");
const userController = require("../controllers/user-controller");

const userRouter = express.Router();

//user-routes
userRouter.post("/registration", async (res, req) => {
  await res.send("hello");
});
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh", userController.refresh);
userRouter.get("/activate", userController.activate);
userRouter.get("/users", userController.getUsers);

module.exports = userRouter;
