const express = require("express");
const hatController = require("../controllers/hatController");
const router = express.Router();

router.get("/:id", hatController.getById);

module.exports = router;
