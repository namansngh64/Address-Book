const Address = require('../models/address')
const User = require('../models/user')
const { validationResult } = require("express-validator");
const user = require('../models/user');
const { findById } = require('../models/address');
exports.createAddress = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ error: errors.array()[0] });
    }
    req.body.creator = req.profile
    const address = new Address(req.body)
    address.save((err, address) => {
        if (err) {
            console.log(err)
            return res.json({ error: "Something went wrong!" })
        }
        User.findOneAndUpdate({ _id: req.profile._id }, {
            $push: {
                book: address._id
            }

        }, {
            new: true
        }, (err, user) => {
            if (err || !user) {
                return res.json({ error: "Invalid user." })
            }
            console.log("user updated.")
            return res.json({ message: "Address Created." })
        })
    })
}

exports.updateAddress = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ error: errors.array()[0] });
    }
    Address.findOneAndUpdate({
        _id: req.address._id
    }, {
        $set: req.body
    }, {
        new: true,
        useFindAndModify: false
    }, (err, address) => {
        if (err) {
            return res.json({ error: "Something went wrong!" })
        }
        return res.json({
            message: "Address updated!"
        })
    })
}
exports.getAddressById = (req, res, next, id) => {
    Address.findById(id, (err, address) => {
        if (err || !address) {
            return res.json({ error: "Address not found" })
        }
        req.address = address;
        next();
    })
}

exports.deleteAddress = (req, res) => {
    if (JSON.stringify(req.address.creator._id) != JSON.stringify(req.profile._id))
        return res.json({
            error: "you are not authorized to delete this address."
        })
    Address.findOneAndDelete({
        _id: req.address._id
    }, (err, address) => {
        if (err) {
            return res.json({ error: "Address does not exist." })
        }
        var arr = req.profile.book;
        var ind = arr.indexOf(address._id)
        arr.splice(ind, 1);
        User.findOneAndUpdate({ _id: req.profile._id }, {
            $set: {
                book: arr
            }
        }, {
            new: true
        }, (err, user) => {
            if (err || !user) {
                return res.json({ error: "Invalid user." })
            }
        })
        return res.json({
            message: "Address deleted successfully!"
        })
    })

}

exports.getAllUserAddresses = (req, res) => {
    Address.find({ creator: req.profile }).sort([
        ["updatedAt", "desc"]
    ]).exec((err, addresses) => {
        if (err) {
            return res.json({ error: "NO Address Found!" })
        }
        return res.json(addresses)
    })
}