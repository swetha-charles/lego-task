const { convertToGqlProduct } = require("./utils/convertToGqlProduct");

 const SERVICE_PRODUCTS_URL = 'http://localhost:4010';

const products = async (parent) => {
  let response;
  try {
    response = await fetch(SERVICE_PRODUCTS_URL + '/products');
  } catch (err) {
    throw new Error('Could not retrieve products', err);
  }

  const data = (await response.json()).results;

  const products = [];
  for (const product of data) {
    products.push(convertToGqlProduct(product));
  }
  return products;
};

module.exports = {
    products,
    SERVICE_PRODUCTS_URL
  };
  
  
  