const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;
const DATA_FILE = './proveedores.json';

app.use(cors());
app.use(express.json());

// Función auxiliar para leer el archivo
const leerProveedores = () => {
    const raw = fs.readFileSync(DATA_FILE);
    return JSON.parse(raw);
};

// Función auxiliar para escribir en el archivo
const guardarProveedores = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// 1. CONSULTA PAGINADA (GET)
// Ejemplo: /api/proveedores?page=1&size=5
app.get('/api/proveedores', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const proveedores = leerProveedores();

    const inicio = (page - 1) * size;
    const fin = inicio + size;
    
    const resultado = proveedores.slice(inicio, fin);

    res.json({
        total: proveedores.length,
        page,
        size,
        data: resultado
    });
});

// 2. AGREGAR CON VALIDACIÓN (POST)
app.post('/api/proveedores', (req, res) => {
    const { nombre, razonSocial, rfc, estado } = req.body;
    const proveedores = leerProveedores();

    // Validar si el nombre ya existe
    const duplicado = proveedores.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    
    if (duplicado) {
        return res.status(400).json({ mensaje: "Error: El nombre del proveedor ya existe." });
    }

    const nuevoProveedor = { id: Date.now(), nombre, razonSocial, rfc, estado };
    proveedores.push(nuevoProveedor);
    guardarProveedores(proveedores);

    res.status(201).json(nuevoProveedor);
});

// 3. ELIMINAR PROVEEDOR (DELETE)
app.delete('/api/proveedores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let proveedores = leerProveedores();
    
    const existe = proveedores.find(p => p.id === id);
    if (!existe) return res.status(404).json({ mensaje: "Proveedor no encontrado" });

    proveedores = proveedores.filter(p => p.id !== id);
    guardarProveedores(proveedores);

    res.json({ mensaje: "Proveedor eliminado con éxito" });
});

// Endpoint de Bienvenida (ya lo teníamos)
app.get('/api/config', (req, res) => {
    res.json({ candidato: "Bienvenido Candidato 01", version: "v1.0.2" });
});

app.listen(PORT, () => console.log(`Servidor Gapsi en puerto ${PORT}`));