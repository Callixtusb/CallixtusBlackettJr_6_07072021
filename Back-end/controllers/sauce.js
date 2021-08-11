const Sauce = require('../models/sauce');
const fs = require('fs');  // fs = file system :   done acces au sysstem pour les diff operations de fichers


// Middleware display one sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

// Middleware display of all sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};



//Créer une nouvelle sauce /////////////////////////////////////////////////
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`   // creation du nouvel URL (cote server) de l'image qui a ete cree par le middleware "multer-config.js" 
  });
  console.log(sauce)
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};



//Modifier une sauce //////////////////////////////////////////////////
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?     // Test/verification pour savoir si un fichier exist dans la requete. 
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  // Si il y a une image, On recré un nouvel URL (cote server) de l'image qui a ete cree par le middleware "multer-config.js"

    } : { ...req.body };             // si il n'y a PAS de fichier d'image, le put requete modifi/update the post. 
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};


//Effacer une sauce //////////////////////////////////////////////////
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })   // pour trouver la sauce qui a son '_id' qui correspond a celui dans la requete.
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];  // le split va retourner/extrait le 2eme element dans l'URL (apres l'image), le nom.
      fs.unlink(`images/${filename}`, () => {                // The method 'Unlink' will delete the image corresponding to the filename returned/found.
        Sauce.deleteOne({ _id: req.params.id })              // Then, suppression de l'objet dans la base de donnee.
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};





/** Contrôle pour ajouter, modifier, mettre à jour et effacer y compris les likes et les dislikes **/
//Liker une sauce //////////////////////////////////////////////////
exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    
    // 
    case 0:    // Défault = 0  
      Sauce.findOne({ _id: req.params.id })    // Trouver la sauce par rapport a son _id.
        .then((sauce) => {
          if (sauce.usersLiked.find(user => user === req.body.userId)) {   // check usersLiked Array if user has already Liked the sauce base on his UserId in the array.
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { likes: -1 },           
              $pull: { usersLiked: req.body.userId },     // Si l'user a déja Liké, le body de la requete est updaté en retirant "1" ainsi que l'utilisateur (son UserId) du tableau usersLiked. 
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
              .catch((error) => { res.status(400).json({ error: error }); });

          } if (sauce.usersDisliked.find(user => user === req.body.userId)) {      // check usersDisliked Array if user has already DisLiked the sauce base on his UserId in the array.
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },      // Si l'user a déja DisLiké, le body de la requete est updaté en retirant "1" ainsi que l'utilisateur (son UserId) du tableau usersDisliked.
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
              .catch((error) => { res.status(400).json({ error: error }); });
          }
        })
        .catch((error) => { res.status(404).json({ error: error }); });
      break;



    //Mise à jour des likes (+1) //////////////////////////////
    case 1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'Ton like a été pris en compte!' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;




    //Mise à jour des dislikes (+1)//////////////////////////////
    case -1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { dislikes: +1 },
        $push: { usersDisliked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'Ton dislike a été pris en compte!' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;

    default:
      console.error('mauvaise requête');
  }
};