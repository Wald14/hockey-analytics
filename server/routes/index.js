const router = require('express').Router();
const nhlAPIRoutes = require('./api');

router.use('/api', nhlAPIRoutes)

module.exports = router;