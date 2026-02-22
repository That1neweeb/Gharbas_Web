import express from 'express';
import {updateById, save,deleteById, getAllListings, getListingById} from '../Controller/ListingsController.js';
import { authenticate, requireHost } from '../security/authMiddleware.js';

export const listingRouter = express.Router();

listingRouter.get('/getAllListings', getAllListings);
listingRouter.get('/getlistingbyId/:id', getListingById);
listingRouter.patch('/:id', updateById); 
listingRouter.post('/', authenticate, requireHost, save);
listingRouter.delete('/:id', deleteById);
// export default listingRouter;

