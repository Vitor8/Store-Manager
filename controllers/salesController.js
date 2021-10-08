const {
  createSalesModel,
  getSalesModel,
  getSaleByIdModel,
  updateSaleModel,
  deleteSaleModel,
} = require('../models/salesModel');

const createSalesController = async (req, res) => {
  const arraySales = req.body;

  const { id } = await createSalesModel(arraySales);

  res.status(200).json({
    _id: id,
    itensSold: arraySales,
  });
};

const getSalesController = async (req, res) => {
  const sales = await getSalesModel();

  res.status(200).json({
    sales, 
  });
};

const getSaleByIdController = async (req, res) => {
  const { id } = req.params;

  const sale = await getSaleByIdModel(id);

  if (!sale) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }

  return res.status(200).json(sale);
};

const updateSaleController = async (req, res) => {
  const saleToUpdate = req.body;
  const { id } = req.params;

  const saleUpdated = await updateSaleModel(saleToUpdate, id);

  res.status(200).json(saleUpdated);
};

const deleteSaleController = async (req, res) => {
  const { id } = req.params;

  if (id.length !== 24) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }

  const sale = await deleteSaleModel(id);

  res.status(200).json(sale);
};

module.exports = {
  createSalesController,
  getSalesController,
  getSaleByIdController,
  updateSaleController,
  deleteSaleController,
};