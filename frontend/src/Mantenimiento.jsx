import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Mantenimiento = () => {
  const [proveedores, setProveedores] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', razonSocial: '', direccion: '' });
  const [pagination, setPagination] = useState({ page: 1, size: 5, total: 0 });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // 1. Cargar proveedores al iniciar o cambiar de página
  useEffect(() => {
    fetchProveedores();
  }, [pagination.page]);

  const fetchProveedores = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/proveedores?page=${pagination.page}&size=${pagination.size}`);
      const result = await response.json();
      setProveedores(result.data);
      setPagination(prev => ({ ...prev, total: result.total }));
    } catch (err) {
      console.error("Error al cargar:", err);
    }
  };

  // 2. Manejar Formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Limpiar error al escribir
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/proveedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, estado: 'Activo' })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.mensaje); // Aquí capturamos la validación del Back-end (Duplicado)
        return;
      }

      setFormData({ nombre: '', razonSocial: '', direccion: '' }); // Limpiar
      fetchProveedores(); // Recargar tabla
      alert("Proveedor agregado correctamente");
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  // 3. Eliminar Proveedor
  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este proveedor?")) {
      await fetch(`http://localhost:5000/api/proveedores/${id}`, { method: 'DELETE' });
      fetchProveedores();
    }
  };

  return (
    <div className="mantenimiento-container">
      <hr />

      <h3>Lista de Proveedores</h3>
      <table className="gapsi-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Razón Social</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.razonSocial}</td>
              <td>{p.direccion}</td>
              <td>
                <button onClick={() => handleEliminar(p.id)} className="btn-del">Eliminar</button>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button onClick={() => navigate('/nuevo')} className="btn-add">Agregar Proveedor</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button disabled={pagination.page === 1} onClick={() => setPagination({...pagination, page: pagination.page - 1})}>Anterior</button>
        <span> Página {pagination.page} </span>
        <button disabled={pagination.page * pagination.size >= pagination.total} onClick={() => setPagination({...pagination, page: pagination.page + 1})}>Siguiente</button>
      </div>
    </div>
  );
};

export default Mantenimiento;