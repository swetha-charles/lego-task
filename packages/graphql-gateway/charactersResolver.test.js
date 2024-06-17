const mockCharacters = require('./__mocks__/service-characters/characters.json');
const emptyCharacters = require('./__mocks__/service-characters/empty-characters.json');
const {
  characters,
} = require('./charactersResolver');

const mockParent = {};

const SERVICE_CHARACTERS_URL = process.env.SERVICE_CHARACTERS_URL;

describe('characters resolver', () => {
  describe('get all characters', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockCharacters),
        })
      );
    });

    it('should return all characters', async () => {
      const data = await characters(mockParent);
      expect(data).toEqual(mockCharacters.results);
    });

    it('should request expected URL', async () => {
      await characters(mockParent);

      expect(fetch).toHaveBeenCalledWith(`${SERVICE_CHARACTERS_URL}/characters`);
    });

    it('should return empty list when there are no products', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(emptyCharacters),
        })
      );

      const data = await characters(mockParent);
      expect(data).toEqual([]);
    });

    it('should throw error when network request fails ', async () => {
      global.fetch = jest.fn(() => Promise.reject());

      expect(() => characters(mockParent)).rejects.toThrow(
        'Could not retrieve characters'
      );
    });
  });
});
