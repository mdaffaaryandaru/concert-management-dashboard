import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTicket, getAllMaster } from '../api';
import Swal from 'sweetalert2';

export default function AddTicket() {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({
    buyer_name: '',
    buyer_phone: '',
    buyer_email: '',
    concert_name: '',
    category: '',
  });
  const [master, setMaster] = useState([]);

  useEffect(() => {
    const fetchMaster = async () => {
      const data = await getAllMaster();
      setMaster(data);
      if (data.length > 0) {
        setTicket((ticket) => ({
          ...ticket,
          concert_name: data[0].band,
          category: data[0].category,
        }));
      }
    };

    fetchMaster();
  }, []);
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
    const { buyer_name, buyer_phone, buyer_email, concert_name, category } =
      ticket;
    if (
      !buyer_name ||
      !buyer_phone ||
      !buyer_email ||
      !concert_name ||
      !category
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'Semua Data Harus DiIsi',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (buyer_name && buyer_phone && buyer_email && concert_name && category) {
      console.log(ticket);
      await addTicket(ticket);
      Swal.fire({
        title: 'Success!',
        text: 'Data Berhasil Ditambahkan',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/home');
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
                class="form-select"
                value={ticket.concert_name}
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
                class="form-select"
                value={ticket.category}
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
