import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const loadTickets = async (token) => {
  const response = await api.get('/ticket/getAll', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllMaster = async (token) => {
  const response = await api.get('/master/getAllMaster', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const addTicket = async (newTicket, token) => {
  const response = await api.post('/ticket/create', newTicket, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateTicket = async (id, updatedTicket, token) => {
  const response = await api.put(`/ticket/update/${id}`, updatedTicket, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getTicketById = async (id, token) => {
  const response = await api.get(`/ticket/getById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteTicket = async (id, token) => {
  const response = await api.delete(`/ticket/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  const token = response.data.token; // replace 'token' with the actual key if it's different
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return response.data;
};

export const register = async (auth) => {
  const response = await api.post('/auth/register', auth);
  return response.data;
  console.log(response.data);
};

console.log(loadTickets());
