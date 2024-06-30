const express = require('express');
const { handleGenerateShortUrl, handleRedirectUrl, handleUrlAnalytics } = require('../controllers/url');

const router = express.Router();

router.post("/", handleGenerateShortUrl);
router.get("/:shortId", handleRedirectUrl);
router.get("/analytics/:shortId", handleUrlAnalytics)

module.exports = router;