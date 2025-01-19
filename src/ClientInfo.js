import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSwipeable } from 'react-swipeable';
import { ProgressBar, Card, Container, Row, Col } from 'react-bootstrap';
// import TabsComponent from './TabsComponent'
import StoryTabs from './StoryTabs'; // Import komponen StoryTabs
import * as htmlToImage from 'html-to-image';


const ClientInfo = () => {
  const { clientId } = useParams();
  // const [clientData, setClientData] = useState(null);
  const [clientBasics, setClientBasics] = useState([]);
  const [clientDetails, setClientDetails] = useState([]);
  // const [clientDetails, setClientDetails] = useState([]);

  // const [kerajinanData, setKerajinanData] = useState(null);
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

    
  const handlers = useSwipeable({
    onSwipedLeft: () => console.log('Swiped Left'),
    onSwipedRight: () => console.log('Swiped Right'),
  });

    const handleShare = () => {
      const node = document.getElementById("tab-content");
    
      if (!node) {
        console.error('Error: Element with ID "tab-content" not found.');
        return;
      }
    
      // Konversi elemen ke gambar menggunakan html-to-image
      htmlToImage
        .toPng(node)
        .then((dataUrl) => {
          // Cek apakah Web Share API didukung oleh browser
          if (navigator.share) {
            // Siapkan blob dari dataUrl untuk gambar
            fetch(dataUrl)
              .then((res) => res.blob())
              .then((blob) => {
                const file = new File([blob], "share-image.png", { type: "image/png" });
    
                // Gunakan Web Share API
                navigator
                  .share({
                    title: "Alpha Investasi",
                    text: "Lihat perjalanan saya bersama Alpha Investasi! 🌟",
                    files: [file], // Hanya didukung di beberapa browser
                  })
                  .then(() => console.log("Shared successfully!"))
                  .catch((error) => console.error("Error sharing:", error));
              });
          } else {
            console.error("Web Share API tidak didukung di browser ini.");
            alert("Browser Anda tidak mendukung fitur berbagi ini.");
          }
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return (
        <>
          {day}<br/>{month}<br/>{year}
        </>
      );
    };
    
    const formatDateLong = (dateString) => {
      const date = new Date(dateString);
    
      // Nama bulan dalam bahasa Indonesia
      const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
    
      const day = ("0" + date.getDate()).slice(-2);
      const monthName = monthNames[date.getMonth()];
      const year = date.getFullYear();
    
      // Format panjang: 21 November 2003
      return `${day} ${monthName} ${year}`;
    };

    

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
  // function formatDateVertical(dateString) {
  //   const date = new Date(dateString);
  
  //   if (isNaN(date)) {
  //     return "Invalid Date";
  //   }
  
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  
  //   return (
  //     <div style={{ textAlign: "center" }}>
  //       <div>{day}</div>
  //       <div>{month}</div>
  //       <div>{year}</div>
  //     </div>
  //   );
  // }

  useEffect(() => {
    const fetchClientBasics  = async () => {
      try {
        console.log(`Fetching data for clientId: ${clientId}`);
        const response = await axios.get(`http://localhost:3002/api/client/basics/${clientId}`);
        console.log('Client data:', response.data);
        setClientBasics(response.data);
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientBasics();
  }, [clientId]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        console.log(`Fetching data for clientId: ${clientId}`);
        const response = await axios.get(`http://localhost:3002/api/client/details/${clientId}`);
        console.log('Client data:', response.data);
        setClientDetails(response.data);
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientDetails();
  }, [clientId]);

  
  // useEffect(() => {
  //   const fetchSeringDibeli = async () => {
  //     if (!clientData) return;

  //     try {
  //       const response = await axios.get(`http://localhost:3001/api/saham-sering-dibeli/${clientData.ClientID}`);
  //       console.log(`Fetching sering dibeli data for ClientID: ${clientData.ClientID}`);
  //       console.log('Sering dibeli data:', response.data);

  //       if (response.data) {
  //         setSeringDibeli(response.data); // Simpan data jika ditemukan
  //       } else {
  //         setSeringDibeli(null); // Jika tidak ditemukan, set null
  //       }
  //     } catch (error) {
  //       console.error('Error fetching sering dibeli data:', error);
  //       setError(error.message);
  //     }
  //   };

  //   fetchSeringDibeli();
  // }, [clientData]);

  // if (!clientData || !kerajinanData) {
  //   return <div>Loading...</div>;
  // } // Jalankan ulang ketika clientData berubah

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

  // if (!clientData) {
  //   console.log('Client data is null');
  //   return <div>Loading...</div>;
  // }

    const progress = (parseInt(clientBasics.ClientNID, 10) % 100);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;


  const stories = [
    {
      content: (
        <div {...handlers} className="swipeable-container" id="tab-content"  style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'flex-start', 
          height: '100vh', 
          textAlign: 'center', 
          color: 'white' 
        }}>
        <img src="/images/Logo.svg" alt="Logo" className="story-logo" style={{ marginBottom: '20px' }} />
        <h2>Halo, {clientBasics.ClientName}</h2>
        
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
        <button onClick={handleShare} className="share-button">Share </button>
      </div>
      ),
      backgroundImage: 'url(/images/Backround1.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div {...handlers} className="swipeable-container"  id="tab-content" style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
            <h3>Halo, {clientBasics.ClientName}</h3>
            {/* <h1>Client Information</h1> */}
      {/* {clientBasics && (
        <div>
          <h2>Basics</h2>
          <pre>{JSON.stringify(clientBasics, null, 2)}</pre>
        </div>
      )}
      {clientDetails && (
        <div>
          <h2>Details</h2>
          <pre>{JSON.stringify(clientDetails, null, 2)}</pre>
        </div>
      )} */}
            {/* <h3>Halo, {formatDate(clientData.CreatedDate)}</h3> */}
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
            top: '42%', // Atur posisi ke tengah
            left: '50%', // Atur posisi ke tengah
            transform: 'translate(-50%, -50%)', // Sesuaikan agar tepat di tengah
            color: 'white', // Warna teks
            fontSize: '20px', // Ukuran font
            fontWeight: 'bold', // Tebalkan teks
            textAlign: 'center', // Pusatkan teks
            // border: '2px solid white',
          }}
        >
          {formatDate(clientBasics.CreatedDate)}
        </div>
        <p>
        Kamu telah bersama Alpha Investasi Selama{' '}
        {clientDetails.LamaMenjadiNasabahDalamHari} hari. Wow!. Terima kasih telah
        menjadi bagian dari perjalanan kami hingga saat ini.
      </p>
        <button onClick={handleShare} className="share-button">Share </button>
            
        </div>
        
      ),
      backgroundImage: 'url(/images/Backround2.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div {...handlers} className="swipeable-container" id="tab-content" style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
          <p>Frekuensi Transaksi<br/>kamu tahun 2024</p>
          <img
              src="/images/Vector.png"
              alt="Calendar"
              className="calendar-image"
              style={{ width: '80px', height: '80px' }}
            />
  {/* Garis putus-putus atas */}
  <div 
    style={{ 
      borderTop: "1px dashed #fff", 
      width: "80%", 
      margin: "10px auto" 
    }}
  ></div>
   
  {/* Konten */}
  <p 
    style={{ 
      fontSize: "12px", 
      lineHeight: "1.5", 
      textAlign: "center", 
      color: "#aaa" 
    }}
  >
    Tanggal Terakhir Transaksi
  </p>
  <p 
    style={{ 
      fontSize: "16px", 
      fontWeight: "bold", 
      color: "#fff", 
      marginBottom: "10px" 
    }}
  >
    {formatDateLong(clientDetails.TransaksiTerakhirNasabah)}
    {/* Garis putus-putus bawah */}
    <div 
      style={{ 
        borderTop: "1px dashed #fff", 
        width: "80%", 
        margin: "10px auto" 
      }}
    ></div>
    {/* {renderGrade(
      kerajinanData.Grade)} */}
  </p>
          {/* {renderGrade(kerajinanData.Grade)}  */}
          <button onClick={handleShare} className="share-button">Share </button>
       
        </div>
        
      ),
      backgroundImage: 'url(/images/Backround3.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div {...handlers} className="swipeable-container" id="tab-content" style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
            {/* <h2>Email: {clientData.Email}</h2> */}
           <p> Perkembangan Aset<br/> dalam 2024<br/></p>
           <p>
            Perkembangan Aset<br/> dalam 2024<br/>
            <br/>
            Loss<br/>
            <br/>
            Nilai Investasi Awal<br/>
            <br/>
            Loss<br/>
            <br/>
            Total Investasi Sekarang
          </p>
                      {/* <p>
           Tanggal Terakhir Transaksi<br/> {formatDate(clientData.TransaksiTerakhirNasabah, "textMonth")}
            {(kerajinanData.Grade)}
            {renderGrade(kerajinanData.Grade)}
            
          </p> */}
        <button onClick={handleShare} className="share-button">Share </button>

        </div>
      ),
      backgroundImage: 'url(/images/Backround4.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div {...handlers} className="swipeable-container"  id="tab-content" style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
          <p>
            Saham Favoritmu di<br/> 2024 
          </p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <p>Saham menjadi saham Andalan<br/>
            Kamu di 2024! semoga dapat cuan<br/>
            ya dari saham favorit kamu ini</p>
        <button onClick={handleShare} className="share-button">Share </button>

        </div>
        
      ),
      backgroundImage: 'url(/images/Backround5.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div {...handlers}  className="swipeable-container" id="tab-content" style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
          <p>
            Saham Paling Cuan di<br/> 2024 
          </p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <p>Selamat yaa, saham sudah bikin<br/>
            Kamu cuan di tahun kemarin. ini bukti<br/>
            kejelian kamu.Pilihan kamu mantap!</p>
        <button onClick={handleShare} className="share-button">Share </button>

        </div>
      ),
      backgroundImage: 'url(/images/Backround5.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div {...handlers} className="swipeable-container" id="tab-content" style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
          <p>
            Saham Paling Boncos di<br/> 2024 
          </p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <p>Transaksi di saham, ternyata<br/>
            belum sesuai harapan kamu nih. Jangan<br/>
            sedih lagi ya. Alpha temenin kamu buat jadi<br/>
            lebih cuan di tahun ini. Semangat!
            </p>
        <button onClick={handleShare} className="share-button">Share </button>

        </div>
      ),
      backgroundImage: 'url(/images/Backround5.svg), url(/images/Logo.svg)'
    },
    {
      content: (
        <div {...handlers} className="swipeable-container" id="tab-content" style={{ color: 'white' }}>
          <img src="/images/Logo.svg" alt="Logo" className="story-logo" />
          <p>
            Terima kasih
          </p>
        <button onClick={handleShare} className="share-button">Share </button>

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
                <strong>ClientNID:</strong> {clientBasics.ClientNID} <br/>
                <strong>ClientID:</strong> {clientBasics.ClientID} <br/>
                <strong>ClientName:</strong> {clientBasics.ClientName} <br/>
                <strong>Email:</strong> {clientBasics.Email} <br/>
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
