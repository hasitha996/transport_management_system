import React from 'react';
import { NavLink } from 'react-router-dom';
import './Styles.css';

const SideNav = ({ routePaths }) => {
  const handleRouteClick = (route) => {
    // Check if 'access_token' is available in localStorage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      // If 'access_token' is not available, reload the page to login
      window.location.reload();
    }
    // If 'access_token' go route
  };
  return (
    <div className="col-md-2">
      <nav className="d-none d-md-block bg-dark sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            {routePaths.map((route, index) => {
              return (
                <li className="nav-item" key={index}>
                  <NavLink
                    exact
                    to={route.pathURL}
                    className="nav-link"
                    activeClassName="active"
                    onClick={() => handleRouteClick(route)}
                  >
                    {route.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
