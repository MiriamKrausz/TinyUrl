import express from 'express';
import {
  createLink,
  getLinks,
  getLink,
  updateLink,
  deleteLink,
  redirect,
  getLinkClicks
} from '../controllers/LinkController.js';

const router = express.Router();

router.post('/', createLink);
router.get('/', getLinks);
router.get('/:id', getLink);
router.put('/:id', updateLink);
router.delete('/:id', deleteLink);
router.get('/:id/redirect', redirect);
router.get('/:id/clicks', getLinkClicks);

export default router;
