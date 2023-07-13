const User = require('../models/user')

// import User from '../models/user';


module.exports.profile = function (req, res) {
    res.end('<h1>User profile</h1>');
}

//render sign in page
module.exports.signin = function (req, res) {
    res.render('user_sign_in', {
        title: "Sign-In Page"
    });
}

//render signup page
module.exports.signup = function (req, res) {
    res.render('user_sign_up', {
        title: "Sign-Up Page"
    });
}

// //get the signup data------no longer takes callback function for Model.findOne and Model.create hence converting it to promises using .then() and .catch() methods

// module.exports.create = function (req, res) {
//     if (req.body.password != req.body.confirm_password) {
//         return res.redirect('back');
//     }
//     User.findOne({ email: req.body.email }, function (err, user) {
//         if (err) {
//             console.log('error in finding user in signing up'); return;
//         }

//         if (!user) {
//             User.create(req.body, function (err, user) {
//                 if (err) { console.log('error in creating user in signing up'); return; }

//                 return res.redirect('/users/sign-in');
//             })
//         } else {
//             return res.redirect('back');
//         }
//     });
// }


// ------------//get the signup data------no longer takes callback function for Model.findOne and Model.create hence converting it to promises using .then() and .catch() methods
module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect('back');
    }
  
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return User.create(req.body);
        } else {
          throw new Error('User already exists.');
        }
      })
      .then(() => {
        return res.redirect('/users/sign-in');
      })
      .catch(err => {
        console.log('Error:', err.message);
        return res.redirect('back');
      });
  };

  
//sign in and create a session for user
module.exports.createSession = function (req, res) {
    //todo later
}