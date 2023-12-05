const router = require('express').Router();
const { Search , Userinfo , Animal } = require('../../models');
const withAuth = require('../../utils/auth');


// Route to verify that a user is logged in using session information
// once user logs in they are directed to the search page

//router.get('/search', withAuth, async (req, res) => {
router.get('/search', async (req, res) => {
  try {
    const userData = await userinfo.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Search }],
    });

    const user = userData.get({ plain: true });

    res.render('search', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to take a user who is already signed in to the search page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/search');
    return;
  }

  res.render('login');
});




module.exports = router;

