const express = require('express');
const bodyParser = require('body-parser');

const {
  isNameValid,
  isQuantityValid,
} = require('./productsValidations');

const {
  isSalesQuantityValid,
} = require('./salesValidations');

const {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} = require('./controllers/productsController');

const {
  createSalesController,
  getSalesController,
  getSaleByIdController,
  updateSaleController,
  deleteSaleController,
} = require('./controllers/salesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// npm test products.test.js

// http POST :3000/products name='Produto do Brunão' quantity:=100
// http POST :3000/products name='abcd' quantity:=100
// http POST :3000/products name='Produto do Batista' quantity:=-2
// http POST :3000/products name='Produto do Batista' quantity:=0
// http POST :3000/products name='Produto do Batista' quantity:=100
app.post('/products', isNameValid, isQuantityValid, createProductController);

// http GET :3000/products/61602be6d00a3821f1893cf1
app.get('/products/:id', getProductByIdController);

// http PUT :3000/products/61602be6d00a3821f1893cf1 name='PlayStation 5' quantity:=1
app.put('/products/:id', isNameValid, isQuantityValid, updateProductController);

// http DELETE :3000/products/61602bc3d00a3821f1893cf0
app.delete('/products/:id', deleteProductController);

// http GET :3000/products
app.get('/products', getAllProductsController);

// npm test sales.test.js
app.post('/sales', isSalesQuantityValid, createSalesController);

// http GET :3000/sales
app.get('/sales', getSalesController);

// http GET :3000/sales/id
app.get('/sales/:id', getSaleByIdController);

// http PUT :3000/sales/id
app.put('/sales/:id', isSalesQuantityValid, updateSaleController);

// http DELETE :3000/sales/id
app.delete('/sales/:id', deleteSaleController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
