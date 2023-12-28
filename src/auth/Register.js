import React, { useState } from 'react';
import { register } from '../api';

export default function Register() {
  const [auth, setAuth] = useState({ username: '', password: '' });

  const handleChange = (event) => {
    setAuth({ ...auth, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = await register(auth);
    // Handle the new user
    // ...
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 shadow mx-auto p-5">
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
