// <-- Express -->
const express = require('express')
const app = express()

// <-- Database -->
const mongoose = require('mongoose')

const dbLink = require('./auth/dbconfig').mongoURI

mongoose.connect(dbLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('error', (err) => {
  console.log(err);
});
db.on("open", () => {
  console.log("database connection success");
})

const path = require('path')

// <-- User DB Model -->
const userdb = require('./models/user')
 
// <-- Body Parser Middleware for parsing requests-->
const bodyParser = require('body-parser')


// <-- Session for storing the session -->
const session = require('express-session')



// These static files get Downloaded on the client side , ie acts local to their browser
app.use(express.static(path.join(__dirname, 'public')))


app.use(bodyParser.urlencoded({
  extended: true
}))
// app.use(bodyParser.json())

// <-- Setting View Engine to 'EJS' -->
app.set('view engine', 'ejs')



// Express session secret for User
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Express session config for delivery Guy
app.use("delivery",
  session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
  })
);


// <-- Routers -->

// User Router
app.use('/user', require('./routes/indexRouter.js'))

// Delivery Guy Router
app.use('/delivery', require('./routes/deliveryGuyRouter.js'))







const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log("Listening on port " + port);
});