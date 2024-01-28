const express = require("express");
const router = express.Router();
const { checkUser } = require("../middlewares/authUser");

router
    .get("/", checkUser, (req, res) => {
        res.render("home", {
            user: req.user,
        });
    })

    .get("/user/signup", (req, res) => {
        res.render("signup");
    })

    .get("/user/login", (req, res) => {
        res.render("login");
    })

module.exports = router;