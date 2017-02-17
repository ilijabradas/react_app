// config/passport.js
import Strategy from 'passport-local';
import User from '../models/user'; // load up the user model
import jwt from 'jsonwebtoken';
import database from './database';
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// expose this function to our app using module.exports
let config_passport = (passport) => {
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true // if we want to be able to read other parameters in the POST body message
    }, (req, email, password, done) => {
        const userData = {
            'local.email': email.trim(),
            'local.password': password.trim(),
            'local.name': req.body.name.trim(),
            'local.timezone': req.body.timezone,
            'local.isActive': req.body.isActive
        };
        const newUser = new User(userData);
        newUser.save((err) => {
            if (err) {
                return done(err);
            }
            return done(null); //verified with no data supplied to psassport
        });
    }));
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, (req, email, password, done) => {
        const userData = {
            email: email.trim(),
            password: password.trim()
        };
        // find a user by email address
        return User.findOne({
          'local.email': userData.email
        }, (err, user) => {
            if (err) {
                return done(err); //if exception occured done is invoked with err
            }

            if (!user) {
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';

                return done(error); //if credentials is not valid done is invoked with null, false, custom message
            }

            // check if a hashed user's password is equal to a value saved in the database
            return user.comparePassword(userData.password, (passwordErr, isMatch) => {
                if (err) {
                    return done(err);
                }

                if (!isMatch) {
                    const error = new Error('Incorrect email or password');
                    error.name = 'IncorrectCredentialsError';

                    return done(error);
                }

                const payload = {
                    sub: user._id //sub key in the payload part. It’s a reserved key for a subject item
                };

                // create a token string
                const token = jwt.sign(payload, database.jwtSecret, { expiresIn: '1h' });
                const data = {
                    name: user.local.name
                };

                return done(null, token, data); //verify callback invokes done function to supply passport with data
            });
        });
    }));
};

export default config_passport;
