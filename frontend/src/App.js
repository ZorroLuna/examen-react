import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Welcome from './Bienvenido';
import MantenimientoProveedores from './Mantenimiento';
import FormularioProveedor from './Proveedor';
import './gapsi.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Pantalla de Inicio */}
            <Route path="/" element={<Welcome />} />
            
            {/* Pantalla de Lista */}
            <Route path="/mantenimiento" element={<MantenimientoProveedores />} />
            
            {/* Pantalla de Formulario */}
            <Route path="/nuevo" element={<FormularioProveedor />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;