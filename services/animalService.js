const axios = require('axios');
require('dotenv').config();

// function to get searched animal data from animal api
const BASE_URL = 'https://api.api-ninjas.com/v1/animals?name=';

async function getAnimalData(animalName) {
  try {
    console.log('Calling API with animalName:', animalName);
    const response = await axios.get(`${BASE_URL + animalName}`, {
      headers: {
        'X-Api-Key': process.env.API_KEY,
      },
    });

    console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching animal data', error.message);
    throw error;
  }
}

module.exports = { getAnimalData };