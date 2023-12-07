const router = require('express').Router();

const MainRoutes = require('./MainRoutes');
const apiRoutes = require('./api');

router.use('/', MainRoutes);
router.use('/api', apiRoutes);

module.exports = router;