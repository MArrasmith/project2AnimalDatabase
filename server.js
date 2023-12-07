const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const crypto = require('crypto');
const routes = require('./controllers');
const morgan = require('morgan');

const sequelize = require('./config/connections');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const secret = crypto.randomBytes(64).toString('hex');

const sess = {
  secret: secret,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan(`
--------------------------------------------------
--> :status - URL :method :url in :response-time ms
--------------------------------------------------
`));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
