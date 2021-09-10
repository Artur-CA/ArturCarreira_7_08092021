const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/new', auth, commentCtrl.createComment);
router.get('/:id/all', auth, commentCtrl.getAllComments);
router.get('/:id', auth, commentCtrl.getOneComment);
router.delete('/:id', auth, commentCtrl.deleteComment);


module.exports = router;