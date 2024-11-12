// Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <Container className="text-center">
        <p>&copy; {new Date().getFullYear()} HighScore Tracker All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
