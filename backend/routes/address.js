const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

const { getUserById } = require("../controllers/user");
const {
    createAddress,
    getAddressById,
    updateAddress,
    deleteAddress,
    getAllUserAddresses
} = require("../controllers/address");

router.param("userId", getUserById);
router.param("addressId", getAddressById);

router.post("/create/:userId",
    body("name", "Enter valid name").isLength({ min: "3" }),
    body("address", "Enter valid address").isLength({ min: 10 }),
    isSignedIn,
    isAuthenticated,
    createAddress
)

router.put("/update/:userId/:addressId",
    body("name", "Enter valid name").isLength({ min: "3" }),
    body("address", "Enter valid address").isLength({ min: 10 }),
    isSignedIn,
    isAuthenticated,
    updateAddress
)

router.delete("/delete/:userId/:addressId",
    isSignedIn,
    isAuthenticated,
    deleteAddress
)

router.get("/addresses/:userId",
    isSignedIn,
    isAuthenticated,
    getAllUserAddresses
)
module.exports = router