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


// Files Downlaoded on the client side , ie acts local to them
app.use(express.static(path.join(__dirname,'public')))


app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())


app.set('view engine','ejs')



// <-- Routers -->
app.use('/',require('./routes/indexrouter.js'))








const port = process.env.PORT || 5000

app.listen(port ,()=>{
    console.log("Listening on port " + port);
});