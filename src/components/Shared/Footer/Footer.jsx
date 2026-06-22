import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock } from "lucide-react"; // Using Lucide for icons
import Reveal from "../../Animation/Reveal";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <Reveal>
        <div className=" py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto mb-8">
            Book a free consultation with our expert decorators and start your
            journey to a beautifully decorated space today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <button className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-semibold py-3 px-6 rounded shadow-lg transition duration-300 flex items-center justify-center">
              <Clock className="w-4 h-4 mr-2" /> Book Consultation
            </button>
            {/* Assuming the white button is for 'View Portfolio' or similar */}
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded shadow-lg transition duration-300">
              View Portfolio
            </button>
          </div>
          <div className="flex flex-wrap justify-center text-sm space-x-4 sm:space-x-8">
            <p className="flex items-center">
              <span className="text-yellow-600 text-xl mr-2">•</span> Free
              Consultation
            </p>
            <p className="flex items-center">
              <span className="text-yellow-600 text-xl mr-2">•</span> No Hidden
              Fees
            </p>
            <p className="flex items-center">
              <span className="text-yellow-600 text-xl mr-2">•</span> 100%
              Satisfaction Guarantee
            </p>
          </div>
        </div>
      </Reveal>

      {/* --- Main Footer Links and Info --- */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Col 1: Brand Info (Spans 2 columns on mobile/tablet) */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <div className="flex items-center">
              {/* This S would ideally be an image/SVG logo */}
              <span className="bg-yellow-600 text-white font-bold text-lg w-8 h-8 flex items-center justify-center rounded-md mr-2">
                S
              </span>
              <p className="text-white text-lg font-semibold">StyleDecor</p>
            </div>
            <p className="text-sm">
              Transform your spaces with elegance. We create stunning
              decorations for homes, weddings, and corporate events that leave
              lasting impressions.
            </p>

            {/* Contact Details */}
            <div className="space-y-2 pt-2">
              <div className="flex items-start text-sm">
                <MapPin className="w-4 h-4 mr-3 mt-1 text-yellow-600 flex-shrink-0" />
                <span>123 Design Street, Creative City, 12345</span>
              </div>
              <a
                href="tel:+15551234567"
                className="flex items-center text-sm hover:text-white"
              >
                <Phone className="w-4 h-4 mr-3 text-yellow-600 flex-shrink-0" />
                +1 (555) 123-4567
              </a>
              <a
                href="mailto:hello@styledeccor.com"
                className="flex items-center text-sm hover:text-white"
              >
                <Mail className="w-4 h-4 mr-3 text-yellow-600 flex-shrink-0" />
                hello@styledeccor.com
              </a>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-3 text-yellow-600 flex-shrink-0" />
                Mon - Sat: 8:00 AM - 7:00 PM
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Home Decoration
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Wedding Decoration
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Office Setup
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Event Decoration
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar: Copyright and Social Icons --- */}
      <div className="border-t border-gray-700 mt-4 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="mb-4 sm:mb-0">
            &copy; 2023 StyleDecor. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {/* Social Icons (using placeholders for simplicity) */}
            <a href="#" className="hover:text-white">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.903 3.535 9 8.243 9.876V14.61h-2.11v-2.146h2.11V10.87c0-2.094 1.258-3.235 3.14-3.235 0.897 0 1.666 0.065 1.895 0.093v2.181h-1.298c-1.02 0-1.222 0.485-1.222 1.198v1.543h2.416l-0.313 2.146h-2.103V21.876C18.465 21 22 16.903 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 5.176 3.78 9.47 8.745 10.375v-7.387h-2.77V12h2.77V9.754c0-2.73 1.66-4.226 4.102-4.226 1.168 0 2.17.086 2.457.125v2.85h-1.74c-1.37 0-1.636.65-1.636 1.606V12h3.29l-.53 3.388h-2.76v7.387C18.22 21.47 22 17.176 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M21 2.5c0-.4-.4-.8-.8-.8H3.8c-.4 0-.8.4-.8.8v18.7c0 .4.4.8.8.8h16.4c.4 0 .8-.4.8-.8V2.5zm-3.3 5.4H6.3v1.8h11.4V7.9zm0 2.7H6.3v1.8h11.4v-1.8zm0 2.7H6.3v1.8h11.4v-1.8z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-5 13h2v-4h3V9h-3V5h-2v4h-3v3h3v4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
