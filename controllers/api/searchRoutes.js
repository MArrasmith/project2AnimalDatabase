const router = require('express').Router();
const { createOrUpdateAnimal } = require('../../seeds/seeds');
const { Search, Animal, FunFact, Userinfo } = require('../../models');
const { getAnimalData } = require('../../services/animalService');
const animality = require('animality');
//const withAuth = require('../../utils/auth');

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

// Search for an animal and get fun facts
router.post('/', async (req, res) => {
  const { animalName } = req.body;

  try {
    const animals = await createOrUpdateAnimal(animalName);

    const animalsLowerCase = animals.map(animal => animal.name.toLowerCase());
    const animalityAnimalsLowerCase = animalityAnimals.map(animal => animal.toLowerCase());

    const filteredAnimals = animalsLowerCase.filter(animalName => animalityAnimalsLowerCase.includes(animalName));

    console.log('Filtered Animals:', filteredAnimals); // Add this line for debugging

    const randomFactsPromises = filteredAnimals.map(async (animalName) => {
      const animal = animals.find(animal => animal.name.toLowerCase() === animalName);
      console.log('Processing animal:', animalName);
    
      if (animal && animal.id) {
        console.log('Processing animal with ID:', animal.id);
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
    
          console.log('Fun fact created for animal with ID:', animalId);
          return { ...createdFunFact.toJSON(), animalId };
        } else {
          console.log('Existing fact found for animal with ID:', animal.id);
          return { ...existingFact.toJSON(), animalId: animal.id };
        }
      } else {
        console.error('Animal ID is undefined for', animalName);
        return null;  // or handle the case as appropriate
      }
    });

    const createdFunFacts = await Promise.all(randomFactsPromises);
    const allFunFacts = createdFunFacts.filter(fact => fact !== null);

    console.log('Animal Object:', animals[0]);
    res.render('animalfacts', { layout: false, animal: animals[0], funFacts: allFunFacts });

    //res.status(200).json({ success: true, animals, funFacts: allFunFacts });

    /*const modifiedAnimals = animals.map(animal => {
      const funFactsForAnimal = createdFunFacts.filter(fact => fact && fact.animalId === animal.id);
      return {
        ...animal,
        funFacts: funFactsForAnimal,
      };
    });*/

    /*const allFunFactsPromises = animals.map(async (animal) => {
      return FunFact.findAll({
        where: { animal_id: animal.id },
      });
    });*/

   // const allFunFacts = await Promise.all(allFunFactsPromises);

    //res.status(200).json({ success: true, animals: modifiedAnimals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;