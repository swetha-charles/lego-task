const mockCharacters = require('./__mocks__/service-characters/characters.json');
const emptyCharacters = require('./__mocks__/service-characters/empty-characters.json');
const {
  characters,
  character
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

  describe('get specific character', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockCharacters.results[0]),
        })
      );
    });

    it('should return correct character', async () => {
      const expectedData = mockCharacters.results[0];

      const data = await character(mockParent, { code: '4' });
      expect(data).toEqual(expectedData);
    });

    it('should request expected URL', async () => {
      await character(mockParent, { id: '4' });

      expect(fetch).toHaveBeenCalledWith(`${SERVICE_CHARACTERS_URL}/characters/4`);
    });

    it('should return null if no character found', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({}),
        })
      );

      const data = await character(mockParent, { id: '4' });
      expect(data).toBeNull();
    });

    it('should throw error when network request fails ', async () => {
      global.fetch = jest.fn(() => Promise.reject());

      expect(() => character(mockParent, { id: '4' })).rejects.toThrow(
        'Could not retrieve character'
      );
    });
  });
});
