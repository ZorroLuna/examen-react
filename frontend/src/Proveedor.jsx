import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Proveedor = () => {
  const [formData, setFormData] = useState({ nombre: '', razonSocial: '', direccion: '' });
  const navigate = useNavigate();

  const handleAgregar = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/proveedores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      navigate('/mantenimiento'); // Regresa automáticamente
    } else {
      const data = await response.json();
      alert(data.mensaje);
    }
  };

  return (
    <div className="form-container">
      <h2>Nuevo Proveedor</h2>
      <form onSubmit={handleAgregar} className="gapsi-form">
        <input name="nombre" placeholder="Nombre" onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
        <input name="razonSocial" placeholder="Razón Social" onChange={(e) => setFormData({...formData, razonSocial: e.target.value})} required />
        <input name="direccion" placeholder="Dirección" onChange={(e) => setFormData({...formData, direccion: e.target.value})} required />
        <div className="form-actions">
           <button type="submit" className="btn-save">Guardar</button>
           <button type="button" onClick={() => navigate('/mantenimiento')} className="btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default Proveedor;