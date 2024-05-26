const router = require('express').Router();
const nhlAPIRoutes = require('./api');

router.use('/api/nhl', nhlAPIRoutes)

module.exports = router;