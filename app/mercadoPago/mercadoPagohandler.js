
const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_ACCESS_TOKEN,
  siteId: 'MLA',
});

const createMercadoPagoPreference = async (req, res) => {
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
        success: "https://nightowlresources.vercel.app/thanks",
        failure: "https://nightowlresources.vercel.app/not-found",
        pending: "https://nightowlresources.vercel.app",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    console.log("Preferencia creada exitosamente en MercadoPago.", result);

    res.json({
      id: result.id,
    });

    console.log("Resultado de id", result.id);
  } catch (error) {
    console.error("Error al crear la preferencia:", error);

    // Asegúrate de que solo envías la respuesta en caso de error, y no en otros casos
    if (!res.headersSent) {
      res.status(500).json({
        error: "Error al crear la preferencia :(",
      });
    }
  }
};

module.exports = {
  createMercadoPagoPreference,
};
