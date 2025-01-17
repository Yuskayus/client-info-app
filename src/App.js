import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import ClientInfo from './ClientInfo';

function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/client/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home clients={clients} />} /> {/* Rute default */}
        <Route path="/client/:clientId" element={<ClientInfo />} />
      </Routes>
    </Router>
  );
}

function Home({ clients }) {
  return (
    <div>
      <h1>Welcome to the Client Information App</h1>
      <ul>
        {clients.map(client => (
          <li key={client.ClientID}>
            <Link to={`/client/${client.ClientID}`}>{client.Email}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
