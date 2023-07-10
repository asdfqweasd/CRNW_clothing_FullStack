const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/:type/:id", productController.getById);

module.exports = router;
