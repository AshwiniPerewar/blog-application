import React, { useState, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, updatePost } from '../../store/posts/postActions';

function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post} =useSelector(state=>state.posts)
  
  const [formData, setFormData] = useState({
    title: post?post.title:"",
    content: post?post.content:"",
    category: post?post.category:"",
    coverImage:post?post.coverImage:"",
  })
  

  useEffect(() => {
    dispatch(fetchPost(postId));
    
  },[dispatch,postId])
    
  const categories = ["html", "css", "reactjs", "js", "nodejs",
  "expressjs", "mongodb"];

  // const fetchPost = async () => {
  //   try {
  //     const response = await axios.get(`${api}/posts/${postId}`);
  //     const postData = response.data.singlePost;
  //     setTitle(postData.title);
  //     setContent(postData.content);
  //     setCategory(postData.category);
  //     // Assuming coverImage is stored in postData.coverImage
  //     setCoverImage(postData.coverImage);
  //   } catch (error) {
  //     console.error('Error fetching post:', error);
  //   }
  // };

  const updateHandler = (e) => {
    const { name, value,files } = e.target;
    if(name!="image")
      setFormData({ ...formData, [name]: value })
    else
    setFormData({ ...formData, [name]: files[0] })
      
  }

 
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData2 = new FormData();
      formData2.append('title', formData.title);
      formData2.append('content', formData.content);
      formData2.append('category', formData.category);
      formData2.append('file', formData.coverImage);
      
      
      dispatch(updatePost(postId,formData2,navigate));
      
      // console.log(response.data)

    
  };


  if (!post) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title row justify-content-center">Edit Post</h2>
              <form onSubmit={handleSubmit}>
                 <div >
              <label htmlFor="title" className="form-label">Title:</label>
              <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={updateHandler} required />
            </div>
            <div className="mb-1">
              <label htmlFor="content" className="form-label">Content:</label>
              <textarea className="form-control" id="content" name="content" value={formData.content} onChange={updateHandler} required />
            </div>
            <div className="mb-1">
              <label htmlFor="category" className="form-label">Category:</label>
              <select className="form-select" id="category" name="category" value={formData.category} onChange={updateHandler} required>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select></div>
                <div className="mb-3">
                  <label htmlFor="coverImage" className="form-label">Cover Image:</label>
                  <input type="file" className="form-control" id="image" name="image" accept="image/*"
                onChange={updateHandler} /></div>
                <div className="mb-3">
                    <img src={formData.coverImage} alt="Cover" style={{ maxWidth: '100%', height: 'auto' }} />
                  </div>
                <button type="submit" className="btn btn-primary" >Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
