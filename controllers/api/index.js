const router = require('express').Router()
const userRoutes = require('./userRoutes');
const searchRoutes = require('./searchRoutes');
const funFactRoutes = require('./funFactRoutes');

router.use('/users', userRoutes);
router.use('/search', searchRoutes);
router.use('/fun-fact', funFactRoutes);


module.exports = router;
