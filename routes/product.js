const express = require("express");
const router = express.Router();

const {
	getAllProducts,
	getAllProductsStatic,
} = require("../controllers/products");

const authMiddleware = require("../middleware/auth");

router.route("/").get(authMiddleware, getAllProducts);
router.route("/static").get(authMiddleware, getAllProductsStatic);

module.exports = router;
