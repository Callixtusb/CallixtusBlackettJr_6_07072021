const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauces');


router.post('/', auth, sauceCtrl.createSauce);          //applying the auth (from Middleware) to verify the token sent from the front end.   multer,
router.put('/:id', auth, sauceCtrl.modifySauce);        //applying the auth (from Middleware) to verify the token sent from the front end.    multer, 
router.delete('/:id', auth, sauceCtrl.deleteSauce);     //applying the auth (from Middleware) to verify the token sent from the front end.
router.get('/:id', auth, sauceCtrl.getOneSauce);        //applying the auth (from Middleware) to verify the token sent from the front end.

router.get('/', auth, sauceCtrl.getAllSauces);           //applying the auth (from Middleware) to verify the token sent from the front end.
router.post('/:id/like', auth, sauceCtrl.likeSauce);     //applying the auth (from Middleware) to verify the token sent from the front end.


module.exports = router;