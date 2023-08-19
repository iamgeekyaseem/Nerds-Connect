{
    // method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = new newPostDOM(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost)
                    deletePost($(' .delete-post-button', newPost));
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDOM = function (post) {
        return $(`<li id="post-${post._id}">
                <p>
                    ${post.content}
                        <br>
                        <small>
                            ${post.user.name}
                        </small>

                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                        </small>
                    
                </p>
            
                <div class="post-comments">
                   
                        <form action="/comments/create" method="POST" required>
                            <input type="text" name="content" placeholder="Type your comment here...">
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add">
                        </form>
                    
            
                        <div class="post-comment-list">
                            <ul id="post-comment-${post._id}">
                
                            </ul>
                        </div>
                </div>
            </li>`)
    }

    // Method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: get,
                url: $$(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post._id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}