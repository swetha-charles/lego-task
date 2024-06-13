const mockProducts = require('./__mocks__/service-products/products.json');
const emptyProducts = require('./__mocks__/service-products/empty-products.json');
const {
  products,
  product,
  SERVICE_PRODUCTS_URL,
} = require('./productsResolver');
const { convertToGqlProduct } = require('./utils/convertToGqlProduct');

const mockParent = {};

describe('products resolver', () => {
  describe('get all products', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockProducts),
        })
      );
    });

    it('should return all products', async () => {
      const expectedData = mockProducts.results.map((product) =>
        convertToGqlProduct(product)
      );

      const data = await products(mockParent);
      expect(data).toEqual(expectedData);
    });

    it('should request expected URL', async () => {
      await products(mockParent);

      expect(fetch).toHaveBeenCalledWith(`${SERVICE_PRODUCTS_URL}/products`);
    });

    it('should return empty list when there are no products', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(emptyProducts),
        })
      );

      const data = await products(mockParent);
      expect(data).toEqual([]);
    });

    it('should throw error when network request fails ', async () => {
      global.fetch = jest.fn(() => Promise.reject());

      expect(() => products(mockParent)).rejects.toThrow(
        'Could not retrieve products'
      );
    });
  });
});
