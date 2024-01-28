const express = require("express");
const router = express.Router();
const { handleCreateNewUser, handleLoginUser, handleGetAnalytics, handleLogoutUser } = require("../controllers/user");
const { requireAuth } = require("../middlewares/authUser");

router
    .post("/signup", handleCreateNewUser)

    .post("/login", handleLoginUser)

    .get("/analytics", requireAuth, handleGetAnalytics)

    .get("/logout", handleLogoutUser);

module.exports = router;