import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTicket } from '../api';
import Swal from 'sweetalert2';

export default function AddTicket() {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({
    buyer_name: '',
    buyer_phone: '',
    buyer_email: '',
    concert_name: '',
  });
  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { buyer_name, buyer_phone, buyer_email, concert_name } = ticket;
    if (!buyer_name || !buyer_phone || !buyer_email || !concert_name) {
      Swal.fire({
        title: 'Error!',
        text: 'Semua Data Harus DiIsi',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (buyer_name && buyer_phone && buyer_email && concert_name) {
      await addTicket(ticket);
      Swal.fire({
        title: 'Success!',
        text: 'Data Berhasil Ditambahkan',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/');
    }
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <input
                name="buyer_name"
                value={ticket.buyer_name}
                class="form-control"
                placeholder="Nama Pembeli"
                aria-label="Nama Pembeli"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3">
              <input
                name="buyer_phone"
                value={ticket.buyer_phone}
                class="form-control"
                placeholder="Nomor Pembeli"
                aria-label="Nomor Pembeli"
                onChange={handleChange}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
            <div class="mb-3">
              <input
                name="buyer_email"
                value={ticket.buyer_email}
                class="form-control"
                placeholder="Email Pembeli"
                aria-label="Email Pembeli"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3">
              <input
                name="concert_name"
                value={ticket.concert_name}
                class="form-control"
                placeholder="Nama Konser"
                aria-label="Nama Konser"
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
