import { createBooking, getUserBookings } from '../Controller/BookingController.js';

// Mock the models
jest.mock('../Model/UserModel.js', () => ({
  Users: {
    findByPk: jest.fn(),
    findAll: jest.fn(),
  }
}));

jest.mock('../Model/BookingModel.js', () => ({
  Bookings: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  }
}));

jest.mock('../Model/ListingModel.js', () => ({
  Listings: {
    findByPk: jest.fn(),
  }
}));

describe('BookingController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      user: { id: 1 }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('createBooking', () => {
    it('should create a booking successfully', async () => {
      const mockListing = {
        id: 1,
        Rooms: 5,
        Price: 100
      };

      const mockBooking = {
        id: 1,
        userId: 1,
        listingId: 1,
        checkInDate: '2024-01-01',
        checkOutDate: '2024-01-03',
        numberOfRooms: 2,
        totalPrice: 400,
        status: 'pending'
      };

      mockReq.body = {
        listingId: 1,
        checkInDate: '2024-01-01',
        checkOutDate: '2024-01-03',
        numberOfRooms: 2,
        notes: 'Test booking'
      };

      require('../Model/ListingModel.js').Listings.findByPk.mockResolvedValue(mockListing);
      require('../Model/BookingModel.js').Bookings.create.mockResolvedValue(mockBooking);

      await createBooking(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Booking created successfully',
        data: mockBooking
      });
    });

    it('should return 400 if user not authenticated', async () => {
      mockReq.user = null;

      await createBooking(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not authenticated' });
    });

    it('should return 400 if required fields are missing', async () => {
      mockReq.body = { listingId: 1 }; // missing other required fields

      await createBooking(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Missing required booking details' });
    });

    it('should return 404 if listing not found', async () => {
      mockReq.body = {
        listingId: 999,
        checkInDate: '2024-01-01',
        checkOutDate: '2024-01-03',
        numberOfRooms: 1
      };

      require('../Model/ListingModel.js').Listings.findByPk.mockResolvedValue(null);

      await createBooking(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Listing not found' });
    });

    it('should return 400 if not enough rooms available', async () => {
      const mockListing = {
        id: 1,
        Rooms: 2,
        Price: 100
      };

      mockReq.body = {
        listingId: 1,
        checkInDate: '2024-01-01',
        checkOutDate: '2024-01-03',
        numberOfRooms: 5 // more than available
      };

      require('../Model/ListingModel.js').Listings.findByPk.mockResolvedValue(mockListing);

      await createBooking(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Not enough rooms available' });
    });

    it('should handle database errors', async () => {
      mockReq.body = {
        listingId: 1,
        checkInDate: '2024-01-01',
        checkOutDate: '2024-01-03',
        numberOfRooms: 1
      };

      require('../Model/ListingModel.js').Listings.findByPk.mockRejectedValue(new Error('Database error'));

      await createBooking(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error creating booking',
        error: 'Database error'
      });
    });
  });

  describe('getUserBookings', () => {
    it('should get user bookings successfully', async () => {
      const mockBookings = [
        {
          id: 1,
          userId: 1,
          listingId: 1,
          checkInDate: '2024-01-01',
          checkOutDate: '2024-01-03',
          numberOfRooms: 2,
          totalPrice: 400,
          status: 'pending',
          Listings: { id: 1, ListingName: 'Test Listing' },
          Users: { id: 1, customerName: 'John Doe' }
        }
      ];

      require('../Model/BookingModel.js').Bookings.findAll.mockResolvedValue(mockBookings);

      await getUserBookings(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Bookings retrieved successfully',
        data: mockBookings
      });
    });

    it('should return 400 if user not authenticated', async () => {
      mockReq.user = null;

      await getUserBookings(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not authenticated' });
    });
  });
});