const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
            req.flash('success', 'Post Published!');
            return res.redirect('back');
        
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

            Comment.deleteMany({post: req.params.id});
            req.flash('error', 'Post Deleted!');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    })
    }catch(err){
        console.log("Error", err);
        return;
    }
}