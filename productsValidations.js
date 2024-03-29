const isNameValid = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '' || name.length < 5) { 
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
};

const isQuantityValid = (req, res, next) => {
  const { quantity } = req.body;

  if (!quantity || quantity === '' || quantity <= 0) { 
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  if (typeof (quantity) !== 'number') {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  next();
};

module.exports = { isNameValid, isQuantityValid };