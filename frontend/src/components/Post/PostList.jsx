import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/posts/postActions';

function PostList() {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");
  const { posts } =useSelector(state=>state.posts)
  
  useEffect(() => {
    dispatch(fetchPosts(sortBy,category))
    }, [sortBy,category]);

  // const fetchPosts = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/posts'); // Assuming your backend endpoint for fetching posts is '/api/posts'
  //     setPosts(response.data.posts);
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //   }
  // };
  const categories = ["html", "css", "reactjs", "js", "nodejs",
    "expressjs", "mongodb"];

  return (
    <div className="container">
      <div className='d-flex justify-content-between'>
      <div className="mt-3">
              <select  id="sort" name="sort" onChange={(e)=>setSortBy(e.target.value)}>
                    <option value="">Sort By</option>
          <option value="createdAt">Date - Ascending</option>
          <option value="-createdAt">Date - Descending</option>
          <option value="title">Title - Ascending</option>
          <option value="-title">Title - Descending</option>
                  </select>
      </div>
      <div className="mt-3">
              <select  id="category" name="category" onChange={(e)=>setCategory(e.target.value)}>
            <option value="">Category</option>
            <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="nodejs">Node.Js</option>
          <option value="expressjs">Express.Js</option>
          <option value="js">Js</option>
          <option value="reactjs">React</option>
          <option value="mongodb">MongoDB</option>
                  </select>
        </div>
        </div>
      <h2 className="my-4">Posts</h2>
      <div className="list-group">
        {posts.map(post => (
          <Link to={`/post/${post._id}`} key={post._id} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{post.title}</h5>
              <small>{new Date(post.createdAt).toLocaleDateString()}</small>
            </div>
            <p className="mb-1">{post.category}</p>
            <small>Author: {post.user.fullname}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PostList;
