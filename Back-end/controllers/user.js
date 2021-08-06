const User = require('../models/user');

//securité :
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  //creation de token et verification
const hash = require('hash.js');

const passwordValidator = require('password-validator');

const shemaPassValid = new passwordValidator();
shemaPassValid
.is().min(8)
.is().max(50)
.has().uppercase()
.has().lowercase()
.has().digits(1)
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);



//  Signing up & login of users 

// SIGN UP CODE
exports.signup = (req, res, next) => {

//   const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,4}$/;
  const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if (!regexEmail.test(req.body.email)) {
      res.status(401).json({ error: "Rentrez un mail valide" })
      return false
  }  

  const emailHash = hash.sha256().update(req.body.email).digest('hex');

  if (!shemaPassValid.validate(req.body.password)) {
      res.status(401).json({message:"L'email exist déjà ET / OU Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre pour un minimum de 8 caractères"});

  } else {
    bcrypt.hash(req.body.password, 10)  //hash le mot de passe, on execute 10 fois l algorithme de hachage
    .then(hash => {
        const user = new User(
        {    
            email: emailHash,
            password: hash
        });
 
    user.save()  //enregistrement de l utilisateur avec retour promise
        .then(() => res.status(201).json({ message: 'New Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
    }
    };
  

  // LOGIN CODE..
  exports.login = (req, res, next) => {
    console.log('Connecté en tant que : ' + req.body.email);
    const emailHash = hash.sha256().update(req.body.email).digest('hex');
    User.findOne({ email: emailHash}) //on trouve le user ds la BDD qui correspond à l'adresse mail qui est rentrée par l'utilisateur de l'application

        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            }

            bcrypt.compare(req.body.password, user.password)  // compare le mdp qui est envoye dans la requete avec le mdp hashé qui est dans la BDD,
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(   //fonction sign prend en argument
                        { userId: user._id },   //1 argument : les données que l on veut encoder à l int de ce token
                        'RANDOM_TOKEN_SECRET',   // 2ieme argument : clef secrete de l encodage 
                        { expiresIn: '24h'}   // chq TOKEN dure 24h 
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};