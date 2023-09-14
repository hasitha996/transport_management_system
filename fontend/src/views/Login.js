import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, msg } from '../services';
import './Login.css';
import profile from "../assets/img/a.png";
import email from "../assets/img/email.jpg";
import pass from "../assets/img/pass.png";


const Login = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await auth.doUserLogin(credentials);

      if (response.message) {
        // console.log(response)
        msg.error(response.message);
      }
      msg.success(response.data);
      await auth.handleLoginSuccess(response);
    } catch (error) {
      msg.error(error);
      return console.error(error);
    } finally {

      history.push('/home');
      window.location.reload();
    }
  };

  const handleValueChange = (e) => {
    const targetInput = e.target;
    const inputName = targetInput.name;
    const inputValue = targetInput.value;

    setCredentials({
      ...credentials,
      [inputName]: inputValue,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="main">

        <div className="sub-main">
          <div>
            <div className="imgs">
              <div className="container-image">
                <img src={profile} alt="profile" className="profile" />
              </div>
            </div>
            <div>
              <h1>Login</h1>
              <h2>Expressway Transport (PVT) Ltd</h2>
              <div>
                <img src={email} alt="email" className="email" />
                <input type="text" name="email" value={credentials.email} onChange={handleValueChange} placeholder="Email" className="form-control name" />

              </div>
              <div className="second-input">
                <img src={pass} alt="pass" className="email" />
                <input type="password" name="password" value={credentials.password} onChange={handleValueChange} placeholder="Password" className="form-control name" />
              </div>
              <div className="login-button">
                <button>Login</button>
              </div>

            </div>
          </div>


        </div>
      </div>
    </form>
  );
}
export default Login;
