const router = require('express').Router();
const { createOrUpdateAnimal } = require('../../seeds/seeds');
const { Search, Animals, FunFact, Userinfo } = require('../../models');
const { getAnimalData } = require('../../services/animalService'); // Assuming you have a service to fetch animal data
//const withAuth = require('../../utils/auth');

// Search for an animal and get fun facts
router.post('/', async (req, res) => {
  const { animalName } = req.body;

  try {
    const animals = await createOrUpdateAnimal(animalName);

    const funFactsPromises = animals.map(async (animal) => {
      return FunFact.findAll({
        where: { animal_id: animal.id },
      });
    });

    const funFacts = await Promise.all(funFactsPromises);
    // Search for the animal in the API and update/create in the database
    /*const apiAnimalDataArray = await getAnimalData(animalName);
    console.log('API Response:', apiAnimalDataArray);
    if (!apiAnimalDataArray || apiAnimalDataArray.length === 0) {
      throw new Error('API did not return valid data for the given animal name.');
    }*/

    /*const animals = [];
    for (const apiAnimalData of apiAnimalDataArray) {
      const animal = await createOrUpdateAnimal(apiAnimalData);
      animals.push(animal);
    }*/

    /*const animals = await createOrUpdateAnimal(apiAnimalDataArray);

    const funFactsPromises = animals.map(async (animal) => {
      return FunFact.findAll({
        where: { animal_id: animal.id },
      });
    });

    const funFacts = await Promise.all(funFactsPromises);*/

    // Get fun facts for the animal
    /*const funFacts = await FunFact.findAll({
      where: { animal_id: animals.length > 0 ? animals[0].id : null },
    });*/

    res.status(200).json({ success: true, animals, funFacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;