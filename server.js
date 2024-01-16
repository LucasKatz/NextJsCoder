require('dotenv').config();
const express = require('express');
const router = require('./app/mercadoPago/route.js');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const cors = require('cors');

// Configuración de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_ACCESS_TOKEN,
});

const app = express();
const port = 4000;

// Configuración de CORS
app.use(cors());
app.use(express.json());

// Asignar el cliente de Mercado Pago a la variable de entorno para que esté disponible en todas partes
app.set('mercadopagoClient', client);


app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});

app.use("/", router);




/*const express = require('express');
const router = require('./app/mercadoPago/route.js');
const cors = require('cors');
require('dotenv').config();



const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});


app.use("/", router);
*/