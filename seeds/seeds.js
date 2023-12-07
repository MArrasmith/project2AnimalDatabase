const sequelize = require('../config/connections');
const Animal = require('../models/Animal');
const FunFact = require('../models/FunFact')
const { getAnimalData } = require('../services/animalService');

// Used to add a animal to the database or update an existing one
async function createOrUpdateAnimal(animalName) {
  try {
    const apiAnimalDataArray = await getAnimalData(animalName);

    if (!apiAnimalDataArray || apiAnimalDataArray.length === 0) {
      throw new Error('Invalid or incomplete data received from the API.');
    }

    const animalsPromises = apiAnimalDataArray.map(async (apiAnimalData) => {
      if (!apiAnimalData || !apiAnimalData.name || !apiAnimalData.taxonomy || !apiAnimalData.characteristics) {
        throw new Error('Invalid or incomplete data received from the API.');
      }

      const {
        name,
        taxonomy: { scientific_name },
        characteristics: { habitat, diet, lifespan },
      } = apiAnimalData;

      // Find or create the animal, and only create if it doesn't exist
      const [animal, created] = await Animal.findOrCreate({
        where: { name },
        defaults: { name, scientific_name, habitat, diet, lifespan },
      });

      if (created) {
        console.log(`Animal ${name} created!`);
      } else {
        console.log(`Animal ${name} already exists.`);
      }

      return animal;
    });

    const createdAnimals = await Promise.all(animalsPromises);
    return createdAnimals;
  } catch (error) {
    console.error('Error creating or updating animals:', error.message);
    throw error;
  }
}

module.exports = { createOrUpdateAnimal };