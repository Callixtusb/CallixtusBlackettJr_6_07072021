
const express = require('express'); //imported from NodeJS after installation - npm module that will be used/called to create the app.
const bodyParser = require('body-parser'); //imported from NodeJS after installation - used to parse/transform the body of the POST request to a JSON format/usable JS Object..
const mongoose = require('mongoose'); //imported from NodeJS after installation - used to create connection of the app to the MongoDB.

//Establishing a connetion to the MongoDB..
mongoose.connect('mongodb+srv://Callixtusb:VWvJGQtYHDtw5P81@clusters.cc6ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); //...app will be contained in Express

app.use((req, res, next) => {  //It's a CORS secusity measure that filters the type of requests can be received by the server..
   res.setHeader('Access-Control-Allow-Origin', '*'); //Request from any and all 
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'Origin, GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
}); 

app.use(bodyParser.json()); //JSON methode used to parse/transform the body of the POST request to a JSON format/usable JS Object..

app.post('/api/sauces', ( req, res, next) => { //Used to handle POST requests sent to the api..
    console.log(req.body);                    //The data in the body of this request will not be easy to use. Hence, the need for the Body-parser module!!..
    res.status(201).json({Message: 'Object created !' //Message sent in response to the user....
    });
}); 


app.use(('/api/sauces', (req, res, next) => {
    
    const sauces = [

        {
            _id: 'qwerty',  // This ID is automatically created by the DB.
            title: 'Brule ta bouche',
            description: 'This MF is hot as fck!',
            imageUrl: '',
            price: 3900,
            userId: 'sauceLover',
        },
        {
            _id: 'aserty', // This ID is automatically created by the DB.
            title: 'Bouche en miettes',
            description: 'This is even hotter!',
            imageUrl: '',
            price: 9900,
            userId: 'HotsLover',
        }
    ];

 }));


// app.use((req, res, next) => {
//     res.json({Message:'Votre requete a bien ete recue'});
//     next();
// }); //..Middleware that will respond to any api request/response..


// app.use((req, res, ) => {
//     console.log('Request was sent with success !'); 
// });

module.exports = app; //To make the app available to other dependent resources, it must be in a state of export..