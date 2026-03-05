import request from 'supertest';
import express from 'express';
import { listingRouter } from '../Routes/listingsRoutes.js';

// Mock the models
jest.mock('../Model/UserModel.js', () => ({
  Users: {
    findByPk: jest.fn(),
    findAll: jest.fn(),
  }
}));

jest.mock('../Model/ListingModel.js', () => ({
  Listings: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  }
}));

// Mock middleware
jest.mock('../middleware/authMiddleware.js', () => ({
  authenticate: (req, res, next) => {
    req.user = { id: 1, role: 'host' };
    next();
  },
  requireHost: (req, res, next) => {
    if (req.user.role === 'host') {
      next();
    } else {
      res.status(403).json({ message: 'Host access required' });
    }
  },
  requireAdmin: (req, res, next) => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Admin access required' });
    }
  }
}));

// Mock upload middleware
jest.mock('../middleware/uploadConfig.js', () => ({
  upload: {
    single: () => (req, res, next) => {
      req.file = { filename: 'test-image.jpg' };
      next();
    }
  }
}));

const app = express();
app.use(express.json());
app.use('/api/listings', listingRouter);

describe('Listing Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/listings/getAllListings', () => {
    it('should get all listings successfully', async () => {
      const mockListings = [
        {
          id: 1,
          ListingName: 'Test Listing',
          Price: 100,
          Rooms: 3,
          Description: 'A nice place',
          ListingLocation: 'Test City',
          host: { id: 1, customerName: 'John Doe' }
        }
      ];

      require('../Model/ListingModel.js').Listings.findAll.mockResolvedValue(mockListings);

      const response = await request(app)
        .get('/api/listings/getAllListings');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Products fetched successfully');
      expect(response.body.data).toEqual(mockListings);
    });

    it('should handle database errors', async () => {
      require('../Model/ListingModel.js').Listings.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/listings/getAllListings');

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/listings', () => {
    it('should create a new listing successfully for host', async () => {
      const mockListing = {
        id: 1,
        ListingName: 'New Listing',
        Price: 150,
        Rooms: 2,
        Description: 'Beautiful place',
        ListingLocation: 'New City',
        hostId: 1,
        image_URLS: ['/uploads/test-image.jpg']
      };

      require('../Model/ListingModel.js').Listings.findAll.mockResolvedValue([]);
      require('../Model/ListingModel.js').Listings.create.mockResolvedValue(mockListing);

      const response = await request(app)
        .post('/api/listings')
        .send({
          ListingName: 'New Listing',
          Price: 150,
          Rooms: 2,
          Description: 'Beautiful place',
          ListingLocation: 'New City'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Data saved successfully');
    });

    it('should return 403 for non-host users', async () => {
      // Temporarily modify the authenticate mock
      const authModule = require('../middleware/authMiddleware.js');
      const originalAuthenticate = authModule.authenticate;
      authModule.authenticate = (req, res, next) => {
        req.user = { id: 1, role: 'user' };
        next();
      };

      const response = await request(app)
        .post('/api/listings')
        .send({
          ListingName: 'New Listing',
          Price: 150,
          Rooms: 2,
          Description: 'Beautiful place',
          ListingLocation: 'New City'
        });

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Only hosts can create listings');

      // Restore original mock
      authModule.authenticate = originalAuthenticate;
    });
  });
});