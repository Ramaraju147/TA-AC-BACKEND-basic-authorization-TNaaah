const userModel = require("../models/user");
module.exports = {
  loggedInUser: (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.redirect("/users/login");
    }
  },

  userInfo: (req, res, next) => {
    console.log(req.session);
    let userId = req.session && req.session.userId;
    console.log(userId);
    if (userId) {
      userModel.findById(userId, "name email", (err, user) => {
        if (err) next(err);
        req.user = user;
        res.locals.user = user;
        console.log(req.user);
        next();
      });
    } else {
      req.user = null;
      res.locals.user = null;
      next();
    }
  },
};
