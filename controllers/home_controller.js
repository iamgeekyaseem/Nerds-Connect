const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (req, res) {
    // res.end('<h1>express controller is running<h1/>');

    // reading the cookies sent by browser using cookie parser installed
    // console.log(req.cookies);
    // // changing the value of cookie
    // res.cookie('user_id', 15)
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments', //derived from the array of comment present in post
        populate: {
            path: 'user'
        }
    })
    .then(posts => {

        User.find({})
        .then(user => {
            res.render('home', {
                title: "nerdsConnect | Home",
                posts: posts,
                all_users: user 
            })
        })
    });
};