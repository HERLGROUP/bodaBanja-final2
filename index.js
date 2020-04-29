//Requiring dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const pug = require('pug');
const server=express();
const session = require('express-session');
const registerRoutes = require('./routes/registerRoutes');
// const loginRoutes = require('./routes/loginRoutes');
const loginRoutes=require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');

// const db = mongoose.connection;
//Setup the mongoose conncetion
// mongoose.connect('mongodb://localhost:27017/bodabanja-final2',{useNewUrlParser:true,useUnifiedTopology:true});
// mongoose.connect('mongodb://localhost:27017/node-demo', {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
//     if (err) throw err;
//     console.log('Successfully connected');
//  });
let db = 'mongodb+srv://herlgroup:B0raB0ra@cluster0-aatb8.mongodb.net/test?retryWrites=true&w=majority';
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

//Mongoose error handling
// db.once('error',console.error.bind(console,'connection failed'));

// db.once('open',()=>{console.log('connection to db success')});

const app = express();
const PORT = 3200;

app.use(express.static('public'))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//Require routers
const userRouter = require('./routes/userRoutes');

//Using the imported route
app.use('/',userRouter);

// Use sessions for tracking logins
server.use(session({
  secret: 'thesecret',
  resave: true,
  saveUninitialized: false
}));

server.use("/register", registerRoutes);
server.use("/", registerRoutes);   
server.use("/login", loginRoutes);
server.use("/user", userRoutes);

// Logout code :- here so that its on '/' instead but can be anywhere
server.post('/logout', (req, res) => {
  if (req.session) {
      req.session.destroy(function (err) {
          if (err) {
          } else {
             return res.redirect('/login');
          }
      })
  }  
})

// Error Handler
server.get ('*', (req, res) => {
  res.send('error');
})


app.listen(PORT,()=>{console.log(`listening on port ${PORT}`)})