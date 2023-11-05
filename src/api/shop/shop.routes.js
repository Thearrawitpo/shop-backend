const express = require("express");
const { isAuthenticated } = require("../../middlewares");

const {
  createShop,
  getShop,
  getShopById,
  deleteShopById,
  updateShopById,
} = require("./shop.services");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await getShop();

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const name = req.body.name;
    const lat = req.body.lat;
    const lng = req.body.lng;

    await createShop({ name, lat, lng });

    res.json({
      test: "upload success",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await getShopById(id);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteShopById(id);

    res.json("delete success");
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = {
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng,
    };
    await updateShopById(id, body);

    res.json("update success");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
