
const express = require('express'); //imported from NodeJS after installation - npm module that will be used/called to create the app.
const bodyParser = require('body-parser'); //imported from NodeJS after installation - used to parse/transform the body of the POST request to a JSON format/usable JS Object..
const mongoose = require('mongoose'); //imported from NodeJS after installation - used to create connection of the app to the MongoDB.

const saucesRoutes = require('./routes/sauces.js');
const userRoutes = require('./routes/user')

//Establishing a connetion to the MongoDB..
mongoose.connect('mongodb+srv://Callixtusb:VWvJGQtYHDtw5P81@clusters.cc6ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée!'));

const app = express(); //...app will be contained in Express.

app.use((req, res, next) => {  //It's a CORS secusity measure that filters the type of requests can be received by the server..
   res.setHeader('Access-Control-Allow-Origin', '*'); //Request from any and all 
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'Origin, GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
}); 

app.use(bodyParser.json()); //JSON methode used to parse/transform the body of the POST request to a JSON format/usable JS Object..

app.use('/api/sauces', saucesRoutes);  //Est la route attendu par le front-end
app.use('/api/auth', userRoutes);  //Est la route (de tout ce qui lie a l'auth.) attendu par le front-end


module.exports = app; //To make the app available to the server. It must be in a state of export..