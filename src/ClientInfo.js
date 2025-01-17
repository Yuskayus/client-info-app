import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ProgressBar, Card, Container, Row, Col } from 'react-bootstrap';
// import TabsComponent from './TabsComponent'
import StoryTabs from './StoryTabs'; // Import komponen StoryTabs

const ClientInfo = () => {
  const { clientId } = useParams();
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        console.log(`Fetching data for clientId: ${clientId}`);
        const response = await axios.get(`http://localhost:3002/api/client/basics/${clientId}`);
        console.log('Client data:', response.data);
        setClientData(response.data);
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientData();
  }, [clientId]);

  if (!clientData) {
    console.log('Client data is null');
    return <div>Loading...</div>;
  }

    const progress = (parseInt(clientData.ClientNID, 10) % 100);

    // Data stories untuk contoh
    // const stories = [
    //     { content: <p>ClientNID: {clientData.ClientNID}</p>, backgroundImage: 'url(/images/Backround1.svg)' },
    //     { content: <p>ClientID: {clientData.ClientID}</p>, backgroundImage: 'url(/images/Backround2.svg)' },
    //     { content: <p>ClientName: {clientData.ClientName}</p>, backgroundImage: 'url(/images/Backround3.svg)' },
    //     { content: <p>Email: {clientData.Email}</p>, backgroundImage: 'url(/images/Backround4.svg)' },
    //     { content: <p>Additional Info: ...</p>, backgroundImage: 'url(/images/Backround5.svg)' }
    //   ];

    // Data stories untuk contoh
  const stories = [
    {
      content: (
        <div style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
            <h2>Halo, {clientData.ClientName}</h2>
            <p>Additional information about the client...</p>
        </div>
      ),
      backgroundImage: 'url(/images/Backround1.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
            <h2>Halo, {clientData.ClientName}</h2>
            <p>Additional information about the client...</p>
        </div>
      ),
      backgroundImage: 'url(/images/Backround2.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
          <p>Additional information about the client...</p>
        </div>
      ),
      backgroundImage: 'url(/images/Backround3.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
            <h2>Email: {clientData.Email}</h2>
            <p>Additional information about the client...</p>
        </div>
      ),
      backgroundImage: 'url(/images/Backround4.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
            <h2>Additional Info</h2>
            <p>Details about the client's additional information...</p>
        </div>
      ),
      backgroundImage: 'url(/images/Backround5.svg), url(/images/Logo.svg)'
    }
  ];
    

  return (
    <Container>
      <h1>Client Information Page</h1>
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card>
            <Card.Body>

              <Card.Title>Client Information</Card.Title>

              <StoryTabs stories={stories} /> {/* Gunakan komponen*/}
              {/* <TabsComponent clientData={clientData} /> Gunakan komponen TabsComponent */}
              <Card.Img variant="top" src="path_to_image.jpg" alt="Client Image" />
              <Card.Text>
                <strong>ClientNID:</strong> {clientData.ClientNID} <br/>
                <strong>ClientID:</strong> {clientData.ClientID} <br/>
                <strong>ClientName:</strong> {clientData.ClientName} <br/>
                <strong>Email:</strong> {clientData.Email} <br/>
              </Card.Text>
              <ProgressBar now={progress} label={`${progress}%`} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientInfo;
