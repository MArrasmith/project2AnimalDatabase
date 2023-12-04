const Animal = require('./Animal');
const FunFact = require('./FunFact');

Animal.hasMany(FunFact, {
  foreignKey: 'animal_id',
});

FunFact.belongsTo(Animal, {
  foreignKey: 'animal_id',
});

module.exports = { Animal, FunFact };