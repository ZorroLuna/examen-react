import React from 'react';
import logo from './assets/logo.png'; // Importamos la imagen como un módulo

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <img src={logo} alt="Gapsi Logo" className="header-logo" />
        <h1>e-Commerce Gapsi</h1>
      </div>
    </header>
  );
};

export default Header;