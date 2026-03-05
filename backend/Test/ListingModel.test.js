import { Listings } from '../Model/ListingModel.js';

describe('ListingModel', () => {
  it('should export Listings model', () => {
    expect(Listings).toBeDefined();
    expect(typeof Listings).toBe('function');
  });

  it('should have correct model name', () => {
    expect(Listings.name).toBe('Listings');
  });
});