module.exports.profile = function(req, res){
    res.end('<h1>User profile</h1>');
}

module.exports.signin = function(req, res){
    res.render('user_sign_in',{
        title: "Sign-In Page"
    });
}

module.exports.signup = function(req, res){
    res.render('user_sign_up',{
        title: "Sign-Un Page"
    });
}