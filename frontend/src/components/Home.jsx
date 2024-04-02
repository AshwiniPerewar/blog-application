import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { api } from '../api';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${api}/posts`);
      console.log(response.data.posts);// Assuming your backend endpoint for fetching posts is '/api/posts'
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Latest Posts</h2>
      <div className="row">
        {posts.map(post => (
          <div className="col-md-4" key={post._id}>
            <div className="card mb-4 shadow-sm">
              <img src={post.coverImage} className="card-img-top" alt={post.title} />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.category}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <Link to={`/post/${post._id}`} className="btn btn-sm btn-outline-secondary">View</Link>
                  </div>
                  <small className="text-muted">{new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
