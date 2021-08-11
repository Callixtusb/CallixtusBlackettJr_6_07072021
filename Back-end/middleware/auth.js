const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  // decoder le token 
    const userId = decodedToken.userId;                       // decoder l'UserId
    if (req.body.userId && req.body.userId !== userId) {    // si l'UserId decode n'est pas le meme dans celui damd le body de la requete, alors on renvoi 'User ID non valable !'
      throw 'User ID non valable !';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !' });
  }
};