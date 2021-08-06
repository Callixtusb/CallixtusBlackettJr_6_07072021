const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({

  userId: { 
    type: String, 
    required: true 
  },

  name: { 
    type: String, 
    required: true,
    validate: {
        validator: function(value){
          return /^([a-zA-Z0-9\s,()]{5,30})$/.test(value);
        },
        message: "N'entrez que des lettres et des chiffres... 5 caratères Min / 30 caractères Max "
    } 
  },

  manufacturer: { 
    type: String, 
    required: true,
    validate: {
        validator: function(value){
          return /^([a-zA-Z0-9\s,()]{5,50})$/.test(value);
        },
        message: "N'entrez que des lettres et des chiffres... 5 caratères Min / 50 caractères Max"
    }
  },

  description: { 
    type: String, 
    required: true, 
    validate: {
        validator: function(value){
          return /^([a-zA-Z0-9\s,()]{15,100})$/.test(value);
        },
        message: "N'entrez que des lettres et des chiffres... 15 caratères Min / 200 caractères Max"
    }
  },

  mainPepper: { 
    type: String, 
    required: true,
    validate: {
        validator: function(value){
          return /^([a-zA-Z0-9\s,()]{5,30})$/.test(value);
        },
        message: "N'entrez que des lettres et des chiffres... 5 caratères Min / 30 caractères Max"
    }
  },

  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
});

module.exports = mongoose.model('sauce', sauceSchema);