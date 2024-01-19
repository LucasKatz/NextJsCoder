import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_ACCESS_TOKEN,
  siteId: 'MLA',
});

export async function POST(req, res) {
  try {
    if (req.method === 'POST') {
      console.log("Recibida solicitud POST a /apiMercadoPago/mercadoPago");

      const body = {
        items: [
          {
            title: req.body.title,
            quantity: req.body.quantity,
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
      console.log("body",body)
      const result = await preference.create({ body });

      console.log("Preferencia creada exitosamente en MercadoPago:", result);

      res.json({
        id: result.id,
      });

      console.log("Resultado de ID:", result.id);
    } else {
      // Si el método de la solicitud no es POST o GET, devuelve un error 405 (Method Not Allowed)
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);

    // Asegúrate de que solo envías la respuesta en caso de error, y no en otros casos
    if (!res.headersSent) {
        NextResponse({ message: "Error al procesar la solicitud 2" })
    }
  }
}

export async function GET(req, res) {
  return res.json({ message: "Hola Fer, este GET es la ruta correcta, vamos nene que es x acaaaa" });
}
