const router = require('express').Router();
const { Search, Animals, Userinfo } = require('../../models');
const withAuth = require('../../utils/auth');

//Post a new Fact to the Animals page
router.post('/', withAuth, async (req, res) => {
  try {
    const newFact = await Animals.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newFact);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete a Fact from the Animals page
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const FactData = await Animals.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!FactData) {
      res.status(404).json({ message: 'There is no fact to delete!' });
      return;
    }

    res.status(200).json(FactData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
