const sequelize = require('../config/connections');
const Animal = require('../models/Animal');
const FunFact = require('../models/FunFact')
const { getAnimalData } = require('../services/animalService');

async function createOrUpdateAnimal(animalName) {
  try {
    const apiAnimalDataArray = await getAnimalData(animalName);
    console.log(apiAnimalDataArray);

    if (!apiAnimalDataArray || (Array.isArray(apiAnimalDataArray) && apiAnimalDataArray.length === 0)) {
      throw new Error('Invalid or incomplete data received from the API.');
    }

    const apiAnimalData = Array.isArray(apiAnimalDataArray) ? apiAnimalDataArray[0] : apiAnimalDataArray;

    if (!apiAnimalData || !apiAnimalData.name || !apiAnimalData.taxonomy || !apiAnimalData.characteristics) {
      throw new Error('Invalid or incomplete data received from the API.');
    }

    const {
      name,
      taxonomy: { scientific_name },
      characteristics: { 
        habitat, 
        diet, 
        lifespan 
      },
    } = apiAnimalData;

    const [animal, created] = await Animal.findOrCreate({
      where: { name },
      defaults: { name, scientific_name, habitat, diet, lifespan },
    });

    console.log(created ? 'Animal created!' : 'Animal already exists.');
    return animal;
  } catch (error) {
    console.error('Error creating or updating animal:', error.message);
    throw error;
  }
}

module.exports = { createOrUpdateAnimal };