import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for a modern and sleek UI
const QrContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0d1117;
  color: #c9d1d9;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #58a6ff;
`;

const InputField = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #30363d;
  border-radius: 8px;
  background-color: #161b22;
  color: #c9d1d9;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #58a6ff;
  }

  &::placeholder {
    color: #8b949e;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #238636;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2ea043;
  }

  &:disabled {
    background-color: #3a3f47;
    cursor: not-allowed;
  }
`;

const QRWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  text-align: center;
`;

const Qrgenerator = () => {
  const [url, setUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleGenerateQRCode = async () => {
    if (url) {
      const generatedQRCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=256x256`;
      setQrCodeUrl(generatedQRCodeUrl);
    } else {
      alert("Please enter a URL");
    }
  };

  return (
    <QrContainer>
      <Title>QR Code Generator</Title>
      <InputField 
        type="text" 
        value={url} 
        onChange={handleChange} 
        placeholder="Enter URL" 
      />
      <Button 
        onClick={handleGenerateQRCode}
        disabled={!url}
      >
        Generate QR Code
      </Button>

      {qrCodeUrl && (
        <QRWrapper>
          {/* Display the QR code image */}
          <img 
            id="qr-code-image"
            src={qrCodeUrl} 
            alt="Generated QR Code" 
          />
        </QRWrapper>
      )}
    </QrContainer>
  );
};

export default Qrgenerator;
