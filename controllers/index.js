const router = require('express').Router();

const apiRoutes = require('./api');
const MainRoutes = require('./MainRoutes');

router.use('/', MainRoutes);
router.use('/api', apiRoutes);

module.exports = router;

