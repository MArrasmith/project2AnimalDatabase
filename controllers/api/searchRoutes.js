const router = require('express').Router();
const { createOrUpdateAnimal } = require('../../seeds/seeds');
const { Search, Animal, FunFact, Userinfo } = require('../../models');
const { getAnimalData } = require('../../services/animalService');
const animality = require('animality');
const withAuth = require('../../utils/auth');

const animalEquivalences = {
  'redpanda': 'Red Panda',
};

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