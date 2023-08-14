const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        }).then(post => {
            req.flash('success', 'Post Published!');
            return res.redirect('back');
        }).catch(err =>{
            if(err){
                req.flash('error', err);
                return res.redirect('back');;
            }
        })
    }catch(err){
        console.log("error", err);
        return;
    }
}

module.exports.destroy = async function(req, res){
    try{
        await Post.findById(req.params.id)
    .then(post => {
        //.id means converting the _id object into string
        if (post.user == req.user.id){
            post.deleteOne({});

            Comment.deleteMany({post: req.params.id})
            .then( err => {
                req.flash('error', 'Post Deleted!');
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
    }catch(err){
        console.log("Error", err);
        return;
    }
}