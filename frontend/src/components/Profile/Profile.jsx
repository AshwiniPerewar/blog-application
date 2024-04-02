import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../../api';

function Profile() {
  const [user, setUser] = useState({
    username: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/profile`);
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios.put('http://your-api-endpoint.com/profile', user);
      setSuccessMessage('Profile updated successfully');
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Profile Management</h2>
      {loading && <p>Loading...</p>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input type="text" className="form-control" id="username" name="username" value={user.username} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default Profile;
