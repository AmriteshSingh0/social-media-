import React,{useState, useEffect} from 'react';
import {getAllPosts, likePost,commentOnPost} from "../lib/api"


function Home(){
    const [commentInput , setCommentInput]=useState({});
    const [posts, setPosts] = useState([]);

     	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const data = await getAllPosts();
				setPosts(data);
			} catch (err) {
				console.error("Error loading posts:", err);
			}
		};
		fetchPosts();
	}, []);


    const handleLike = async (postId) => {
		try {
			const updatedPost = await likePost(postId);
			const updatedPosts = posts.map((post) =>
				post._id === postId ? updatedPost : post
			);
			setPosts(updatedPosts);
		} catch (error) {
			console.error("Error liking post:", error);
		}
	};



    const handleAddComment = async (postId, commentText) => {
		try {
			const updatedPost = await commentOnPost(postId, commentText);
			const updatedPosts = posts.map((post) =>
				post._id === postId ? updatedPost : post
			);
			setPosts(updatedPosts);

            setCommentInput({ ...commentInput, [postId]: "" });
		} catch (error) {
			console.error("Error adding comment:", error);
		}
	};

    return (
           <div className="home">
  <h2>Recent Posts</h2>
  {posts.map((post) => (
    <div key={post._id} className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.file && (
        <div>
          {post.file.includes(".mp4") ? (
            <video width="320" height="240" controls>
              <source src={post.file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={post.file} alt="Post Media" />
          )}
        </div>
      )}
      <p>Likes: {post.likes}</p>
      <button onClick={() => handleLike(post._id)}>Like</button>
      
      {/* Comments Section - Corrected */}
      <div className="comments-container">
        <p className="comments-count">Comments: {post.comments?.length || 0}</p>
        
        <ul className="comment-list">
          {post.comments?.map((comment) => (
            comment.text?.trim() && ( // Only render if comment has text
              <li key={comment._id} className="comment-item">
                <p className="comment-text">{comment.text}</p>
              </li>
            )
          ))}
        </ul>

        {/* Comment Input - Corrected */}
        <div className="comment-input-area">
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment..."
            value={commentInput[post._id] || ""}
            onChange={(e) => setCommentInput({ ...commentInput, [post._id]: e.target.value })}
          />
          <button
            className="comment-button"
            onClick={() => handleAddComment(post._id, commentInput[post._id])}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
)
}

        


export default Home;