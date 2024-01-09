import React, { useEffect, useState } from 'react';
import { updateTicket } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getTicketById, getAllMaster } from '../api';

export default function EditTicket() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [master, setMaster] = useState([]);
  const [ticket, setTicket] = useState({
    buyer_name: '',
    buyer_phone: '',
    buyer_email: '',
    concert_name: '',
    category: '',
  });
  useEffect(() => {
    const fetchMaster = async () => {
      const data = await getAllMaster();
      setMaster(data);
    };

    const fetchTicket = async () => {
      const data = await getTicketById(id);
      setTicket(data);
    };

    fetchMaster();
    fetchTicket();
  }, [id]);
  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (e) => {
    const selectedBand = master.find((item) => item.band === e.target.value);
    if (selectedBand) {
      setTicket({ ...ticket, concert_name: selectedBand.band });
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = master.find(
      (item) => item.category === e.target.value,
    );
    if (selectedCategory) {
      setTicket({ ...ticket, category: selectedCategory.category });
    }
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
      navigate('/home');
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
              <select
                name="concert_name"
                value={ticket.concert_name}
                class="form-select"
                onChange={handleDropdownChange}
              >
                {master.map((item, index) => (
                  <option key={index} value={item.band}>
                    {item.band}
                  </option>
                ))}
              </select>
            </div>
            <div class="mb-3">
              <select
                name="category"
                value={ticket.category}
                class="form-select"
                onChange={handleCategoryChange}
              >
                {master.map((item, index) => (
                  <option key={index} value={item.category}>
                    {item.category}
                  </option>
                ))}
              </select>
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
