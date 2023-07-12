module.exports.home = function(req, res){
    // res.end('<h1>express controller is running<h1/>');
    res.render('home', {
        title: "Home"
    });
};