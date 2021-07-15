const jwt = require('jsonwebtoken');  //To verify the token

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  //Getting the 2nd element from the header.authorization : 
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  //decoding the token and verifying that it's the same in the login
    const userId = decodedToken.userId; //if there is a UserId in the req.body, we apply the if below..
    if (req.body.userId && req.body.userId !== userId) {    //if the userId is not matching, throw invalide message.
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {   
    res.status(401).json({    //returning a non auth message.
      error: new Error('Invalid request!')
    });
  }
};