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

// <-- User Model -->
const userdb = require('./models/user')

// <-- Body Parser -->
const bodyParser = require('body-parser')

const session = require('express-session')



// Files Downlaoded on the client side , ie acts local to them
app.use(express.static(path.join(__dirname, 'public')))


app.use(bodyParser.urlencoded({
  extended: true
}))
// app.use(bodyParser.json())


app.set('view engine', 'ejs')



// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use("delivery",
  session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
  })
);


// <-- Routers -->
app.use('/user', require('./routes/indexRouter.js'))
app.use('/delivery', require('./routes/deliveryGuyRouter.js'))







const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log("Listening on port " + port);
});