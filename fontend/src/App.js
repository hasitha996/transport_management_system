import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavBar, SideNav, ComponentContainer } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes as routePaths } from './services/routes';
import { Login } from './views';
import './App.css';

function App(props) {
  return (
    <div className="body-main">
      <Router  exact>
        {/* <Route path="/> */}

        {
          (localStorage.getItem('access_token')) ? (
            <div>
              {/* Top navigation menu */}
              <NavBar components={routePaths} />

              <div className="row">
                {/* Side navigation menu */}
                <SideNav routePaths={routePaths} />

                {/* Components */}
                <ComponentContainer routePaths={routePaths} />
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
