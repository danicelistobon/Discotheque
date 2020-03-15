const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const db = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin' , new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
    const rows = await db.query('SELECT * FROM users WHERE email = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPwd = await helpers.comparePassword(password, user.password);
        if (validPwd) {
            done(null, user);
        } else {
            done(null, false);
        }
    } else {
        return done(null, false);
    }
}));

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { name, last_name, email } = req.body;
    const newUser = {
        name,
        last_name,
        email,
        password
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await db.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});