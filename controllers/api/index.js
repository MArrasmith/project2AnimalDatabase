const router = require('express').Router()
const userRoutes = require('./userRoutes');
const searchRoutes = require('./searchRoutes');
const animalRoutes = require('./animalRoutes');
//const animalRoutes = require('./animalRoute');
const funFactRoutes = require('./funFactRoutes');

router.use('/animal', animalRoutes);
router.use('/fun-fact', funFactRoutes);

router.use('/users', userRoutes);
router.use('/search', searchRoutes);
//router.use('/animal', animalRoutes);

module.exports = router;
