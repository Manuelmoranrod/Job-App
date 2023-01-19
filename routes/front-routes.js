const router = require('express').Router()
const frontViews = require('../controllers/frontviews')
const jwtAuth = require('../utils/jwtAuth')
const passport = require("../google");
const facebook = require("../facebook");


//Front routes
router.get('/', frontViews.home)
router.get('/register', frontViews.register)//inscription formulary
router.get('/login', frontViews.login)// Login with jwtAuth 
router.get('/google',passport.authenticate('google', { scope: ['profile','email'] }),(req,res)=>{res.redirect('/dashboard')});
router.get('/google/callback', passport.authenticate('google', { successRedirect:"/", failureRedirect: '/login' }),frontViews.googleLogin );

router.get('/facebook',passport.authenticate('facebook'));
router.get('/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),(req, res) =>{res.redirect('/'); });

router.get('/profile',jwtAuth.authCookie, frontViews.profile)
router.get('/favorites', jwtAuth.authCookie, frontViews.favoritos)
router.get('/users', jwtAuth.authCookie, frontViews.users) // Vista para admin
router.get('/dashboard', jwtAuth.authCookie, frontViews.dashboard) // Vista para admin


module.exports = router