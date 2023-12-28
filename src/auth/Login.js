import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await login(credentials);
    // Save the user data in the local storage
    localStorage.setItem('user', JSON.stringify(user));
    // Redirect to the home page
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/register');
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <input
                name="username"
                value={credentials.username}
                class="form-control"
                placeholder="Masukan Username"
                aria-label="Masukan Username"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                name="password"
                value={credentials.password}
                class="form-control"
                placeholder="Masukan Password"
                aria-label="Masukan Password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
            <button
              type="register"
              class="btn btn-success ms-3"
              onClick={handleRegister}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
