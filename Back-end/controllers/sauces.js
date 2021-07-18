const sauce = require('../models/sauces');
const fs = require('fs');

// Checking/contrôle CRUD actions for Sauces and likes & Dislikes - for creation, Update and Delete..

//SAUCES
//Creation of new sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(sauce)
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce créée avec succès !' }))
      .catch(error => res.status(400).json({ error }));
  }
  
  //Update sauce
  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
      .catch(error => res.status(400).json({ error }));
  };
  
  //Delete sauce
  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };


  //LIKES & DISLIKES
  //To like a sauce
exports.likeSauce = (req, res, next) => {
    switch (req.body.like) {       
      
      case 0:    // default is = 0

        Sauce.findOne({ _id: req.params.id })
          .then((sauce) => {
            if (sauce.usersLiked.find(user => user === req.body.userId)) {
              Sauce.updateOne({ _id: req.params.id }, {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
                _id: req.params.id
              })
                .then(() => { res.status(201).json({ message: "je n'aime pas ajouté!" }); })
                .catch((error) => { res.status(400).json({ error: error }); });
  
              // check if the user hasn't already disliked the sauce
            } if (sauce.usersDisliked.find(user => user === req.body.userId)) {
              Sauce.updateOne({ _id: req.params.id }, {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
                _id: req.params.id
              })
                .then(() => { res.status(201).json({ message: "j'aime a été retiré !" }); })
                .catch((error) => { res.status(400).json({ error: error }); });
            }
          })
          .catch((error) => { res.status(404).json({ error: error }); });
        break;

      //Updating the likes (+1) ////////////////////////////////////////////
      case 1:
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId },
          _id: req.params.id
        })
          .then(() => { res.status(201).json({ message: "je n'aime pas a été retiré !" }); })
          .catch((error) => { res.status(400).json({ error: error }); });
        break;
  
      //Updating the dislikes (+1) ////////////////////////////////////////////
      case -1:
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: req.body.userId },
          _id: req.params.id
        })
          .then(() => { res.status(201).json({ message: "je n'aime pas a été ajouté !" }); })
          .catch((error) => { res.status(400).json({ error: error }); });
        break;
      default:
        console.error('Bad request');
    }
  }



//récupération de la sauce sélectionnée
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };
  
  //récupération de toutes les sauces
  exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };