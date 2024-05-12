const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { compare } = require('bcryptjs');
const { findOne, findById } = require('./models/user');

exports.configurePassport = function(passport) {

    passport.serializeUser(function(user, done) {
        console.log('user is serialized.');
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        console.log('user is deserialized.');
        done(null, user);
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async function(username, password, done) {
        try {
            const user = await findOne({ username });
            if (!user) {
                return done(null, false, { message: 'Invalid username or password' });
            }
            const isMatch = await compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Invalid username or password' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    return passport;
};
