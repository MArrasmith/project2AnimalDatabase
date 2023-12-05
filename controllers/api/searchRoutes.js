const router = require('express').Router();
const { Search, Animals } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    const AnimalData = await Animals.findAll();

    res.status(200).json(AnimalData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;

