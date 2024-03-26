import Image from "next/image";

export async function generateMetadata({params, searchParams}, parent) {
  console.log(params)

  return {
      title: `Night Owl - Instrucciones`,
  }
}

export default function About() {
  return (
    <main className="overflow-hidden">
      <h1 className="text-center  my-7 text-text-color-5 font-extrabold text-2xl">Instrucciones de Compra</h1>
      <section className="flex flex-col md:flex-row items-center justify-between min-h-screen">

        <div className="flex w-full  mb-5 md:mr-5 ">
            <p>Primero necesita loguearse para poder comprar. Encontrará el icono de ingreso/registro en la   esquina superior derecha de la pantalla. En caso de no contar con una cuenta, ingrese en la sección de registro y proceda a registrarse </p>
        </div>

        <div className="flex w-full  text-text-color-5 font-lobster text-xl text-center p-3 ">
            <p>Una vez ingresado, deberia ver su dirección de mail a la izquierda del botón de registro de la página. Desde el mismo, podra acceder a su perfil y/o cerrar sesión.</p>
        </div>

        <div className="flex w-full  text-text-color-5 font-lobster text-xl text-center p-3 ">
            <p>Luego de loguearse, ir al catalogo que se encuentra en la sección de productos (se pueden ver las distitnas secciones en la barra de navegación en la parte superior). El mismo cuenta con un submenu para filtrar por categorias y/o idiomas</p>
        </div>

        <div className="flex w-full  text-text-color-5 font-lobster text-xl text-center p-3 ">
            <p>Cada producto cuenta con dos botones. El boton de "agregar" añade el producto al carrito. El botón de "Ver Detalle" permite ver una breve descripción y otras caracteristicas del producto.</p>
        </div>

        <div className="flex w-full  text-text-color-5 font-lobster text-xl text-center p-3 ">
            <p>Luego de agregar los productos que desea comprar, puede seleccionar la opción "ir al carrito" desde el botoón que se encuentra en la vista de "ver detalle" del producto o acceder al mismo desde el icono del carrito que se encuentra en la esquina superior derecha.</p>
        </div>

        <div className="flex w-full  text-text-color-5 font-lobster text-xl text-center p-3 ">
            <p>Una vez verificado el detalle de su compra, clickee el boton "Proceder al pago". Seleccione el metodo de pago y responda a la pregunta de si desea descargar el ticket de compra.
              Una vez finalizada la compra aparecerá un mensaje de agradecimiento y nos pondremos en contacto con usted cuando su pedido este listo.
            </p>
        </div>
      </section>
    </main>
  );
}

  

