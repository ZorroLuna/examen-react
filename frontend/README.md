e-Commerce Gapsi - Panel de Proveedores
Este proyecto es una aplicación Full Stack desarrollada para la gestión y mantenimiento de proveedores. Utiliza una arquitectura desacoplada con un Frontend en React y un Backend en Node.js con persistencia de datos en un archivo JSON.

🚀 Características
Pantalla de Bienvenida: Consumo de datos dinámicos (Candidato y Versión) desde el API.

CRUD de Proveedores: Listado, creación y eliminación de registros.

Paginación: Navegación optimizada de datos del lado del servidor.

Navegación SPA: Uso de react-router-dom para una experiencia sin recargas.

Validaciones: Prevención de nombres duplicados desde el Backend.

🛠️ Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:

Node.js (Versión 14 o superior recomendada).

npm (viene incluido con Node).

📦 Instalación y Puesta en Marcha
1. Clonar el repositorio
Bash
git clone <url-de-tu-repositorio>
cd "EXAMEN REACT"
2. Configurar el Backend (Servidor)
Desde la raíz del proyecto:

Bash
# Instalar dependencias del servidor
npm install

# Iniciar el servidor de Node.js
node server.js
El servidor correrá en: http://localhost:5000

3. Configurar el Frontend (React)
Abre una nueva terminal y dirígete a la carpeta del cliente:

Bash
cd frontend

# Instalar dependencias de React
npm install

# Iniciar la aplicación
npm start
La aplicación se abrirá automáticamente en: http://localhost:3000

📂 Estructura del Proyecto
/server.js: Servidor Express y endpoints REST.

/proveedores.json: Nuestra "Base de Datos" local.

/frontend/src: Código fuente de React.

/components: Lógica de Bienvenida, Mantenimiento y Formulario.

/assets: Logotipos e imágenes.

👨‍💻 Candidato
Nombre: Candidato 01

Proyecto: Evaluación Técnica Gapsi e-Commerce.