import express from 'express'
import { getAll,getById, updateById,deleteById } from '../Controller/userController.js'
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js'

export const router = express.Router();

router.get('/', getAll);
router.get('/admin/all', authenticate, requireAdmin, getAll);
// router.post("/",save);
router.get("/:id",getById);
router.patch("/:id",updateById);
router.delete("/:id", authenticate, requireAdmin, deleteById);
