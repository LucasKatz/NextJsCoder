const express = require('express');
const { MercadoPagoConfig} = require('mercadopago');
const mercadoPagoHandler = require('./mercadoPagohandler');


const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_ACCESS_TOKEN,
  siteId: 'MLA',
});

console.log("Token de acceso de Mercado Pago:", process.env.NEXT_ACCESS_TOKEN);


const router = express.Router();

router.post("/mercadoPago/route", mercadoPagoHandler.createMercadoPagoPreference);

console.log("8. Router inicializado exitosamente.");

module.exports = router;
