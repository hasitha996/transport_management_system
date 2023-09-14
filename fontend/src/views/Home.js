import React, { useState, useEffect } from 'react';
import { api, msg } from '../services';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Home.css';

const Home = () => {

  const [dashValues, setdashValuess] = useState([{
    user_count: '',
    item_count: '',
    day_sale: '',
    total_sale: ''
  }]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      const response = await api.get('home');

      setdashValuess({
        user_count: response.data.user_count,
        no_of_bus: response.data.no_of_bus,
        day_shadule: response.data.day_shadule,
        total_shadule: response.data.total_shadule,
      });

    } catch (error) {
      return msg.error('Unable to fetch data!');
    }
  };

  return (

    <div className="container-fluid">
      <div class=" p-3 my-3 bg-dark text-white">  <h1> Expressway Transport</h1></div>
      <div className="row justify-content-center">
        <div className="col-lg-2 col-sm-6">
          <div className="circle-tile ">
            <a href="#"><div className="circle-tile-heading dark-blue"><i className="fa fa-users fa-fw fa-3x"></i></div></a>
            <div className="circle-tile-content dark-blue">
              <div className="circle-tile-description text-faded"> Users</div>
              <div className="circle-tile-number text-faded ">{dashValues.user_count}</div>
              <a className="circle-tile-footer" href="/user">More Info<i className="fa fa-chevron-circle-right"></i></a>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-sm-6">
          <div className="circle-tile ">
            <a href="#"><div className="circle-tile-heading red"><i className="fa  fa-bus fa-fw fa-3x"></i></div></a>
            <div className="circle-tile-content red">
              <div className="circle-tile-description text-faded"> Bus </div>
              <div className="circle-tile-number text-faded ">{dashValues.no_of_bus}</div>
              <a className="circle-tile-footer" href="/item">More Info<i className="fa fa-chevron-circle-right"></i></a>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-sm-6">
          <div className="circle-tile ">
            <a href="#"><div className="circle-tile-heading yellow "><i className="fa fa-book fa-fw fa-3x"></i></div></a>
            <div className="circle-tile-content yellow">
              <div className="circle-tile-description text-faded"> Day Shadule </div>
              <div className="circle-tile-number text-faded ">{dashValues.day_shadule}</div>
              <a className="circle-tile-footer" href="/">More Info<i className="fa fa-chevron-circle-right"></i></a>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-sm-6">
          <div className="circle-tile ">
            <a href="#"><div className="circle-tile-heading green"><i className="fa fa-book fa-fw fa-3x"></i></div></a>
            <div className="circle-tile-content green">
              <div className="circle-tile-description text-faded"> Total Shadule </div>
              <div className="circle-tile-number text-faded ">{dashValues.total_shadule}</div>
              <a className="circle-tile-footer" href="/">More Info<i className="fa fa-chevron-circle-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;