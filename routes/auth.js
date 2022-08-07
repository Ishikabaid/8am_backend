const { Router } = require('express');
const authController = require('../controllers/authControllers');
const router = Router();
const auth = require('../middleware/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/user', auth, authController.get_user);
router.get('/logout', authController.logout);
router.get('/check', authController.check);

module.exports = router;