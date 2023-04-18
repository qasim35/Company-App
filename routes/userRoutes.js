const express = require("express");
const multer = require("multer");
const router = express.Router();

const userController = require('../controllers/userController');
const auth = require("../middleware/auth");
const { restrictTo } = require("../middleware/permissions");

console.log("router is here")

router.post('/',  userController.register)
router.post('/login', userController.login)
router.post('/create',auth,userController.createUser)
router.get('/me', auth, userController.getMe);
router.get('/all', auth, restrictTo('admin'),userController.getAllData)
router.get('/:id', auth,  userController.getUserById)
router.patch('/:id', auth,  userController.update);
router.patch('/profile/:id',auth,restrictTo('user'),userController.updateUserProfile);
router.delete('/:id', auth,  userController.remove);
router.patch('/profile/:id', auth, restrictTo('user'),userController.removeUserProfile)

module.exports = router