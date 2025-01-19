import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import ClientInfo from './ClientInfo';
import { writeFile, utils } from 'xlsx';


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

  const exportToExcel = (data) => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Clients');
    writeFile(workbook, 'Clients.xlsx');
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home clients={clients} exportToExcel={exportToExcel} />} /> {/* Default route */}
        <Route path="/client/:clientId" element={<ClientInfo />} />
      </Routes>
    </Router>
  );
}

function Home({ clients, exportToExcel }) {
  return (
    <div>
      <h1>Welcome to the Client Information App</h1>
      <button onClick={() => exportToExcel(clients)}>Export to Excel</button>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>ClientID</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.ClientID}>
              <td>{client.nama}</td>
              <td>{client.ClientID}</td>
              <td>
                <Link to={`/client/${client.ClientID}`}>{client.Email}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
