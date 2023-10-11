var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");

/* GET users listing. */
router.get("/", productController.getAllProducts);

router.post("/", productController.registerNewProduct);

router.get("/:id", productController.getAProduct);

router.put("/update/:id", productController.updateProduct);

router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
