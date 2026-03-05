import { Bookings } from '../Model/BookingModel.js';
import { DataTypes } from 'sequelize';

// Mock sequelize
jest.mock('sequelize', () => ({
  DataTypes: {
    INTEGER: 'INTEGER',
    DATE: 'DATE',
    FLOAT: 'FLOAT',
    ENUM: 'ENUM',
    TEXT: 'TEXT'
  }
}));

jest.mock('../db/db.js', () => ({
  sequelize: {
    define: jest.fn()
  }
}));

describe('BookingModel', () => {
  it('should define Bookings model with correct attributes', () => {
    expect(require('../db/db.js').sequelize.define).toHaveBeenCalledWith('Bookings', {
      id: {
        type: 'INTEGER',
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: 'INTEGER',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      listingId: {
        type: 'INTEGER',
        allowNull: false,
        references: {
          model: 'Listings',
          key: 'id'
        }
      },
      checkInDate: {
        type: 'DATE',
        allowNull: false
      },
      checkOutDate: {
        type: 'DATE',
        allowNull: false
      },
      numberOfRooms: {
        type: 'INTEGER',
        allowNull: false,
        defaultValue: 1
      },
      totalPrice: {
        type: 'FLOAT',
        allowNull: false
      },
      status: {
        type: 'ENUM',
        values: ['pending', 'confirmed', 'completed', 'cancelled'],
        defaultValue: 'pending'
      },
      notes: {
        type: 'TEXT',
        allowNull: true
      }
    });
  });

  it('should export Bookings model', () => {
    expect(Bookings).toBeDefined();
  });
});