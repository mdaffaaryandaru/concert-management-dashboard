import React, { useState } from 'react';
import { register } from '../api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [auth, setAuth] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth({ ...auth, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!auth.username || !auth.password) {
      Swal.fire({
        title: 'Error!',
        text: 'Username and password cannot be empty',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const newUser = await register(auth);
    Swal.fire({
      title: 'Success!',
      text: 'Registrasi Sukses',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 shadow mx-auto p-5">
          <h2
            className="text-center mb-4"
            style={{ color: '#3F51B5', fontWeight: 'bold' }}
          >
            Register
          </h2>

          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <input
                name="username"
                value={auth.username}
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
                value={auth.password}
                class="form-control"
                placeholder="Masukan Password"
                aria-label="Masukan Password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
