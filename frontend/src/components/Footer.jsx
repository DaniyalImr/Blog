import React from 'react';

function Footer() {
  return (
    <div className="bg-gray-100 py-10 mt-12">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Products Column */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-lg font-bold mb-2">Products</h2>
          <ul className="text-gray-600">
            <li>Flutter</li>
            <li>React</li>
            <li>Android</li>
            <li>iOS</li>
          </ul>
        </div>

        {/* Design to Code Column */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-lg font-bold mb-2">Design to code</h2>
          <ul className="text-gray-600">
            <li>Figma plugin</li>
            <li>Templates</li>
          </ul>
        </div>

        {/* Comparison Column */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-lg font-bold mb-2">Comparison</h2>
          <ul className="text-gray-600">
            <li>DhiWise vs Anima</li>
            <li>DhiWise vs Appsmith</li>
            <li>DhiWise vs FlutterFlow</li>
            <li>DhiWise vs Monday Hero</li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-lg font-bold mb-2">Company</h2>
          <ul className="text-gray-600">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Career</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>

      {/* Social Icons and Copyright */}
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center border-t mt-8 pt-4 text-gray-600">
        <p>© 2024 DhiWise Pvt. Ltd. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-gray-800">
            <i className="fab fa-github"></i>
          </a>
          <a href="#" className="hover:text-gray-800">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-gray-800">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="hover:text-gray-800">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
