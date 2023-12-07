const router = require('express').Router();
const { createOrUpdateAnimal } = require('../../seeds/seeds');
const { FunFact } = require('../../models');
const animality = require('animality');

// attempt to get the differences in red panda from the api and the package to equate
const animalEquivalences = {
  'redpanda': 'Red Panda',
};

//gets random fact from animality package
async function getRandomFact(animal) {
  try {
    const equivalentName = animalEquivalences[animal] || animal;
    const animalData = await animality.getAsync(equivalentName);
    console.log('Animal Data:', animalData);
    return animalData.fact;
  } catch (error) {
    console.error('Error fetching random fact for', animal, error.message);
    throw error;
  }
}

// allows the other animals from the animal api to be searched and not just the ones shared by the animality package except for red panda
const animalityAnimals = [
  'bird',
  'redpanda',
  'koala',
  'kangaroo',
  'duck',
  'axolotl',
  'capybara',
  'hedgehog',
  'narwhal'
];

// gets data from the animal api and filter the animality animals so that they match the case sensitivity of the animal api and so that data from the animal api will show up for both animals included in animality and not also loads random fact from the animality package
router.get('/', async (req, res) => {
  try{
    const loggedIn = req.session.logged_in;

    const animalName = req.query.animalName;

    const animals = await createOrUpdateAnimal(animalName);

    const animalsLowerCase = animals.map(animal => animal.name.toLowerCase());
    const animalityAnimalsLowerCase = animalityAnimals.map(animal => animal.toLowerCase());

    const filteredAnimals = animalsLowerCase.filter(animalName => animalityAnimalsLowerCase.includes(animalName));

    const randomFactsPromises = filteredAnimals.map(async (animalName) => {
      const animal = animals.find(animal => animal.name.toLowerCase() === animalName);
    
      if (animal && animal.id) {
        const existingFact = await FunFact.findOne({
          where: { animal_id: animal.id },
        });
    
        if (!existingFact) {
          const fact = await getRandomFact(animal.name);
          const animalId = animal.id;
    
          const createdFunFact = await FunFact.create({
            animal_id: animalId,
            fact: fact,
          });
    
          return { ...createdFunFact.toJSON(), animalId };
        } else {
          return { ...existingFact.toJSON(), animalId: animal.id };
        }
      } else {
        console.error('Animal ID is undefined for', animalName);
        return null;
      }
    });

    const createdFunFacts = await Promise.all(randomFactsPromises);

    res.render('animalfacts', { layout: false, animal: animals[0], funFacts: createdFunFacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;