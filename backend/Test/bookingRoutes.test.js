import request from 'supertest';
import express from 'express';
import { bookingRouter } from '../Routes/bookingRoutes.js';
import { sequelize } from '../db/db.js';

// Mock the database
jest.mock('../db/db.js', () => ({
  sequelize: {
    define: jest.fn(),
    sync: jest.fn(),
  }
}));

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

// Mock middleware
jest.mock('../middleware/authMiddleware.js', () => ({
  authenticate: (req, res, next) => {
    req.user = { id: 1, role: 'user' };
    next();
  },
  requireAdmin: (req, res, next) => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Admin access required' });
    }
  }
}));

const app = express();
app.use(express.json());
app.use('/api/bookings', bookingRouter);

describe('Booking Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/bookings', () => {
    it('should create a new booking successfully', async () => {
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

      require('../Model/ListingModel.js').Listings.findByPk.mockResolvedValue(mockListing);
      require('../Model/BookingModel.js').Bookings.create.mockResolvedValue(mockBooking);

      const response = await request(app)
        .post('/api/bookings')
        .send({
          listingId: 1,
          checkInDate: '2024-01-01',
          checkOutDate: '2024-01-03',
          numberOfRooms: 2,
          notes: 'Test booking'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Booking created successfully');
      expect(response.body.data).toEqual(mockBooking);
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/bookings')
        .send({
          listingId: 1,
          // missing other required fields
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Missing required booking details');
    });

    it('should return 404 if listing not found', async () => {
      require('../Model/ListingModel.js').Listings.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/bookings')
        .send({
          listingId: 999,
          checkInDate: '2024-01-01',
          checkOutDate: '2024-01-03',
          numberOfRooms: 1
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Listing not found');
    });
  });

  describe('GET /api/bookings', () => {
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
          Listings: { id: 1, ListingName: 'Test Listing', Price: 100 },
          Users: { id: 1, customerName: 'John Doe' }
        }
      ];

      require('../Model/BookingModel.js').Bookings.findAll.mockResolvedValue(mockBookings);

      const response = await request(app)
        .get('/api/bookings');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Bookings retrieved successfully');
      expect(response.body.data).toEqual(mockBookings);
    });
  });
});