const {
  createSalesModel,
} = require('./productsService');

const createSalesService = async (sales) => {
  const { id } = await createSalesModel(sales);
 
  return {
    id,
  };
};

module.exports = {
  createSalesService,
};