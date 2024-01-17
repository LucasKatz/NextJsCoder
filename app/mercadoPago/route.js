const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_ACCESS_TOKEN,
  siteId: 'MLA',
});

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Soy el server :)");
});

router.post("/mercadoPago/route", async (req, res) => {
  console.log("4. Recibida solicitud POST a /api/mercadoPago");

  try {
    console.log("5. Cuerpo de la solicitud:", req.body);
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

    console.log("6. Preferencia creada exitosamente en MercadoPago.", result);


    res.json({
      id: result.id, 
  });

  console.log("9. resultado de id", result.id);
  } catch (error) {

    console.error("7. Error al crear la preferencia:", error);

        // Asegúrate de que solo envías la respuesta en caso de error, y no en otros casos
        if (!res.headersSent) {
            res.status(500).json({
                error: "Error al crear la preferencia :(",
            });
        }
  }
});

console.log("8. Router inicializado exitosamente.");

module.exports = router;

