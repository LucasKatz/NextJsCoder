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

router.post("/mercadoPago/route", async (req, res) => {
  console.log("Recibida solicitud POST a /api/mercadoPago");

  try {
    console.log("Cuerpo de la solicitud:", req.body);
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
      ],
      notification_url: "https://tu-domino.com/webhook",

      back_urls: {
        success: "https://www.youtube.com/@onthecode",
        failure: "https://www.youtube.com/@onthecode",
        pending: "https://www.youtube.com/@onthecode",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear la preferencia :(",
    });
  }
});

module.exports = router;
