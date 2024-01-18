require('dotenv').config();
const { MercadoPagoConfig, Preference } = require('mercadopago');


const client = new MercadoPagoConfig({
  accessToken: "TEST-8977318554138840-010918-484d7256df3c0b7dba0ecd3c811a20bf-124181768",
  siteId: 'MLA',
});

console.log("Token de acceso de Mercado Pago:", process.env.NEXT_ACCESS_TOKEN);


const createMercadoPagoPreference = async (orderData) => {
  console.log("Recibida solicitud para crear preferencia en MercadoPago");

  try {
    console.log("Cuerpo de la solicitud:", orderData);
    const body = {
      items: [
        {
          title: orderData.title,
          quantity: Number(orderData.quantity),
          unit_price: Number(orderData.price),
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

    return {
      id: result.id,
    };
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    throw error; // Re-lanzamos el error para que sea manejado por el código que llama a esta función
  }
};

module.exports = {
  createMercadoPagoPreference,
};
