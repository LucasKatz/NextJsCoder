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

const corsOptions = {
  origin: ['https://nightowlresources.vercel.app/', 'https://www.mercadopago.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", router);

// Asignar el cliente de Mercado Pago a la variable de entorno para que esté disponible en todas partes
app.set('mercadopagoClient', client);


app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});

app.use("/", router);

console.log("3. Servidor inicializado exitosamente.");