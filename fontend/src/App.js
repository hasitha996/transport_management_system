import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavBar, SideNav, ComponentContainer } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes as routePaths } from './services/routes';
import { Login } from './views';
import './App.css';

function App(props) {
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
  let filteredRoutePaths;

  if (isAdmin) {
    // If the user is an admin, include all routes
    filteredRoutePaths = routePaths;
  } else {
    // If the user is not an admin, filter out admin-only routes
    filteredRoutePaths = routePaths.filter((route) => !route.adminOnly);
  }
  return (
    <div className="body-main">
      <Router exact>
        {/* <Route path="/> */}

        {
          (localStorage.getItem('access_token')) ? (
            <div>
              {/* Top navigation menu */}
              <NavBar components={filteredRoutePaths} />

              <div className="row">
                {/* Side navigation menu */}
                <SideNav routePaths={filteredRoutePaths} />

                {/* Components */}
                <ComponentContainer routePaths={filteredRoutePaths} />
              </div>
            </div>

          ) : (
            <Login />
          )
        }
        {/* </Route> */}
      </Router>
    </div>
  );
}

export default App;
