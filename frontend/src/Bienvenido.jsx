import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './assets/logo-candidato.jpg'; 
const Bienvenido = () => {
  const [config, setConfig] = useState({ candidato: 'Cargando...', version: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Llamada al servicio REST de NodeJs
    fetch('http://localhost:5000/api/config')
      .then(response => response.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Error al obtener config:", err));
  }, []);

  return (
    <div className="welcome-container">
      {/* Imagen del candidato (puedes usar un placeholder o tu propia foto) */}
      <img 
        src={logo}
        alt="Foto del Candidato" 
        className="profile-img" 
      />
      <h2>{config.candidato}</h2>
      <p>Versión de la aplicación: <strong>{config.version}</strong></p>
      <button onClick={() => navigate('/mantenimiento')} className="btn-continue">
          Continuar
    </button>
    </div>
  );
};

export default Bienvenido;