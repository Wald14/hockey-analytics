const router = require('express').Router();

const nhleRoutes = require('./nhle.routes')
const nhleStatsRoutes = require('./nhle.stats.routes')
const recordsNHLRoutes = require('./records.nhl.routes')

router.use('/nhle', nhleRoutes)
router.use('/nhle-stats', nhleStatsRoutes)
router.use('/records-nhl', recordsNHLRoutes)

module.exports = router