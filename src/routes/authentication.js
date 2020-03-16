const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isSignedIn, isNotSignedIn } = require('../lib/auth');

router.get('/signin', isSignedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isSignedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/user',
        failureRedirect: '/signin'
    })(req, res, next);
});

router.get('/signup', isSignedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isSignedIn, passport.authenticate('local.signup', {
    successRedirect: '/user',
    failureRedirect: '/signup'
}));

router.get('/signout', isNotSignedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;