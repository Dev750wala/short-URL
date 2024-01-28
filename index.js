const express = require("express");
const { connectToMongoDB } = require("./connection");
const urlRouter = require("./routes/url");
const path = require("path");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middlewares/authUser");

const PORT = 3000;

// connect to Data Base
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() => {
        console.log(`MongoDB connected`);
    },
    err => {
        console.log(`Unexpected Error Occured: ${err}`);
    }
);

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('*', checkUser);
app.use("/user", userRouter);
app.use("/url", urlRouter);
app.use("/", staticRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});