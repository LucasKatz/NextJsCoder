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

      // Lee el cuerpo del flujo como JSON
      const requestBody = await req.json();

      // Desestructura los datos necesarios del cuerpo
      const { items, notification_url, back_urls, auto_return } = requestBody;

      const body = {
        items,
        notification_url,
        back_urls,
        auto_return,
      };

      const preference = new Preference(client);
      console.log("body", body);
      const result = await preference.create({ body });

      console.log("Preferencia creada exitosamente en MercadoPago:", result);

      res.json({
        id: result.id,
      });

      console.log("Resultado de ID:", result.id);
    } else {
      // Si el método de la solicitud no es POST, devuelve un error 405 (Method Not Allowed)
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);

    // Asegúrate de que solo envías la respuesta en caso de error, y no en otros casos
    if (!res.headersSent) {
      NextResponse({ message: "Error al procesar la solicitud 2" });
    }
  }
}
