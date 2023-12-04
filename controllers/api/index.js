const router = require('express').Router();
const userRoutes = require('./userRoutes');
const searchRoutes = require('./searchRoutes');
const animalRoutes = require('./animalRoutes');

router.use('/users', userRoutes);
router.use('/search', searchRoutes);
router.use('/animal', animalRoutes);

module.exports = router;
