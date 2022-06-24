const express = require("express");
const userRouter = express.Router();
const user = require("../models/user");
const authMiddleware = require("../middlewares/auth");

userRouter.get("/register", (req, res) => {
  res.render("register");
});

userRouter.post("/register", (req, res) => {
  user.create(req.body, (err, user) => {
    console.log(err, user);
    res.redirect("/users/login");
  });
});

userRouter.get("/login", (req, res) => {
  console.log(req.flash("error"));
  res.render("login");
});

userRouter.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (!email && !password) {
    req.flash("error", "Invalid email/password");
    return res.redirect("/users/login");
  }
  user.findOne({ email }, (err, user) => {
    if (err) next(err);
    if (!user) {
      return res.redirect("/users/login");
    }
    user.validatePassword(password, (err, result) => {
      if (err) next(err);
      console.log(err, result);
    });
    req.session.userId = user.id;
    console.log(req.session);
    res.redirect("/users");
  });
});

userRouter.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/users/login");
});

userRouter.use(authMiddleware.loggedInUser);

userRouter.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.user);
  res.send("Login Success");
});

module.exports = userRouter;
