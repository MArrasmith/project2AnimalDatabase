const router = require('express').Router();
//const { Search , Userinfo , Animal } = require('../models');


// Route to verify that a user is logged in using session information
// once user logs in they are directed to the search page


//router.get('/search', withAuth, async (req, res) => {

router.get('/', async (req, res) => {

  try {
    res.render('homepage', { layout: false, view: 'Animal Database' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

