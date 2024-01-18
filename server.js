require('dotenv').config();
const express = require('express');
const router = require('./app/mercadoPago/route.js');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const cors = require('cors');

// Configuración de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_ACCESS_TOKEN,
  siteId: 'MLA',
});

const app = express();
const port = 4000;

// Configuración de CORS
const corsOptions = {
  origin: '*',
  methods: 'POST',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json()); 

// Asignar el cliente de Mercado Pago a la variable de entorno para que esté disponible en todas partes
app.set('mercadopagoClient', client);

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});

app.use("/mercadoPago/route", router);

console.log("3. Servidor inicializado exitosamente.");