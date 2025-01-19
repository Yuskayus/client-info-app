import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ProgressBar, Card, Container, Row, Col } from 'react-bootstrap';
// import TabsComponent from './TabsComponent'
import StoryTabs from './StoryTabs'; // Import komponen StoryTabs

const ClientInfo = () => {
  const { clientId } = useParams();
  const [clientData, setClientData] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [kerajinanData, setKerajinanData] = useState(null);
  // const [seringDibeli, setSeringDibeli] = useState(null);

    // Fungsi untuk menampilkan logo dan teks berdasarkan grade
    // const renderGrade = (grade) => {
    //   switch (grade) {
    //     case "A":
    //       return (
    //         <div>
    //           <img src="/logo/A.svg" alt="Logo A" />
    //           <p>Kamu adalah rizz investor</p>
    //         </div>
    //       );
    //     case "B":
    //       return (
    //         <div>
    //           <img src="/logo/B.svg" alt="Logo B" />
    //           <p>Kamu ga pernah berhenti buat</p>
    //         </div>
    //       );
    //     case "C":
    //       return (
    //         <div>
    //           <img src="/logo/C.svg" alt="Logo C" />
    //           <p>Kamu terbilang fokus</p>
    //         </div>
    //       );
    //       case "D":
    //         return (
    //           <div>
    //             <img src="/logo/D.svg" alt="Logo C" />
    //             <p>Kamu selalu merasa santai</p>
    //           </div>
    //         );
    //         case "E":
    //           return (
    //             <div>
    //               <img src="/logo/E.svg" alt="Logo C" />
    //               <p>Hmm sudah lama sekali rasa nya</p>
    //             </div>
    //           );
    //     default:
    //       return <p>Grade not found</p>;
    //   }
    // };

    // function formatDate(dateString, formatType = "default") {
    //   const date = new Date(dateString);
    
    //   if (isNaN(date)) {
    //     return "Invalid Date"; // Jika tanggal tidak valid
    //   }
    
    //   const day = String(date.getDate()).padStart(2, "0");
    //   const monthIndex = date.getMonth(); // Indeks bulan (0-11)
    //   const month = String(date.getMonth() + 1).padStart(2, "0");
    //   const year = date.getFullYear();
  
    //   const monthsText = [
    //     "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    //     "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    //   ];
    
    //   switch (formatType) {
    //     case "calendar":
    //       // Format untuk kalender: "DD\nMM\nYYYY"
    //       return `${day}\br${month}\br${year}`;
    //     case "default":
    //       // Format default Anda sebelumnya
    //       return `${day}-${month}-${year}`;
    //     case "slash":
    //       // Format dengan slash (untuk contoh)
    //       return `${day}/${month}/${year}`;
    //     case "textMonth":
    //         // Format dengan nama bulan dalam teks
    //       return `${day} ${monthsText[monthIndex]} ${year}`;
    //     default:
    //       // Format fallback jika tipe tidak dikenali
    //       return `${day}-${month}-${year}`;
    //   }
    // }
  

  //Fetch data dari API
  function formatDateVertical(dateString) {
    const date = new Date(dateString);
  
    if (isNaN(date)) {
      return "Invalid Date";
    }
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    return (
      <div style={{ textAlign: "center" }}>
        <div>{day}</div>
        <div>{month}</div>
        <div>{year}</div>
      </div>
    );
  }

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

  // useEffect(() => {
  //   if (clientData) {
  //     const fetchKerajinanData = async () => {
  //       try {
  //         const response = await fetch("http://localhost:3001/api/tingkat-kerajinan");
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         const data = await response.json();
  
  //         // Cari data kerajinan yang sesuai dengan ClientID
  //         const filteredData = data.find(item => item.ClientID === clientData.ClientID);
  
  //         if (filteredData) {
  //           setKerajinanData(filteredData); // Simpan data jika ditemukan
  //         } else {
  //           setKerajinanData(null); // Jika tidak ditemukan, set null
  //         }
  //       } catch (err) {
  //         console.error("Error fetching tingkat kerajinan:", err.message);
  //         setError(err.message);
  //       }
  //     };
  
  //     fetchKerajinanData();
  //   }
  // }, [clientData]); // Jalankan ulang ketika clientData berubah

  // useEffect(() => {
  //     if (clientData) {
  //       const fetchSeringDibeli = async () => {
  //         try {
  //           const response = await fetch('http://localhost:3001/api/saham-sering-dibeli');
  //           if (!response.ok) {
  //             throw new Error(`HTTP error! status: ${response.status}`);
  //           }
  //           const data = await response.json();
    
  //           // Cari data kerajinan yang sesuai dengan ClientID
  //           const filteredData = data.find(item => item.ClientID === clientData.ClientID);
    
  //           if (filteredData) {
  //             setSeringDibeli(filteredData); // Simpan data jika ditemukan
  //           } else {
  //             setSeringDibeli(null); // Jika tidak ditemukan, set null
  //           }
  //         } catch (err) {
  //           console.error("Error fetching tingkat kerajinan:", err.message);
  //           setError(err.message);
  //         }
  //       };
    
  //       fetchSeringDibeli();
  //     }
  //   }, [clientData]); // Jalankan ulang ketika clientData berubah

  if (!clientData) {
    console.log('Client data is null');
    return <div>Loading...</div>;
  }

    const progress = (parseInt(clientData.ClientNID, 10) % 100);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;


  const stories = [
    {
      content: (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'flex-start', 
          height: '100vh', 
          textAlign: 'center', 
          color: 'white' 
        }}>
        <img src="/images/Logo.svg" alt="Logo" className="story-logo" style={{ marginBottom: '20px' }} />
        <h2>Halo, {clientData.ClientName}</h2>
        <div style={{ 
            maxWidth: '600px', 
            margin: '0 auto', 
            textAlign: 'left', // Menjadikan teks rata kiri
        }}>
          <p style={{
            textAlign: 'left', // Menjadikan teks rata kiri
          }}>
            Terima kasih telah bersama kami<br /> 
            di sepanjang 2024! Tahun lalu,
            kita<br /> telah melewati berbagai momen<br /> menarik di dunia saham. Kami<br />
            sangat menghargai kepercayaan<br /> Anda sebagai nasabah di Alpha<br />
            Investasi. Semoga kita terus bisa<br /> tumbuh bersama dan meraih<br /> sukses
            finansial di tahun-tahun<br /> mendatang.<br /><br />
            Salam Hangat,<br /> Alpha Investasi
          </p>
        </div>
      </div>
      ),
      backgroundImage: 'url(/images/Backround1.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
            <h3>Halo, {clientData.ClientName}</h3>
            <p>Kamu bersama Alpha Sejak,</p>
            <img
              src="/images/calendar1.png"
              alt="Calendar"
              className="calendar-image"
              style={{ width: '150px', height: '150px' }}
            />
            {/* Tanggal di Atas Gambar */}
        <div
          style={{
            position: 'absolute',
            top: '60%', // Atur posisi ke tengah
            left: '50%', // Atur posisi ke tengah
            transform: 'translate(-50%, -50%)', // Sesuaikan agar tepat di tengah
            color: 'white', // Warna teks
            fontSize: '20px', // Ukuran font
            fontWeight: 'bold', // Tebalkan teks
            textAlign: 'center', // Pusatkan teks
            border: '2px solid white',
          }}
        >
          {formatDateVertical(clientData.TanggalPembuatan)}
        </div>
        <p>
        Kamu telah bersama Alpha Investasi Selama{' '}
        {clientData.LamaMenjadiNasabahDalamHari} hari. Wow!. Terima kasih telah
        menjadi bagian dari perjalanan kami hingga saat ini.
      </p>
            
        </div>
        
      ),
      backgroundImage: 'url(/images/Backround2.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
          <p>Frekuensi Transaksi<br/>kamu tahun 2024</p>
          {/* {renderGrade(kerajinanData.Grade)} */}
        </div>
      ),
      backgroundImage: 'url(/images/Backround3.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
            {/* <h2>Email: {clientData.Email}</h2> */}
           <p> Perkembangan Aset<br/> dalam 2024<br/></p>
                      {/* <p>
           Tanggal Terakhir Transaksi<br/> {formatDate(clientData.TransaksiTerakhirNasabah, "textMonth")}
            {(kerajinanData.Grade)}
            {renderGrade(kerajinanData.Grade)}
            
          </p> */}
        </div>
      ),
      backgroundImage: 'url(/images/Backround4.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
          <p>
            Saham Favoritmu di<br/> 2024 
          </p>
        </div>
      ),
      backgroundImage: 'url(/images/Backround5.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
          <p>
            Saham Paling Cuan di<br/> 2024 
          </p>
        </div>
      ),
      backgroundImage: 'url(/images/Backround5.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
          <p>
            Saham Paling Boncos di<br/> 2024 
          </p>
        </div>
      ),
      backgroundImage: 'url(/images/Backround5.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
          <p>
            Terima kasih
          </p>
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
