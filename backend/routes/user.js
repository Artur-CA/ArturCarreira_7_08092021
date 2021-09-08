const express = require('express'); 
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneAccount);
router.delete('/:id', auth, userCtrl.deleteAccount);

module.exports = router;