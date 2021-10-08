const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const createSalesModel = async (sales) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

  const { insertedId: id } = await productsCollection.insertOne({ itensSold: sales });

  return {
    id,
  };
};

const getSalesModel = async () => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

  const sales = await productsCollection.find().toArray();

  return sales;
};

const getSaleByIdModel = async (id) => {
  if (id.length !== 24) return null;

  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

  const product = await productsCollection.findOne({ _id: ObjectId(id) });

  if (!product) return null;

  return product; 
};

const updateSaleModel = async (saleToUpdate, id) => {
  const updatedSale = { itensSold: saleToUpdate };

  const saleUpdated = await mongoConnection.getConnection()
    .then((db) => {
      const productId = new ObjectId(id);
      return db.collection('sales')
        .findOneAndUpdate({ _id: productId }, { $set: updatedSale }, { returnOriginal: false })
        .then((result) => result.value);
    });

  return saleUpdated;
};

const deleteSaleModel = async (id) => {
  const salesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

  const sale = await salesCollection.findOne({ _id: ObjectId(id) });

  await salesCollection.deleteOne({ _id: ObjectId(id) });

  return sale; 
};

module.exports = {
  createSalesModel,
  getSalesModel,
  getSaleByIdModel,
  updateSaleModel,
  deleteSaleModel,
};