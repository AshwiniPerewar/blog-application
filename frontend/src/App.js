import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import DeleteAccount from './components/Profile/DeleteAccount';
import PostList from './components/Post/PostList';
import CreatePost from './components/Post/CreatePost';
import PostDetail from './components/Post/PostDetail';
import Home from './components/Home';
import EditPost from './components/Post/EditPost';
import { RequireAuth } from './components/Auth/RequireAuth';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/edit-profile" element={<EditProfile/>} />
          <Route path="/delete-account" element={<DeleteAccount/>} />
          <Route path="/posts" element={<PostList/>} />
          <Route path="/create-post" element={<RequireAuth><CreatePost/></RequireAuth>} />
          <Route path="/edit-post/:postId" element={<EditPost/>} />
          <Route path="/post/:postId" element={<PostDetail/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
