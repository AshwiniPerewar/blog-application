import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/user/authActions';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading,error} = useSelector(state => state.user);

   const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // try {
    //   const response = await axios.post(`${api}/users/register`, formData);
    //   console.log('Sign up successful:', response.data);
    //   navigate("/login")
    // } catch (error) {
    //   console.error('Error signing up:', error);
    // }
    if (dispatch(signup(formData)))
    {
      alert("Account created successfully")
      navigate("/login")
     } 
    
    };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title row justify-content-center">Sign Up</h2>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label">FullName:</label>
                  <input type="text" className="form-control" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary" >{loading ? 'Signing Up...' : 'Sign Up'}</button>
              </form>
              <div className="mt-3">
                <p>Already have an account? <Link to="/login">Log In</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
