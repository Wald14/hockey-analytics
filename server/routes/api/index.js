const router = require('express').Router();

const nhleRoutes = require('./nhle.routes')
const nhleCustomRoutes = require('./nhle.custom.routes')
const nhleStatsRoutes = require('./nhle.stats.routes')
const recordsNHLRoutes = require('./records.nhl.routes')

router.use('/nhle', nhleRoutes)
router.use('/nhle/cust', nhleCustomRoutes)
router.use('/nhle-stats', nhleStatsRoutes)
router.use('/records-nhl', recordsNHLRoutes)

module.exports = router