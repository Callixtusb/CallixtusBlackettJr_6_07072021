const pwdSchema = require('../models/password');

module.exports = (req, res, next)=>{
    if( ! pwdSchema.validate(req.body.password)){
        return res.status(404).json({ error:'Mot de passe invalide !'});
    } else {
        next();
    }
}