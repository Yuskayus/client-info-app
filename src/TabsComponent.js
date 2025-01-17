import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './TabsComponent.css'; // Import file CSS untuk styling

const TabsComponent = ({ clientData }) => {
  return (
    <Tabs defaultActiveKey="info" id="client-tabs" className="mb-3">
      <Tab eventKey="info" title="Info">
        <div className="tab-content">
          <h2>Client Information</h2>
          <p>ClientNID: {clientData.ClientNID}</p>
          <p>ClientID: {clientData.ClientID}</p>
          <p>ClientName: {clientData.ClientName}</p>
          <p>Email: {clientData.Email}</p>
        </div>
      </Tab>
      <Tab eventKey="progress" title="Progress">
        <div className="tab-content">
          <h2>Progress Information</h2>
          {/* Tambahkan ProgressBars di sini jika perlu */}
        </div>
      </Tab>
      <Tab eventKey="history" title="History">
        <div className="tab-content">
          <h2>History Information</h2>
          {/* Tambahkan konten history di sini */}
        </div>
      </Tab>
    </Tabs>
  );
};

export default TabsComponent;
