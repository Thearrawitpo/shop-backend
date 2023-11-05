const express = require("express");
const {
  createBanner,
  getBanner,
  getBannerById,
  deleteBannerById,
  updateBannerById,
} = require("./banner.services");
const multer = require("multer");
const { isAuthenticated } = require("../../middlewares");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res, next) => {
  try {
    const banners = await getBanner();

    res.json(banners);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  isAuthenticated,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const image = req.file.filename;
      const name = req.body.name;
      const shopId = Number(req.body.shopId);

      await createBanner({ name, image, shopId });

      res.json({
        test: "upload success",
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const banner = await getBannerById(id);

    res.json(banner);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteBannerById(id);

    res.json("delete success");
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/:id",
  isAuthenticated,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const image = req.file.filename;
      const name = req.body.name;
      const id = req.params.id;
      const shopId = Number(req.body.shopId);
      const body = {
        name: name,
        image: image,
        shopId: shopId,
      };
      await updateBannerById(id, body);

      res.json("update success");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
