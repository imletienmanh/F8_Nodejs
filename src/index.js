const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(methodOverride('_method'));

app.use(SortMiddleware); 

// Http logger
app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  hbs.engine({
    extname: '.hbs',
    helpers: require('./app/helpers/handlebars')
  }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init

route(app);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port} `),
);
