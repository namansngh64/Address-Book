require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/auth");
const addressRoutes = require("./routes/address")
const port = process.env.PORT || 5000;

//middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => console.log(err));

//server running
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});

//routes
app.use("/api", authRoutes);
app.use("/api", addressRoutes);