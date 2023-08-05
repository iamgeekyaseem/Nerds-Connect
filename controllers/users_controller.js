const User = require('../models/user')

// import User from '../models/user';


module.exports.profile = async function (req, res) {
  try {
    await User.findById(req.params.id)
      .then(user => {
        return res.render('user_profile', {
          title: "Profile Page",
          profile_user: user
        });
      });
  } catch (err) {
    console.log("error", err);
    return;
  }
}

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(user => {
        return res.redirect('back');
      })
  } else {
    return res.status(401).send('Unauthorized');
  }
}

//render sign in page
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_in', {
    title: "Sign-In Page"
  });
}

//render signup page
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_up', {
    title: "Sign-Up Page"
  });
}

module.exports.create = function (req, res) {
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
  return res.redirect('/');
}

module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
  });

  return res.redirect('/');
}