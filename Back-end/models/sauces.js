const mongoose = require('mongoose');  //imported from NodeJS after installation - used to create connection of the app to the MongoDB.

const saucesSchema = mongoose.Schema({  //contains the schema (modele de donnees) of fields that will be required by the DB.
  id: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes : {type : Number},
  dislikes : {type : Number},
  usersLiked : [{type : String}],
  usersDisliked : [{type : String}]
});

module.exports = mongoose.model('sauces', saucesSchema);  //To makeavailable to other dependent resources, it must be in a state of export..