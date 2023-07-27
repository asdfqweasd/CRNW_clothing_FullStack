const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/:type/:id", productController.getById);
router.get("/all", productController.getAll);

module.exports = router;
