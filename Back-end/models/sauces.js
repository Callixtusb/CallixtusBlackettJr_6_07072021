const mongoose = require('mongoose');  //imported from NodeJS after installation - used to create connection of the app to the MongoDB.

const saucesSchema = mongoose.Schema({  //contains the schema (modele de donnees) of fields that will be required by the DB.
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Sauces', saucesSchema);  //To makeavailable to other dependent resources, it must be in a state of export..