const {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} = require('../services/productsService');

const createProductController = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await createProductService({ name, quantity });

  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  const { id } = product;

  res.status(201).json({
    _id: id,
    name,
    quantity,
  });
};

const getAllProductsController = async (req, res) => {
  const products = await getAllProductsService();

  res.status(200).json({
    products,
  });
};

const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const product = await getProductByIdService(id);

  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  res.status(200).json(product);
};

const updateProductController = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const productUpdated = await updateProductService({ id, name, quantity });

  return res.status(200).json(productUpdated);
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const product = await deleteProductService(id);

  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  res.status(200).json(product);
};

module.exports = {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};