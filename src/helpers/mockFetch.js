import { beefAndOysterPie } from './mocks';

const MOCKS = {
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52878': beefAndOysterPie,
};

const mockFetch = jest.fn((url) => Promise.resolve({
  json: jest.fn().mockResolvedValue(MOCKS[url]),
}));

export default mockFetch;
