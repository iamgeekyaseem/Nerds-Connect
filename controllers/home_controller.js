const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {

    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments', //derived from the array of comment present in post
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});

        res.render('home', {
            title: "nerdsConnect | Home",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log('Error', err);
        return;
    }



};