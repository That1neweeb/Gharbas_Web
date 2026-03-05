import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import {
    createBooking,
    getUserBookings,
    getBookingById,
    cancelBooking,
    updateBookingStatus,
    getAllBookings,
    getHostBookings,
    approveBooking,
    rejectBooking
} from '../Controller/BookingController.js';
export const bookingRouter = express.Router();
// Create new booking
bookingRouter.post('/', authenticate, createBooking);
// Get user's bookings
bookingRouter.get('/', authenticate, getUserBookings);
// Get specific booking
bookingRouter.get('/:id', authenticate, getBookingById);
// Cancel booking
bookingRouter.patch('/:id/cancel', authenticate, cancelBooking);
// Update booking status
bookingRouter.patch('/:id/status', updateBookingStatus);
// Admin routes
bookingRouter.get('/admin/all', authenticate, requireAdmin, getAllBookings);
// Host routes
bookingRouter.get('/host/bookings', authenticate, getHostBookings);
bookingRouter.patch('/:id/approve', authenticate, approveBooking);
bookingRouter.patch('/:id/reject', authenticate, rejectBooking);
