const convertToGqlProduct = (product) => {
  return {
    code: `${product.code}`,
    name: `${product.name}`,
    price: `${product.price}`,
  };
};
exports.convertToGqlProduct = convertToGqlProduct;
