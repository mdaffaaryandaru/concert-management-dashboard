import React, { useEffect, useState } from 'react';
import { updateTicket } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getTicketById } from '../api';

export default function EditTicket() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState({
    buyer_name: '',
    buyer_phone: '',
    buyer_email: '',
    concert_name: '',
  });
  useEffect(() => {
    const fetchTicket = async () => {
      const data = await getTicketById(id);
      setTicket(data);
    };
    fetchTicket();
  }, [id]);
  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: 'Apa Kamu Yakin Ingin Mengupdate data ini?',
      text: 'Anda tidak akan bisa mengembalikan data ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Updat Aja',
      cancelButtonText: 'Tidak, Batalkan!',
    });

    if (result.value) {
      await updateTicket(id, ticket);
      Swal.fire('Updated!', 'Tiket Anda Berhasil Di Update.', 'success');
      navigate('/');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'Tiket Anda Aman:)', 'error');
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
