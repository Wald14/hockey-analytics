const router = require('express').Router();

const nhleRoutes = require('./nhle.routers')

router.use('/nhle', nhleRoutes)

module.exports = router