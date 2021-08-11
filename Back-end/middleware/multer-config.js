const multer = require('multer');

//  envoi et creation de nom unique pqr fichier //

const MIME_TYPES = {       //objet contenant les type extensions que la "Const = extension" pourra utiliser pour creer l'extention du fichier (images ou autre) 
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

const storage = multer.diskStorage({    //lieu ou les images seront stocke (sur le disck local pour notre cas)
    destination: (req, file, callback) => {
      callback(null, 'images')
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');  //  modification du mon du fichier avec 'split' pour enlever les espaces et 'join' pour remplacer tout espace par un underscore "_".
      const extension = MIME_TYPES[file.mimetype];  // Creation de l'extension du fichier
      callback(null, name + Date.now() + '.' + extension);  // The expected output 
    }
  });
  
  module.exports = multer({ storage }).single('image');  // refers to single file and only images.