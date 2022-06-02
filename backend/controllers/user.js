const User = require("../models/user");
const formidable = require("formidable");
const _ = require("lodash")
const fs = require('fs')
const { IncomingForm } = require("formidable");
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.json({ error: "No user found!" });
        }
        req.profile = user;
        req.profile.secret = undefined; //hide secret
        req.profile.encry_password = undefined; //hide encrypted password 
        next();
    });
};

exports.updateUser = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtension = true;

    form.parse(req, (err, fields, file) => {

        if (err) {
            return res.json({ error: "Problem with image!" });
        }
        const { name, phone, address, userInfo } = fields
        if (!name || !phone || !address || !userInfo) {
            return res.json({ error: "Provide all info" });
        }

        let user = req.profile;
        user = _.extend(user, fields); //allows to access extra fields 
        if (file.profile_pic) {
            if (file.profile_pic.size > 3000000) {
                return res.json({ error: "File size too big!" })
            }

            user.profile_pic.data = fs.readFileSync(file.profile_pic.filepath) //adding an attribute
            user.profile_pic.contentType = file.profile_pic.mimetype
        }
        User.findOneAndUpdate({ _id: req.profile._id }, {
            $set: {
                "name": user.name,
                "address": user.address,
                "phone": user.phone,
                "userInfo": user.userInfo,
                "profile_pic": user.profile_pic
            }
        }, {
            new: true,
            useFindAndModify: false
        }, (err, user) => {
            if (err) {
                return res.json({ error: "user not updated!" })
            }
            return res.json({ message: "updated successfully!" })
        })
    });

}
exports.getUser = (req, res) => {
    return res.json(req.profile)
}