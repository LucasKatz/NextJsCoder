

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
      <section className="flex flex-col  items-center justify-between min-h-screen">

      <div class="relative">
    <div class="flex text-text-color-3 bg-bg-color-5 font-lobster text-xl text-center p-3 w-3/4 ml-36 rounded-lg mb-5">
        <p>Primero necesita loguearse para poder comprar. Encontrará el icono de ingreso/registro en la esquina superior derecha de la pantalla. En caso de no contar con una cuenta, ingrese en la sección de registro y proceda a registrarse</p>
    </div>
    <div class="absolute left-28 top-8 h-12 w-12 bg-bg-color-3 flex justify-center items-center rounded-full text-white">
        <span className="font-bold">1</span>
    </div>
</div>


<div class="relative">
    <div class="flex text-text-color-5 bg-bg-color-3 font-lobster text-xl text-center p-3  w-3/4 ml-52 rounded-lg mb-5">
        <p>Una vez ingresado, debería ver su dirección de correo electrónico a la izquierda del botón de registro de la página. Desde el mismo, podrá acceder a su perfil y/o cerrar sesión.</p>
    </div>
    <div class="absolute left-44 top-4 h-12 w-12 bg-bg-color-5 flex justify-center items-center rounded-full text-color-3">
        <span className="text-text-color-3 font-bold">2</span>
    </div>
</div>

<div class="relative">
    <div class="flex text-text-color-3 bg-bg-color-5 font-lobster text-xl text-center p-3 w-3/4 ml-36 rounded-lg mb-5">
        <p>Luego de loguearse, ir al catálogo que se encuentra en la sección de productos (se pueden ver las distintas secciones en la barra de navegación en la parte superior). El mismo cuenta con un submenu para filtrar por categorías y/o idiomas.</p>
    </div>
    <div class="absolute left-28 top-8 h-12 w-12 bg-bg-color-3 flex justify-center items-center rounded-full text-white">
        <span>3</span>
    </div>
</div>

<div class="relative">
    <div class="flex text-text-color-5 bg-bg-color-3 font-lobster text-xl text-center p-3  w-3/4 ml-52 rounded-lg mb-5">
        <p>Cada producto cuenta con 2 botones. El botón de agregar agrega el producto al carrito. El botón de ver detalle permite ver una breve descripción y otras caracteristicas del producto.</p>
    </div>
    <div class="absolute left-44 top-4 h-12 w-12 bg-bg-color-5 flex justify-center items-center rounded-full text-color-3">
        <span className="text-text-color-3 font-bold">4</span>
    </div>
</div>

        <div class="relative">
    <div class="flex text-text-color-3 bg-bg-color-5 font-lobster text-xl text-center p-3 w-3/4 ml-36 rounded-lg mb-5">
        <p>Luego de agregar los productos que desea comprar, puede seleccionar la opción ir al carrito desde el botón que se encuentra en la vista de ver detalle del producto o acceder al mismo desde el icono del carrito que se encuentra en la esquina superior derecha.</p>
    </div>
    <div class="absolute left-28 top-8 h-12 w-12 bg-bg-color-3 flex justify-center items-center rounded-full text-white">
        <span>5</span>
    </div>
</div>

<div class="relative">
    <div class="flex text-text-color-5 bg-bg-color-3 font-lobster text-xl text-center p-3  w-3/4 ml-52 rounded-lg mb-5">
        <p>Una vez verificado el detalle de su compra, clickee el boton Proceder al pago. Seleccione el metodo de pago y seleccione si desea descargar el ticket de compra.
              Una vez finalizada la compra aparecerá un mensaje de agradecimiento y nos pondremos en contacto con usted cuando su pedido este listo.</p>
    </div>
    <div class="absolute left-44 top-8 h-12 w-12 bg-bg-color-5 flex justify-center items-center rounded-full text-color-3">
        <span className="text-text-color-3 font-bold">6</span>
    </div>
</div>
      </section>
    </main>
  );
}

  

