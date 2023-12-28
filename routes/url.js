const express = require("express");
const { handleGenerateNewShortUrl, handleAnalyticClicks, handleRedirectToOriginalPage } = require("../controllers/url");

const router = express.Router();

router.post("/url", handleGenerateNewShortUrl);

router.get("/url/analytics/:shortId", handleAnalyticClicks);

router.get("/:shortId", handleRedirectToOriginalPage);

module.exports = router;