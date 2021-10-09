const {
  getProductByIdModel,
} = require('./models/productsModel');

const isAvailableOnInventory = (req, res, next) => {
  const sales = req.body; // sales deve ser um array de objetos
  let ok = true;
  sales.forEach(async (sale, index) => {
    const { productId } = sale;
    const product = await getProductByIdModel(productId);
    if (product.quantity < sale.quantity) {
      ok = false;
      return res.status(404).json({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      });
    }
    if (index === sales.length - 1 && ok) next();
  });
};

const isSalesQuantityValid = (req, res, next) => {
  const sales = req.body; // sales deve ser um array de objetos

  const someQuantityInvalid = sales.some(
    (e) => e.quantity <= 0 || typeof (e.quantity) !== 'number',
  );

  if (someQuantityInvalid) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  next();
};

module.exports = { isSalesQuantityValid, isAvailableOnInventory };