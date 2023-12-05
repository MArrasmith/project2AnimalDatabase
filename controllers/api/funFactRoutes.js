const router = require('express').Router();
const FunFact = require('../../models/FunFact');
const Animals = require('../../models/Animal');
const withAuth = require('../../utils/auth');

// Post a new Fun Fact
router.post('/fun-facts', withAuth, async (req, res) => {
  const { animalId, fact } = req.body;
  const userId = req.session.user_id;

  try {
    const newFunFact = await FunFact.create({
      animal_id: animalId,
      fact,
      user_id: userId,
    });

    res.status(200).json({ success: true, funFact: newFunFact });
  } catch (error) {
    console.error('Error adding fun fact:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete a Fact from the Animals page
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

/*const router = require('express').Router();
const FunFact = require('../../models/FunFact');

router.post('/', async (req, res) => {
  const { animalId, fact } = req.body;

  try {
    const newFunFact = await FunFact.create({
      animal_id: animalId,
      fact,
    });

    res.status(200).json({ success: true, funFact: newFunFact });
  } catch (error) {
    console.error('Error adding fun fact:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});*/

module.exports = router;