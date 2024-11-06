import React from 'react';
// import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>SoftBD</h2>
      </div>
      <nav>
        <ul>
          <li><a>Dashboard</a></li>
          <li><a href="#">Option 1</a></li>
          <li><a href="#">Option 1</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
