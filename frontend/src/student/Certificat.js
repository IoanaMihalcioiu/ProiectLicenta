import React from 'react';
import { jsPDF } from 'jspdf';
import './Certificat.css';

const Congratulations = () => {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFillColor(200, 220, 255); // culoarea fundalului în format RGB
    doc.rect(0, 0, 210, 297, 'F');
    doc.setFontSize(22);
    doc.text('Certificat de Finalizare', 20, 30);
    doc.setFontSize(16);
    doc.text('Felicitari pentru finalizarea cursului!', 20, 50);
    doc.text('Acest certificat confirma ca ati finalizat cu succes cursul de \n Teoria Transmisiunii Informatiei.', 20, 60);
    doc.save('diploma.pdf');
  };

  return (
    <div className="congratulations-container">
      <h1>Felicitari!</h1>
      <p>Ati finalizat cu succes cursul de Teoria Transmisiunii Informatiei.</p>
      <button onClick={handleDownload}>Descarcă Diploma</button>
    </div>
  );
};

export default Congratulations;
