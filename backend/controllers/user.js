const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.json({ error: "No user found!" });
    }
    req.profile = user;
    req.profile.secret = undefined;
    req.profile.encry_password = undefined;
    next();
  });
};
