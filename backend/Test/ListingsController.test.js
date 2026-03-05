import { getAllListings, save } from '../Controller/ListingsController.js';

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
    create: jest.fn(),
  }
}));

describe('ListingsController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      user: { id: 1, role: 'host' },
      file: { filename: 'test-image.jpg' }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('getAllListings', () => {
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

      await getAllListings(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        data: mockListings,
        message: 'Products fetched successfully'
      });
    });

    it('should handle database errors', async () => {
      require('../Model/ListingModel.js').Listings.findAll.mockRejectedValue(new Error('Database error'));

      await getAllListings(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith(new Error('Database error'));
    });
  });

  describe('save', () => {
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

      mockReq.body = {
        ListingName: 'New Listing',
        Price: 150,
        Rooms: 2,
        Description: 'Beautiful place',
        ListingLocation: 'New City'
      };

      require('../Model/ListingModel.js').Listings.findAll.mockResolvedValue([]);
      require('../Model/ListingModel.js').Listings.create.mockResolvedValue(mockListing);

      await save(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({
        data: mockListing,
        message: 'Data saved successfully'
      });
    });

    it('should return 401 if user not authenticated', async () => {
      mockReq.user = null;

      await save(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Authentication required' });
    });

    it('should return 403 if user is not a host', async () => {
      mockReq.user.role = 'user';

      await save(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Only hosts can create listings' });
    });

    it('should handle file upload', async () => {
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

      mockReq.body = {
        ListingName: 'New Listing',
        Price: 150,
        Rooms: 2,
        Description: 'Beautiful place',
        ListingLocation: 'New City'
      };

      require('../Model/ListingModel.js').Listings.findAll.mockResolvedValue([]);
      require('../Model/ListingModel.js').Listings.create.mockResolvedValue(mockListing);

      await save(mockReq, mockRes);

      expect(mockListing.image_URLS).toEqual(['/uploads/test-image.jpg']);
    });

    it('should handle database errors', async () => {
      mockReq.body = {
        ListingName: 'New Listing',
        Price: 150,
        Rooms: 2,
        Description: 'Beautiful place',
        ListingLocation: 'New City'
      };

      require('../Model/ListingModel.js').Listings.findAll.mockRejectedValue(new Error('Database error'));

      await save(mockReq, mockRes);

      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
});