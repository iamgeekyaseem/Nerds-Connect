const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(post => {
        return res.redirect('back');
    }).catch(err =>{
        if(err){
            console.log('Error in creating post', err);
            return;
        }
        
    })
}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id)
    .then(post => {
        //.id means converting the _id object into string
        if (post.user == req.user.id){
            post.deleteOne({});

            Comment.deleteMany({post: req.params.id})
            .then(err => {
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}