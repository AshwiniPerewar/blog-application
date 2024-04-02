// Navbar.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/user/authActions';
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.user);

  const logoutHandler = () => {
    dispatch(logout(navigate));   
}

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">My Blog</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/posts" className="nav-link">Posts</Link>
            </li>
            <li className="nav-item">
              <Link to="/create-post" className="nav-link">Create Post</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/profile" className="nav-link">Profile</Link>
            </li> */}
            {!isAuthenticated && <li className="nav-item">
              <Link to="/signup" className="nav-link">Signup</Link>
            </li>
            }
            {isAuthenticated?
             <li className="nav-item">
            <button className="nav-link" onClick={logoutHandler}>LogOut</button> 
             </li>
              :
              <li className="nav-item">
                 <Link to="/login" className="nav-link">LogIn</Link> 
           </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
