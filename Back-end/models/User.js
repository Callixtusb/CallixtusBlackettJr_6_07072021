const mongoose = require('mongoose'); //imported from NodeJS after installation - used to create connection of the app to the MongoDB.
const uniqueValidator = require('mongoose-unique-validator'); 

const userSchema = mongoose.Schema({   //contains the schema (modele de donnees) of fields that will be required by the DB.
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); //Ensures that we cannot have many users with the same email. 

module.exports = mongoose.model('User', userSchema); //To nmake available to other dependent resources, it must be in a state of export..