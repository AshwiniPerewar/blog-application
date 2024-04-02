import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';

function CreatePost() {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    file:null
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "file")
      setFormData({ ...formData, [name]: files[0] });
    else
    setFormData({ ...formData, [name]: value });
  };

  const categories = ["html", "css", "reactjs", "js", "nodejs",
    "expressjs", "mongodb"];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData2 = new FormData();
    for (let key in formData)
    {
      console.log(key,formData[key])
      formData2.append(key, formData[key]);
      }
    

    try {
      const response = await axios.post(`${api}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      });

      alert(response.data.message);
      console.log('Post created:', response.data);
      // Reset form fields
      setFormData({
        title: '',
        content: '',
        category:'',
        file:null
      })
      navigate("/posts")
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
      <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title row justify-content-center">Create a New Post</h2>
          <form onSubmit={handleSubmit}>
            <div >
              <label htmlFor="title" className="form-label">Title:</label>
              <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="mb-1">
              <label htmlFor="content" className="form-label">Content:</label>
              <textarea className="form-control" id="content" name="content" value={formData.content} onChange={handleChange} required />
            </div>
            <div className="mb-1">
              <label htmlFor="category" className="form-label">Category:</label>
              <select className="form-select" id="category" name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select></div>
            <div className="mb-1">
              <label htmlFor="image" className="form-label">Image:</label>
              <input type="file" className="form-control" id="file" name="file" accept="image/*"
                onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary mt-2 px-4">Submit</button>
          </form>
        </div>
      </div>
        </div>
      </div>
      </div>
  );
}

export default CreatePost;
