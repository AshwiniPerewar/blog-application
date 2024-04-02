import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`col-md-3 ${isOpen ? 'open' : ''}`}>
      <button className="btn btn-primary d-md-none" onClick={toggleSidebar}>Toggle Sidebar</button>
      <div className="list-group">
        <Link to="/profile" className="list-group-item list-group-item-action">Profile Details</Link>
        <Link to="/change-password" className="list-group-item list-group-item-action">Change Password</Link>
        {/* Add more profile management links as needed */}
      </div>
    </div>
  );
}

export default Sidebar;
