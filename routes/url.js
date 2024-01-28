const express = require("express");
const { handleGenerateShortURL, handleGetAnalytics, handleRedirectToOriginalURL } = require("../controllers/url");
const router = express.Router();
const { requireAuth } = require("../middlewares/authUser");

router
    .post("/", requireAuth ,handleGenerateShortURL)

    .get("/:shortID", handleRedirectToOriginalURL);

module.exports = router;