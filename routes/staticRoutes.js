const express = require('express');
const { handleHomeRender } = require('../controllers/url');

const router = express.Router();

router.get("/", handleHomeRender);

router.get("/signup", (req, res) => {
    return res.render("signup");
})
router.get("/login", (req, res) => {
    return res.render("login");
});
module.exports = router;