const Userinfo = require('../models/Userinfo');
const Search = require('../models/Search');

const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

Userinfo.hasMany(Search, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Search.belongsTo(Userinfo, {
  foreignKey: 'user_id'
});

module.exports = withAuth, { Userinfo , Search };