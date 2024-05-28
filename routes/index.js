var express = require("express");
var router = express.Router();
var debug = require("debug")("express-site-example:server");

// GET home page.
router.get("/", function (req, res) {
    debug("API GET / called");
    res.redirect("/catalog");
});

module.exports = router;
