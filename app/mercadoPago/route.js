const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_ACCESS_TOKEN,
  siteId: 'MLA',
});

console.log("Token de acceso de Mercado Pago:", process.env.NEXT_ACCESS_TOKEN);

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Soy el server :)");
});

router.post("/forwardToMercadoPago", async (req, res) => {
  try {
    console.log("A. Recibida solicitud POST a /api/forwardToMercadoPago");

    const orderData = req.body;
    console.log("B. Cuerpo de la solicitud:", orderData);

    const response = await fetch("https://www.mercadopago.com.ar/checkout/v1/redirect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    console.log("C. Respuesta del servidor de MercadoPago:", response);

    const preference = await response.json();
    console.log("D. Datos de la preferencia:", preference);

    res.json({
      id: preference.id, 
    });

    console.log("E. Resultado de id:", preference.id);
  } catch (error) {
    console.error("F. Error al reenviar la solicitud a MercadoPago:", error);

    if (!res.headersSent) {
      res.status(500).json({
        error: "Error al reenviar la solicitud a MercadoPago :(",
      });
    }
  }
});

module.exports = router;
