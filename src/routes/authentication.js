const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/user',
        failureRedirect: '/signin'
    })(req, res, next);
});

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user',
    failureRedirect: '/signup'
}));

module.exports = router;