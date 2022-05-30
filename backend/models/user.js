const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      length: 40
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    userInfo: {
      type: string,
      trim: true
    },
    phone: {
      type: Number,
      trim: true,
      required: true
    },
    activated: {
      type: Number,
      default: 0
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    salt: {
      type: String
    },
    encry_password: {
      type: String,
      required: true
    },
    book: {
      type: Array,
      default: []
    },
    profile_pic: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: "true" }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  securePassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  authenticate: function (password) {
    if (this.securePassword(password) === this.encry_password) return true;
    else return false;
  }
};

module.exports = mongoose.model("User", userSchema);
