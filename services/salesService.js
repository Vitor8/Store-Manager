const {
  createSalesModel,
} = require('./productsService');

const createSalesService = async (sales) => {
  const isQuantityCorrect = await createSalesModel(sales); 
  
  if (!isQuantityCorrect) return false;

  const { id } = isQuantityCorrect;
 
  return {
    id,
  };
};

module.exports = {
  createSalesService,
};