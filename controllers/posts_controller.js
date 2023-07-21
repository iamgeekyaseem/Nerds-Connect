const Post = require('../models/post');

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
