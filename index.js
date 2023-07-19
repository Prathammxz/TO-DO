const express = require('express');
const port = process.env.PORT || 4000;
const path = require('path');
const app = express();
const db = require("./Model/index");
const passport = require('passport');
const session = require('express-session');
const listController = require("./Controller/listController");
const moment = require('moment');

require('./Services/passport');
require('dotenv').config()

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: false });
app.use(
    session({
      secret: 'google-auth', // Replace with your own secret key
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/list", (req, res) => {
//     res.render("list");
//   });


app.get("/list", listController.renderCreateList);
app.post("/list", listController.createList);

app.get("/delete/:id", listController.deleteList);

app.get("/edit/:id",  listController.editList); 
app.post("/update/:id",  listController.updateList);

app.get("/complete/:id", listController.completeList);
app.get("/list/filter/:status", listController.renderFilteredTasks);



// Auth
app.get('/auth', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Auth Callback
app.get('/auth/callback', passport.authenticate('google', {
  successRedirect: '/auth/callback/success',
  failureRedirect: '/auth/callback/failure',
}));

// Success
app.get('/auth/callback/success', (req, res) => {
  if (!req.user)
    res.redirect('/auth/callback/failure');
  res.send("Welcome " + req.user.email);
  console.log(req.user)
});

// Failure
app.get('/auth/callback/failure', (req, res) => {
  res.send("Error");
});


app.listen(port, () => {
  console.log("TO-DO List started at: http://localhost:4000");
});
