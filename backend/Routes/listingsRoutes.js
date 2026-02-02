import express from 'express';
import {updateById, save,deleteById, getAllListings, getListingById} from '../Controller/ListingsController.js';

export const listingRouter = express.Router();

listingRouter.get('/getallListing', getAllListings);
listingRouter.get('/getlistingbyId/:id', getListingById);
listingRouter.patch('/:id', updateById); 
listingRouter.post('/', save);
listingRouter.delete('/:id', deleteById);
// export default listingRouter;

