const express = require("express");
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth")
const {restrictTo} = require("../middleware/permissions")

const router = express.Router();
router.post('/:id', auth, commentController.createComment);

 router.get('/get/:id',auth, commentController.get)
 router.get('/:id',auth,restrictTo('admin'), commentController.getCommentsOfBlog)
 router.patch('/:id',auth, commentController.updateComment)
 router.delete('/:id',auth,commentController.deleteComment)
module.exports = router