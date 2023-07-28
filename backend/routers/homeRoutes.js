const express = require("express");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(isAuthenticatedUser);

module.exports = router;
