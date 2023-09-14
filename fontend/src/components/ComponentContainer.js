import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import './ComponentContainer.module.css';
import './Styles.css';

const ComponentContainer = ({ routePaths, sideBarCollapsed }) => {
  return (
    <div
      className={
        sideBarCollapsed
          ? 'col-sm-12 component-container'
          : 'col-sm-10 component-container'
      }
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {routePaths.map((route, index) => {
        return (
          <div key={index} className="">
            <Switch>
              <Route
                path={route.pathURL}
                exact
                component={route.componentName}
              />
            </Switch>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentContainer;
