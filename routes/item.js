const { Router } = require('express');
const itemController = require('../controllers/itemControllers');
const router = Router();

router.get('/items/:id', itemController.get_items_id);
router.get('/items', itemController.get_items);
router.post('/items',itemController.post_item);
router.put('/items/:id',itemController.update_item);
router.delete('/items/:id',itemController.delete_item);
router.patch('/review/:id', itemController.review);

module.exports = router;