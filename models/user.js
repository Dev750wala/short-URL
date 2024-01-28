const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email']
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
            minlength: [6, 'Minimum password length is 6 characters'],
        }
    }, { timestamps: true },
);

// HASH PASSWORD BEFORE SAVING TO DATABASE
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });

    if(user) {
        // console.log(`${password}\n${user.password}`);
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        } 
        throw Error("Incorrect Password");
    } 
    throw Error("Incorrect Email");
}

const user = mongoose.model('user', userSchema);
module.exports = user;