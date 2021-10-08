const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

// db.products.find({ "name": "Produto do Inacio" }).pretty();
// db.products.find({ "name": "Inacio" }).pretty();
// db.products.find().pretty();
// db.products.findOne({ "name": "Produto do Inacio" });
// db.products.findOne({ "name": "Inacio" });

const getByName = async (name) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  // Se o filme não exisistir, filmNotExists será nulo
  const filmNotExists = await productsCollection
    .findOne({ name });

  if (!filmNotExists) return true;

  return false;
};

const createProductModel = async ({ name, quantity }) => {
  const filmNotExists = await getByName(name);

  if (!filmNotExists) return false;

  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: id } = await productsCollection
    .insertOne({ name, quantity });

  return {
    id,
  };
};

const getAllProductsModel = async () => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const products = await productsCollection.find().toArray();

  return products;
};

const getProductByIdModel = async (id) => {
  // Tenho que ver como faço pra ver se o id que recebi está no formato correto para o mongodb
  if (id.length !== 24) return null;

  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const product = await productsCollection.findOne({ _id: ObjectId(id) });

  return product; 
};

const updateProductModel = async ({ id, name, quantity }) => {
  const updatedProduct = { name, quantity };

  const productUpdated = await mongoConnection.getConnection()
    .then((db) => {
      const productId = new ObjectId(id);
      return db.collection('products')
        .findOneAndUpdate({ _id: productId }, { $set: updatedProduct }, { returnOriginal: false })
        .then((result) => result.value);
    });

  return productUpdated;
};

const deleteProductModel = async (id) => {
  if (id.length !== 24) return null;

  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const product = await productsCollection.findOne({ _id: ObjectId(id) });

  await productsCollection.deleteOne({ _id: ObjectId(id) });

  return product; 
};

module.exports = {
  createProductModel,
  getAllProductsModel,
  getProductByIdModel,
  updateProductModel,
  deleteProductModel,
};