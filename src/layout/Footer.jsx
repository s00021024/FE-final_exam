import React from 'react'
import { FaComputer } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="flex gap-2 items-center text-sm text-gray-400">
          made with <FaComputer size={20} /> by s00021024
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;