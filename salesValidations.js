// - Será validado que não é possível cadastrar vendas com quantidade menor que zero
// - Será validado que não é possível cadastrar vendas com quantidade igual a zero
// - Será validado que não é possível cadastrar vendas com uma string no campo quantidade

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

module.exports = { isSalesQuantityValid };