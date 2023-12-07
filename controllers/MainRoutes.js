const router = require('express').Router();

router.get('/', async (req, res) => {

  try {
    res.render('homepage', { layout: false, view: 'Animal Database' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

