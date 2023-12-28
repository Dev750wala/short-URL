const express = require("express");
const urlRoute = require("./routes/url") 
const { connectMongoDb } = require("./connection");
const URL = require("./models/url");

const app = express();
const PORT = 3000;

connectMongoDb("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("Mongo connected"))
    .catch((err) => console.log("Some error: ", err));

app.use(express.json());

app.use("/", urlRoute);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});