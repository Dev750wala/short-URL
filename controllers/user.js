const User = require("../models/user");
const jwt = require("jsonwebtoken");
const URL = require("../models/url");

const SECRET = "SE&^RFC%*$XDiu!@GV#$iuhnmk*%";
const max_age = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, SECRET, {
        expiresIn: max_age,
    });
};

const handleErrors = (err) => {
    console.log(err.message);
    let errors = { email: '', password: '' };
  
    if (err.message === 'Incorrect Email') {
        errors.email = 'That email is not registered';
        return errors;
    }

    if (err.message === 'Incorrect Password') {
        errors.password = 'That password is incorrect';
        return errors;
    }
  
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }
  
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
  
    return errors;
}


async function handleCreateNewUser(req, res) {
    let { fullName, email, password } = req.body;

    try {
        // console.log(`${fullName}\n${email}\n${password}`);
        const user = await User.create({
            fullName: fullName,
            email: email,
            password: password,
        });
        // console.log(user._id);
        const token = createToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: max_age*1000
        });

        res.status(201).json({ user: user._id });

    } catch (err) {
        const errors = handleErrors(err);
        return res.json({ errors });
    }
}


async function handleLoginUser(req, res) {
    let { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: max_age*1000
        });
        res.status(200).json({ user: user._id });

    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        return res.json({ errors });
    }
}   


async function handleGetAnalytics(req, res) {
    try {
        const link = await URL.find({ createdBy: req.user.id });

        return res.render("analytics", {
            user: req.user,
            analytics: link,
        });
    } catch(err) {
        return res.json({ message: "You have not shortened any URL yet." });
    }
        
}

async function handleLogoutUser(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect("/");
}

module.exports = {
    handleCreateNewUser,
    handleLoginUser,
    handleGetAnalytics,
    handleLogoutUser
}