import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchPost } from '../../store/posts/postActions';

function PostDetail() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const post = {};
  const { post } = useSelector(state => state.posts);
    
  useEffect(() => {
    dispatch(fetchPost(postId))
  },[dispatch,postId])
 

  // const fetchPosts = async () => {

  //   try {
  //     const response = await axios.get(`${api}/posts/${postId}`);
  //     const data = await (response.data.singlePost);
  //     setPost(data);
  //     setUser(data.user)
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //   }
  // };

  
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      dispatch(deletePost(postId))
    //   try {
    //     const r = await axios.delete(`${api}/posts/${postId}`);
    //     console.log(r.data)
    //     alert('Post deleted successfully.');
        
    //     navigate("/posts");
    //   } catch (error) {
    //     console.error('Error deleting post:', error);
    //   }
    }
  };
  if (!post) { // Check if 'post' is defined
    return <div>Loading...</div>;
  }

  return (
    <div className="container d-flex justify-content-center mt-4 align-items-center ">
      <div className="card mb-4 shadow">
        <img src={post.coverImage} className="card-img-top" alt={post.title} />
        <div className="card-body">
          <h5 className="card-title">{post.title} {"("}{post.category}{")"}</h5>
          <p className="card-text text-break">{post.content}</p>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">{" - "}{post.user.fullname}</small>
            <small className="text-muted">{new Date(post.createdAt).toLocaleDateString()} </small>
          </div>
          <div className='mt-3'>
            <Link to={`/edit-post/${postId}`} ><button className="btn btn-primary me-2">Edit</button></Link>
                  <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
