import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer text-purple-900">
    <div className="container mx-auto py-6">
      <div className="flex justify-between">
        {/* Sección Izquierda */}
        <div className="w-1/3 p-4">
          <h2 className="text-2xl font-semibold">Nosotros</h2>
          <p className="mt-4">
            Nuestra Empresa desde hace más de 12 años se dedica a la comercialización de los más diversos productos destinados a Iluminación decorativa, profesional y comercial. Asimismo, ofrecemos nuestro servicio de asesoramiento y asistencia técnica al Profesional.
          </p>
        </div>
  
        {/* Sección Central */}
        <div className="w-1/3 flex items-center justify-center">
          <Link href="#">
            <img className="logo" alt="Logo" />
          </Link>
        </div>
  
        {/* Sección Derecha */}
        <div className="w-1/3 p-4">
          <h2 className="text-2xl font-semibold">Seguinos en redes</h2>
          <div className="mt-4 flex space-x-4">
            <Link href="#" className="text-xl">
              <i className="fab fa-facebook-square"></i>
            </Link>
            <Link href="#" className="text-xl">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="#" className="text-xl">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link href="#" className="text-xl">
              <i className="fab fa-linkedin"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
  
  
  );
};

export default Footer;
