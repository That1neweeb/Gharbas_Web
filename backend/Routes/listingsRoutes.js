import express from 'express';
import {updateById, save,deleteById, getAllListings, getListingById, getListingByHost} from '../Controller/ListingsController.js';
import { authenticate, requireHost } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadConfig.js';

export const listingRouter = express.Router();

listingRouter.get('/getAllListings', getAllListings);
listingRouter.get('/getlistingbyId/:id', getListingById);
listingRouter.get('/getListingByHost', authenticate, getListingByHost);

listingRouter.patch('/:id', updateById); 
listingRouter.post('/', authenticate, requireHost, upload.single('image'), save);
listingRouter.delete('/:id', deleteById);
// export default listingRouter;

