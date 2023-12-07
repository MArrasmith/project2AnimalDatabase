const axios = require('axios');
require('dotenv').config();


let name = 'koala';


// const BASE_URL = 'https://api.api-ninjas.com/v1/animals?name=' + name;
const BASE_URL = 'https://api.api-ninjas.com/v1/animals?name=';

async function getAnimalData(animalName) {
  try {
    const response = await axios.get(`${BASE_URL + animalName}`, {
      headers: {
        'X-Api-Key': process.env.API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching animal data', error.message);
    throw error;
  }
}

module.exports = { getAnimalData };