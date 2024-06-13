const { convertToGqlProduct } = require('./utils/convertToGqlProduct');

const SERVICE_PRODUCTS_URL = process.env.SERVICE_PRODUCTS_URL;

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

const product = async (parent, { code }) => {
  let response;

  try {
    response = await fetch(SERVICE_PRODUCTS_URL + `/products/${code}`);
  } catch (err) {
    throw new Error('Could not retrieve product', err);
  }

  const data = await response.json();
  if (data.code && data.name && data.price) {
    return convertToGqlProduct(data);
  } else {
    return null;
  }
};

module.exports = {
  products,
  product,

};
