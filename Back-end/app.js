
const express = require('express');    //import the Express package
const bodyParser = require('body-parser');  //..Used to parse/transform the body of the POST request to a JSON format/usable JS Object..
const mongoose = require('mongoose'); //Import of the mongoose package (permet la création de modèle pour mongoDb)
const path = require('path');  // Generate paths to our files


//Module pour la securite (OWASP Standards)
const helmet = require("helmet"); //Import de helmet pour la sécurisation contre les injections (des en-têtes HTTP)
require('dotenv').config();  //Permet de créer un environnement de variables.
const rateLimit = require("./middleware/ratelimit");  //Mesure contre les attaques en Brut force.


const sauceRoutes = require('./routes/sauce');   //Importe le routeur pour les sauces
const routesOfUsers = require("./routes/users");   //Importe le routeur pour les utilisateurs

// To connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.cc6ym.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); // Creating the API

app.use((req, res, next) => {    //middleware qui permet a l'application d'acceder a l'API
    res.setHeader('Access-Control-Allow-Origin', '*');   //Permet l'accès à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');  //Autorise les en-têtes spécifiés
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');  //Permet l'utilisation des méthodes définies ci-dessous
    next();
  });


app.use(rateLimit);  //écoute maximum des requêtes

app.use(helmet());  //mise en place protection des en-têtes HTTP grâce à Helmet

app.use(bodyParser.json()) //JSON. methode used to parse/transform the body of the POST request to a JSON format/usable JS Object..

app.use('/images', express.static(path.join(__dirname, 'images')));   //Permet de servir les fichiers statiques, présents dans le dossier images

app.use('/api/sauces', sauceRoutes);   //Sert les routes concernant les sauces pour toutes demande vers le endpoint /api/sauces
app.use('/api/auth', routesOfUsers);  //Sert les routes concernant les utilisateurs pour toutes demande vers le endpoint /api/auth

module.exports = app //To make the app available to the server. It must be in a state of export..
