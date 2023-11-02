const express = require("express");
const emojis = require("./emojis");
const auth = require("./auth/auth.routes");
const banner = require("./banner/banner.routes");
const shop = require("./shop/shop.routes");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

router.use("/emojis", emojis);
router.use("/auth", auth);
router.use("/banner", banner);
router.use("/shop", shop);

module.exports = router;
