import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { msg, auth } from '../services';
import './Styles.css';
import { DateAndTime } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const NavBar = ({ components, selectedComponentName, collapseSideBar }) => {
  const signOut = async () => {
    auth.signOutUser();
  };

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0 navbarText"

        >
          {/* <img src={Logo} height="30" width="30" /> */}
          &nbsp;
          {selectedComponentName ? selectedComponentName : `Expressway Transport`}
        </a>

        <ul className="navbar-nav px-2">
          <li className="nav-item text-nowrap">
            {/* <Find /> */}
          </li>
        </ul>
        <ul className="navbar-nav px-2">
          <li className="nav-item text-nowrap">
            {/* <Reports /> */}
          </li>
        </ul>
        <ul className="navbar-nav px-2">
          <li className="nav-item text-nowrap">
            {/* <NavMsg /> */}
          </li>
        </ul>
        <ul className="navbar-nav px-2">
          <li className="nav-item text-nowrap">
          </li>
        </ul>
        <ul
          className="navbar-nav px-2"
          style={{
            minWidth: '300px',
          }}
        >
          <li className="nav-item text-nowrap">
            <a className="nav-link">
              <DateAndTime />
            </a>
          </li>
        </ul>
        <ul className="navbar-nav px-2" style={{ border: '1px solid #efefef' }}>
          <li className="nav-item text-nowrap">
          </li>
        </ul>
        <ul
          className="navbar-nav px-2"
          style={{
            border: '1px solid #efefef',
            padding: '5px',
          }}
        >
          <li className="nav-item text-nowrap">
            <NavLink
              exact
              to={'/user'}
              className="nav-link"
              activeClassName="active"
            >
              &nbsp;
              <span>
                <FontAwesomeIcon icon={faUserAlt} color="white" />
                <strong className="navbarText" >
                  {localStorage.getItem('user_name')}
                </strong>
              </span>
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a
              className="nav-link btn btn-sm navbarText"
              onClick={() => signOut()}
            >
              <span>
                <FontAwesomeIcon icon={faSignOutAlt} size="sm" />
              </span>
              &nbsp; Sign out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
