const router = require('express').Router();
const animalRoutes = require('./animalRoute');
const funFactRoutes = require('./funFactRoutes');

router.use('/animal', animalRoutes);
router.use('/fun-fact', funFactRoutes);

module.exports = router;