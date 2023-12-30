import axios from 'axios';

const chamarAPI = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const user2 = JSON.parse(user);

  const headers = {
    Authorization: `Bearer ${token}`,
    id_usuario: user2.id_usuario,
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
    
  };

  const apiCall = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers: headers,
    withCredentials: true,
  });

  return apiCall;
};

export default chamarAPI;
