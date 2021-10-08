const {
  createProductModel,
  getAllProductsModel,
  getProductByIdModel,
  updateProductModel,
  deleteProductModel,
} = require('../models/productsModel');

const createProductService = async ({ name, quantity }) => {
  const product = await createProductModel({ name, quantity });

  if (!product) return false;

  const { id } = product;

  return {
    id,
  };
};

const getAllProductsService = async () => {
  const products = await getAllProductsModel();

  return products;
};

const getProductByIdService = async (id) => {
  const product = await getProductByIdModel(id);

  return product;
};

const updateProductService = async ({ id, name, quantity }) => {
  const productUpdated = await updateProductModel({ id, name, quantity });

  return productUpdated;
};

const deleteProductService = async (id) => {
  const product = await deleteProductModel(id);

  if (!product) return null;

  return product;
};

module.exports = {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};