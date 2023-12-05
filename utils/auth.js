const userinfo = require('./Userinfo');
const Search = require('./Search');

// Userinfo.hasMany(Search, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Search.belongsTo(Userinfo, {
//   foreignKey: 'user_id'
// });

module.exports = { Userinfo , Search };

