const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const {origin} = require('./src/config/core.config');
const mongoDB = require('./src/routes/data/database');

const app = express();
const port = process.env.PORT || 3000;

const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: 'sessions'
});

var corsOptions = {
    origin: origin
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// SESSION
app.use(
    session(
        {
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            store: store
        }
    )
);

// ROUTES
app.use('/', require('./src/routes'));

// 404 handler 
app.use((req, res, next) => {
    next(createError.NotFound());
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
    next();
});

mongoDB.initDb((err) => {
  if (err) {
    console.log('Cannot connect to the database!', err);
    process.exit();
  } else {
    console.log('Connected to the database!');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    });
  }
});