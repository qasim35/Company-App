const express = require ('express')
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth")
const {restrictTo} = require("../middleware/permissions")

router.post('/',auth, taskController.create)
router.get('/',auth, taskController.get)
router.get('/:id',auth, taskController.getOne)
router.patch('/:id',auth, taskController.update)
router.delete('/:id',auth,taskController.remove)

module.exports = router