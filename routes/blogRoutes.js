const express = require("express");
const router = express.Router();

const blogController = require('../controllers/companyController');
const auth = require("../middleware/auth");
const {restrictTo} = require("../middleware/permissions")

router.get('/',auth,restrictTo('admin'), blogController.getAll)
router.get('/:id',auth, blogController.get)
router.patch('/:id',auth,blogController.update)
router.get('/:id',blogController.get)
router.patch('/:id',auth,blogController.update)
router.delete('/:id',auth,blogController.remove);

module.exports = router