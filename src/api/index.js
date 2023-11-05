const express = require("express");
const auth = require("./auth/auth.routes");
const banner = require("./banner/banner.routes");
const shop = require("./shop/shop.routes");
const users = require("./users/users.routes");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

router.use("/auth", auth);
router.use("/users", users);
router.use("/banner", banner);
router.use("/shop", shop);

module.exports = router;
