module.exports.profile = function(req, res){
    res.end('<h1>User profile</h1>');
}

//render sign in page
module.exports.signin = function(req, res){
    res.render('user_sign_in',{
        title: "Sign-In Page"
    });
}

//render signup page
module.exports.signup = function(req, res){
    res.render('user_sign_up',{
        title: "Sign-Up Page"
    });
}

//get the signup data
module.exports.create = function(req, res){
    //toDo later
}

//sign in and create a session for user
module.exports.createSession = function(req, res){
    //todo later
}