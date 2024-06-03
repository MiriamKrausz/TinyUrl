import express from 'express';
import {
  createLink,
  getLinks,
  getLink,
  updateLink,
  deleteLink,
} from '../controllers/LinkController.js';
import { redirect } from '../controllers/LinkController.js';

const router = express.Router();

router.post('/', createLink);
router.get('/', getLinks);
router.get('/:id', getLink);
router.put('/:id', updateLink);
router.delete('/:id', deleteLink);

// Redirect to original URL
router.get('/:id', redirect);

export default router;
