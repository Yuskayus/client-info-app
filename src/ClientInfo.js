import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ProgressBar, Card, Container, Row, Col } from 'react-bootstrap';

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

  return (
    <Container>
      <h1>Client Information Page</h1>
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card>
            <Card.Body>
              <Card.Title>Client Information</Card.Title>
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
