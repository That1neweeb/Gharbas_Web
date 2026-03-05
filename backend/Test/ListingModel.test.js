import { Listings } from '../Model/ListingModel.js';
import { DataTypes } from 'sequelize';

// Mock sequelize
jest.mock('sequelize', () => ({
  DataTypes: {
    INTEGER: 'INTEGER',
    STRING: 'STRING',
    FLOAT: 'FLOAT',
    ARRAY: jest.fn(() => 'ARRAY')
  }
}));

jest.mock('../db/db.js', () => ({
  sequelize: {
    define: jest.fn()
  }
}));

describe('ListingModel', () => {
  it('should define Listings model with correct attributes', () => {
    expect(require('../db/db.js').sequelize.define).toHaveBeenCalledWith('Listings', {
      id: {
        type: 'INTEGER',
        primaryKey: true,
        autoIncrement: true
      },
      ListingName: {
        type: 'STRING',
        allowNull: false
      },
      Price: {
        type: 'FLOAT',
        allowNull: false
      },
      Rooms: {
        type: 'INTEGER',
        allowNull: false
      },
      Description: {
        type: 'STRING',
        allowNull: false
      },
      ListingLocation: {
        type: 'STRING',
        allowNull: false
      },
      image_URLS: {
        type: 'ARRAY',
        allowNull: true
      },
      hostId: {
        type: 'INTEGER',
        allowNull: true,
        comment: 'references Users.id - the host who created this listing'
      }
    });
  });

  it('should export Listings model', () => {
    expect(Listings).toBeDefined();
  });

  it('should call ARRAY with correct parameters for image_URLS', () => {
    expect(DataTypes.ARRAY).toHaveBeenCalledWith('STRING', 100);
  });
});