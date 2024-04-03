import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';

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
      const result = await preference.create({ body });

      return NextResponse.json({
        id: result.id,
      });
      
    } else {
      // Si el método de la solicitud no es POST, devuelve un error 405 (Method Not Allowed)
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);

    // Envía un código de estado 500 y la respuesta como JSON
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

