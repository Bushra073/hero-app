import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold">Hero Store</h3>
          <p className="text-gray-400 text-sm mt-2">Designed and built with passion for productivity.</p>
        </div>
        
       
        <div className="flex justify-center space-x-6 text-sm mb-4">
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="https://github.com/Bushra073" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors">GitHub</a>
        </div>
        
        <div className="border-t border-gray-800 pt-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Hero Store Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;