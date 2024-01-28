const User = require("../models/user");
const jwt = require("jsonwebtoken");

const SECRET = "SE&^RFC%*$XDiu!@GV#$iuhnmk*%";

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, SECRET, (err, decodedToken) => {
            if(err) {
                res.redirect("/user/login");
            } else {
                next()
            }
        });
    } else {
        res.redirect("/user/login");
    }
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, SECRET, async (err, decodedToken) => {
            if(err) {
                req.user = null;

                next();
            } else {
                let user = await User.findById(decodedToken.id);

                req.user = user;
                // console.log(req.user.id);
                next();
            }
        });
    } else {
        req.user = null;
        next();
    }
};

module.exports = {
    requireAuth,
    checkUser,
}