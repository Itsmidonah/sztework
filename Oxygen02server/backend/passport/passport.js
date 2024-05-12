const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { compare } = require('bcryptjs');
const { findOne, findById } = require('./models/user');

// Local Strategy for username/password login
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
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

// JWT Strategy for token-based authentication
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
    findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;
