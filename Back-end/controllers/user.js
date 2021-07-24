const bcrypt = require('bcrypt');         //import of password encryption module (hash)
const jwt = require('jsonwebtoken');      //import of web token generation module
const User = require('../models/User');   //import of user schema model (model de donnees utilisateur)


//Function to signup/create a userrr
exports.signup = (req, res, next) => {   
    bcrypt.hash(req.body.password, 10)   //Function async used to create and encrypt the password
    .then(hash => {                      //Response to send to user (bcrypt)
      const user = new User({            //Creation of the user based on Models UserShema
        email: req.body.email,           //...and including email & password
        password: hash                   //... (bcrypt)
      })
      user.save()                        //Method used to save the new user in the DB
        .then(() => res.status(200).json({ message: 'Utilisateur créé !' }))    //Promise - Response to the use
        .catch(error => res.status(401).json({ error }));   //Error management message
    })
    .catch(error => res.status(500).json({ error }));   //Error management message for an error server.
};


//Function to logging/connect a user
exports.login = (req, res, next) => {           //Function used to connect existing user to app.
    User.findOne({ email: req.body.email })     //Method used to find a user in the DB by using the email address in the req.body.
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });   //Error management message
      }
      bcrypt.compare(req.body.password, user.password)      //Function async that compares existing DB password with that provided.
        .then(valid => {               //Promise - Response 
          if (!valid) {                //If comparison is "false", return the following message...
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({      //If comparison is "true", send a res.status.json containing the user's ID from DB and a jwt function payload...
            userId: user._id,
            token: jwt.sign(          //function jwt the following payload to be encoded :
              { userId: user._id },     //Encoded userId (of the above) to ensure it remains unique and will be compare to the one in the DB.
              'RANDOM_TOKEN_SECRET',    //Encoded password object that will be compared to the one in the DB based on the userId - Will be much more complex and longer once in production.
              { expiresIn: '24h' }      //Conditional object - token only valid for 24hrs.
            )
          });
        })
        .catch(error => res.status(500).json({ error }));       //Error management message for an error server.
    })
    .catch(error => res.status(500).json({ error }));       //Error management message for an error server.
};