const express = require('express'); 
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneAccount);
router.delete('/:id', auth, userCtrl.deleteAccount);
router.put('/:id', auth, multer, userCtrl.modifyAccount);

module.exports = router;