import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/posts/postActions';

function PostList() {
  const dispatch = useDispatch();
  const { posts } =useSelector(state=>state.posts)
  
  useEffect(() => {
    dispatch(fetchPosts())
    }, []);

  // const fetchPosts = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/posts'); // Assuming your backend endpoint for fetching posts is '/api/posts'
  //     setPosts(response.data.posts);
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //   }
  // };

  return (
    <div className="container">
      <h2 className="my-4">Posts</h2>
      <div className="list-group">
        {posts.map(post => (
          <Link to={`/post/${post._id}`} key={post._id} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{post.title}</h5>
              <small>{new Date(post.createdAt).toLocaleDateString()}</small>
            </div>
            <p className="mb-1">{post.excerpt}</p>
            <small>Author: {post.user.fullname}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PostList;
