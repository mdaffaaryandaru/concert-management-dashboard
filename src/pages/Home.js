import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { deleteTicket, loadTickets } from '../api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
export default function Home() {
  const [tickets, setTickets] = useState([]);

  //useEffect berfungsi untuk menjalankan fungsi setelah render pertama kali
  useEffect(() => {
    const fetchTickets = async () => {
      const data = await loadTickets();
      setTickets(data);
    };

    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah Kamu Yakin?',
      text: 'Kamu tidak akan bisa mengembalikan data ini ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Delete Aja!',
      cancelButtonText: 'Tidak, Batalkan!',
    });

    if (result.value) {
      await deleteTicket(id);
      const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
      setTickets(updatedTickets);
      Swal.fire('Berhasil Delete', 'Data Kamu Berhasil Di Delete', 'success');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Di Batalkan', 'Ticket Anda Aman :)', 'error');
    }
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tickets');

    worksheet.columns = [
      { header: 'No', key: 'no', width: 10 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'No Telefon', key: 'phone', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Nama Konser', key: 'concert', width: 20 },
    ];

    const dataSet = tickets.map((ticket, index) => ({
      no: index + 1,
      name: ticket.buyer_name,
      phone: ticket.buyer_phone,
      email: ticket.buyer_email,
      concert: ticket.concert_name,
    }));

    worksheet.addRows(dataSet);

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'Tickets.xlsx');
  };

  return (
    <div className="container-fluid mt-5">
      <div className="py-4">
        <div class="container-fluid">
          <div class="d-flex justify-content-end mb-3">
            {' '}
            <Link
              type="button"
              to="/add-ticket"
              class="btn btn-primary btn-lg "
            >
              Tambah Data
            </Link>
          </div>
        </div>

        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">No Telefon</th>
              <th scope="col">Email</th>
              <th scope="col">Nama Konser</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {tickets.map((ticket, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{ticket.buyer_name}</td>
                <td>{ticket.buyer_phone}</td>
                <td>{ticket.buyer_email}</td>
                <td>{ticket.concert_name}</td>
                <td>
                  <Link
                    className="btn btn-warning mx-2"
                    to={`/edit-ticket/${ticket.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-primary"
          type="button"
          onClick={exportToExcel}
        >
          Export to Excel
        </button>
      </div>
    </div>
  );
}
