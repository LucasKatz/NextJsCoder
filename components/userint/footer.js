import Link from "next/link";
import Image from "next/image";
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-purple-900 ">
      <div className="container mx-auto py-3 w-full flex flex-col md:flex-row justify-between">

        {/* Left Section */}
        <div className="w-full md:w-1/3 p-4"> {/* Añade la propiedad border */}
          <Link href={"/about"}>
            <h3 className="text-2xl font-semibold text-center font-lobster">About Us</h3>
          <p className="mt-1 p-4">
            In the heart of the educational landscape, an innovative venture emerged from the passion of an English teacher. Fueled by the vision to redefine teaching, this entrepreneur set out to create a haven for educators.
          </p>
          </Link>
        </div>

        {/* Middle Section */}
        <div className="w-full md:w-1/3 flex items-center justify-center "> {/* Añade la propiedad border */}
          <Link href="/">
            <Image src="/images/logo.jpeg" alt="Logo" width={140} height={160} />
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 p-4 "> {/* Añade la propiedad border */}
          <h3 className="text-2xl font-semibold text-center font-lobster">¡No te olvides!</h3>
          <p className="mt-1 p-4">
           ¡Seguinos en redes para estar al tanto de todas las novedades!
          </p>
          <div className=" flex px-4">
            <Link href="https://www.instagram.com/night.owl.resources/" className="text-xl flex items-center">
              <FaInstagram className="mr-1" />
              <p className="text-xl">@night.owl.resources</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
