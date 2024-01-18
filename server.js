require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mercadoPagoRouter = require('./app/mercadoPago/route.js');

const app = express();
const port = 4000;

// Configuración de CORS
app.use(cors());
app.use(express.json());

// Agregar el middleware para MercadoPago a la aplicación
app.use("/api/mercadoPago", mercadoPagoRouter);

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});

console.log("Servidor inicializado exitosamente.");
