import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
    try {
      const user = await login(credentials);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: 'Error!',
          text: 'Username Dan Password Salah',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 shadow mx-auto p-5">
          <h2
            className="text-center mb-4"
            style={{ color: '#3F51B5', fontWeight: 'bold' }}
          >
            Login
          </h2>

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
