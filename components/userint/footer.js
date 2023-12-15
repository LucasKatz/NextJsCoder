import Link from "next/link";
import Image from "next/image";
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-purple-900 bg-white">
    <div className="container mx-auto py-3 w-full">
      <div className="flex justify-between">
        {/* Left Section */}
        <div className="w-1/3 p-4">
          <h3 className="text-2xl font-semibold text-center font-lobster">About Us</h3>
            <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore   et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            </p>    
        </div>
  
        {/* Middle Section */}
        <div className="w-1/3 flex items-center justify-center">
          <Link href="/">
          <Image
            src="/images/logo.jpeg"
            alt="Logo"
            width={70}
            height={90}/>
          </Link>
        </div>
  
        {/* Right Section */}
        <div className="w-1/3 p-4">
          <h3 className="text-2xl font-semibold text-center font-lobster">Friendly Reminder</h3>
              <p className="mt-4">
                Remember to follow us on Instagram so you can see how you can use all the material!
              </p>
        <div className="mt-4 flex space-x-4">
          
          <Link href="https://www.instagram.com/night.owl.resources/" className="text-xl flex items-center">
            <FaInstagram className="mr-1" />
            <p className="text-xl">@night.owl.resources</p>
          </Link>

          </div>
        </div>
      </div>
    </div>
  </footer>
  
  
  );
};

export default Footer;
