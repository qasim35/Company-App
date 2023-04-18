const express = require("express");
const router = express.Router()
const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes')
const locationRoutes = require('./locationRoutes')
const taskRoutes = require("./taskRoutes")
const commentRoutes = require('./commentRoutes')
router.use('/company', blogRoutes);
router.use('/users', userRoutes);
router.use('/location', locationRoutes)
router.use('/tasks',taskRoutes)
router.use('/comments',commentRoutes)
module.exports = router;