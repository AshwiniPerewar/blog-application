import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../store/user/authActions';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading,error} = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   const response = await axios.post(`${api}/users/login`, formData);
    //  console.log(response.data)
    //   if (response) {
    //     localStorage.setItem("token", response.token);
    //     alert('Login successful:');
    //   }
    //   navigate("/");
    // } catch (error) {
    //   alert(error.response.data.message);
    // }
    dispatch(login(formData, navigate));
    // setFormData({ ...formData, email:"",password:"" });
    

  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title row justify-content-center">Log In</h2>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{loading ? 'Loging In...' : 'Log In'}</button>
              </form>
              <div className="mt-3">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
