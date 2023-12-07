const router = require('express').Router();
const { Userinfo } = require('../../models');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  try {
    const userData = await Userinfo.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/api/search');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await Userinfo.findOne({ where: { email: req.body.email } });

    if (!userData) {
      return res.render('login', { errorMessage: 'Incorrect email or password' });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.render('login', { errorMessage: 'Incorrect email or password' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.redirect('/api/search');
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;