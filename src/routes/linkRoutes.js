import express from 'express'; 
import linkController from '../controllers/linkController';
const router = express.Router();

router.post('/links', linkController.createLink);
router.get('/links/:id', linkController.getLink);
router.put('/links/:id', linkController.updateLink);
router.delete('/links/:id', linkController.deleteLink);

module.exports = router;
