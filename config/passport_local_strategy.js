const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication useing passport
passport.use(new LocalStrategy({
    //username filed in schema
    usernameField: 'email',
    passReqToCallback: true
},
    function (req, email, password, done) {
        //find a user and establish the identity
        //first email is the property in user.js schema and value is email that is passes to the function
        User.findOne({ email: email })
            .then(user => {
                if (!user || user.password !== password) {
                    req.flash('error', 'Invalid username/password');
                    return done(null, false);
                }
                return Promise.resolve(user);
            })
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                req.flash('error', err);
                return done(err);
            })
    }
));




//serializing the user to decide which key to be kept in the cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//deserializinf  the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log('Error in finding user ---> Passport', err);
            return done(null);
        });
});

//check is the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //if user is signed in, then pass on the request to the next function(conreoller's action)
    if (req.isAuthenticated()) {
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed in user from the session cookie and we are just sending it to the locals for views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;