import { Bookings } from '../Model/BookingModel.js';

describe('BookingModel', () => {
  it('should export Bookings model', () => {
    expect(Bookings).toBeDefined();
    expect(typeof Bookings).toBe('function');
  });

  it('should have correct model name', () => {
    expect(Bookings.name).toBe('Bookings');
  });
});