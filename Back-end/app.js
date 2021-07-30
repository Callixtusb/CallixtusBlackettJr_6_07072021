
const express = require('express');
const bodyParser = require('body-parser');       //..imported from NodeJS after installation - used to parse/transform the body of the POST request to a JSON format/usable JS Object..
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')

const sauceRoutes = require('./routes/sauce');
const routesOfUsers = require("./routes/users"); // This line crashes my App!!

// console.log("running imports in app.js = OK");

mongoose.connect('mongodb+srv://Callixtusb:DXpZikjxLTxnSCfX@cluster0.cc6ym.mongodb.net/pekoDB?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//   console.log("running MongoDB connection = OK");
const app = express(); // Creating the API

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json()) //JSON. methode used to parse/transform the body of the POST request to a JSON format/usable JS Object..

app.use('/images', express.static(path.join(__dirname, 'images')));   //gestion des images dans un dossier image statique

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', routesOfUsers);


module.exports = app //To make the app available to the server. It must be in a state of export..
