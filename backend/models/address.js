const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });



module.exports = mongoose.model("Address", addressSchema);