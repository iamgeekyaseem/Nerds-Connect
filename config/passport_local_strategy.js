const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication useing passport
passport.use(new LocalStrategy({
    //username filed in schema
    usernameField: 'email'
    },
    function(email, password, done){
        //find a user and establish the identity
        //first email is the property in user.js schema and value is email that is passes to the function
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user ---> Passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null, false);
            }
            return done(err);
        });
    }
));
//         .then(user => {
//             if(!user || user.password != password){
//                 console.log('Invalid username/password');
//                 return done(null, false);
//             }
//             return done(null, user);
//         }).catch(err =>{
//             if(err){
//                 console.log('Error in finding user ---> Passport');
//                 return done(err);
//             }
//         })
//     }
// ));

//serializing the user to decide which key to be kept in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserializinf  the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user ---> Passport');
        }
        return done(null, user);
    })
});

module.exports = passport;