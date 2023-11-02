const { db } = require("../../lib/db");

function createShop(data) {
  return db.shop.create({
    data: data,
  });
}

function getShop() {
  return db.shop.findMany();
}

function getShopById(id) {
  return db.shop.findUnique({ where: { id: Number(id) } });
}

async function deleteShopById(id) {
  return db.shop.delete({ where: { id: Number(id) } });
}

async function updateShopById(id, body) {
  return db.shop.update({ where: { id: Number(id) }, data: body });
}

module.exports = {
  createShop,
  getShop,
  getShopById,
  deleteShopById,
  updateShopById,
};
