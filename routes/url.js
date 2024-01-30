const express = require("express");
const { handleGenerateShortURL, handleGetAnalytics, handleRedirectToOriginalURL } = require("../controllers/url");
const router = express.Router();
const { requireAuth, checkUser } = require("../middlewares/authUser");

router
    .post("/", requireAuth, checkUser ,handleGenerateShortURL)

    .get("/:shortID", handleRedirectToOriginalURL)


module.exports = router;