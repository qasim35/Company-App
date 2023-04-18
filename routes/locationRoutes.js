const express = require("express");
const commentController = require("../controllers/locationController");
const auth = require("../middleware/auth")
const {restrictTo} = require("../middleware/permissions")

const router = express.Router();
router.post('/', auth, commentController.createComment);
router.get('/get/:id',auth, commentController.get)
router.get('/',auth,restrictTo('admin'), commentController.getAll)
router.patch('/:id',auth, commentController.update)
router.delete('/:id',commentController.remove)
module.exports = router