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
app.use(cors({
  origin: 'https://nightowlresources.vercel.app/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));app.use(express.json());

// Asignar el cliente de Mercado Pago a la variable de entorno para que esté disponible en todas partes
app.set('mercadopagoClient', client);

app.get('/redireccionar', (req, res) => {
  const prefId = req.query.pref_id;
  // Validar y procesar prefId según tus necesidades
  const url = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${prefId}`;
  res.redirect(url);
});


app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});

app.use("/", router);

console.log("3. Servidor inicializado exitosamente.");
