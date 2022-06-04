const { validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { expressjwt } = require("express-jwt");

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array()[0] });
  }
  const { email, password, isCookie } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.json({ error: "User not found!" });
    }
    if (user.authenticate(password)) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: "120s"
      });
      if (user.activated === 0) {
        return res.json({ error: "Account not activated!" });
      }
      if (isCookie) {
        //keep me logged in
        const reftoken = jwt.sign({ _id: user._id }, process.env.REFSECRET, {
          expiresIn: "30d",
          audience: "ref"
        });
        res.cookie("reftoken", reftoken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30
        });
      } else {
        const reftoken = jwt.sign({ _id: user._id }, process.env.REFSECRET, {
          expiresIn: "12h",
          audience: "ref"
        });
        res.cookie("reftoken", reftoken, {
          httpOnly: true
        });
      }
      const { name, email } = user;
      return res.json({ token, user: { name, email } });
    } else {
      return res.json({ error: "Password Incorrect!" });
    }
  });
};

const sendMail = (userId, otp) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "merntest64@gmail.com",
      pass: process.env.EPASS
    }
  });
  var mailoptions = {
    from: "merntest64@gmail.com",
    to: userId,
    subject: "Verify your Account",
    html: `<center>
    <h1>Hey There! Welcome to Address Book!</h1><br>
    <h2>${otp}</h2>
          <br>
          <h3>
         is your OTP for activating the account<br>
         Happy Adress Booking!
         </h3></center>
        
          `
  };
  transporter
    .sendMail(mailoptions)
    .then(() => {
      console.log("Sent!");
    })
    .catch((err) => console.log(err));
};

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array()[0] });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.json({ error: "User already exists!" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    sendMail(user.email, otp);
    const encry_otp = jwt.sign({ otp: otp }, process.env.OTPSECRET, {
      expiresIn: "300s",
      audience: "otp"
    });
    res.cookie("otp", encry_otp, {
      httpOnly: true,
      maxAge: 1000 * 60 * 5
    });
    return res.json(user._id);
  });
};

exports.verifyOtp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array()[0] });
  }
  if (!req.cookies.otp) {
    return res.json({ error: "Generate OTP again!" });
  }
  const { otp } = req.body;
  const d_otp = jwt.verify(req.cookies.otp, process.env.OTPSECRET);
  if (d_otp.aud != "otp")
    return res.json({ error: "Oops! Something went wrong!" });
  if (d_otp.otp != otp) {
    return res.json({ error: "Invalid OTP" });
  }
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { activated: 1 },
    { new: true },
    (err, user) => {
      if (err || !user) return res.json({ error: "No user found!" });
      return res.json({
        message: "Account Activated Successfully! Signin to continue!"
      });
    }
  );
};

exports.signout = (req, res) => {
  if (req.cookies.reftoken) res.clearCookie("reftoken");
  return res.json({ message: "Signed Out Successfully!" });
};

exports.genToken = (req, res) => {
  if (!req.cookies.reftoken) {
    return res.json({ token: undefined });
  }
  const reftoken = jwt.verify(req.cookies.reftoken, process.env.REFSECRET);
  if (reftoken.aud != "ref") {
    return res.json({ token: undefined });
  }
  const token = jwt.sign({ _id: reftoken._id }, process.env.SECRET, {
    expiresIn: "120s"
  });
  return res.json({ token: token, userId: reftoken._id });
};

//validate bearer token
exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth"
});

//validate payload id and client id
exports.isAuthenticated = (req, res, next) => {
  var check = req.auth && req.profile && req.auth._id == req.profile._id;
  if (!check) {
    return res.json({ error: "User not authenticated!" });
  }
  next();
};
