const router = require('express').Router();
const FunFact = require('../../models/FunFact');

router.post('/fun-facts', async (req, res) => {
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
});

module.exports = router;