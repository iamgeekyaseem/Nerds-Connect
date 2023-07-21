const Post = require('../models/post');

module.exports.home = function (req, res) {
    // res.end('<h1>express controller is running<h1/>');

    // reading the cookies sent by browser using cookie parser installed
    // console.log(req.cookies);
    // // changing the value of cookie
    // res.cookie('user_id', 15)
    Post.find({})
    .populate('user')
    .then(posts => {
        res.render('home', {
            title: "nerdsConnect | Home",
            posts: posts
        })
    });
};