const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controlleurs/sauces');
const likeCtrl = require('../controlleurs/like')


router.post('/', auth, multer, sauceCtrl.createSauce);  //applying the auth (from Middleware) to verify the token sent from the front end.
router.get('/', auth, sauceCtrl.getAllSauce);           //applying the auth (from Middleware) to verify the token sent from the front end.
router.get('/:id', auth, sauceCtrl.getOneSauce);        //applying the auth (from Middleware) to verify the token sent from the front end.
router.put('/:id', auth, multer, sauceCtrl.modifySauce);//applying the auth (from Middleware) to verify the token sent from the front end.
router.delete('/:id', auth, sauceCtrl.deleteSauce);     //applying the auth (from Middleware) to verify the token sent from the front end.
router.post('/:id/like', auth, likeCtrl.likeSauce);     //applying the auth (from Middleware) to verify the token sent from the front end.


module.exports = router;