const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/index");

// Here all  the routes define for manage Product API
router.post("/create", Controllers.create);
router.get("/", Controllers.GetProducts);
router.get("/:id", Controllers.GetProductsByID);
router.post("/:id/update_quantity", Controllers.update);
``;
router.delete("/:id", Controllers.delete);
router.get("*", (req, res) => {
  res.send("<h1>404</h1>");
});

module.exports = router;