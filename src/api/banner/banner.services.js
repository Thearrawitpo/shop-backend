const { db } = require("../../lib/db");
const fs = require("fs");

function createBanner(banner) {
  return db.banner.create({
    data: banner,
  });
}

function getBanner() {
  return db.banner.findMany();
}

function getBannerById(id) {
  return db.banner.findUnique({ where: { id: Number(id) } });
}

async function deleteBannerById(id) {
  const banner = await db.banner.findUnique({ where: { id: Number(id) } });
  fs.unlink(`src/public/images/${banner.image}`, function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Successfully deleted the file.");
    }
  });
  return db.banner.delete({ where: { id: Number(id) } });
}

async function updateBannerById(id, body) {
  const banner = await db.banner.findUnique({ where: { id: Number(id) } });
  fs.unlink(`src/public/images/${banner.image}`, function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Successfully deleted the file.");
    }
  });
  return db.banner.update({ where: { id: Number(id) }, data: body });
}

module.exports = {
  createBanner,
  getBanner,
  getBannerById,
  deleteBannerById,
  updateBannerById,
};
