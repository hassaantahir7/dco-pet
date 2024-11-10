import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGooglePlusG,
} from "react-icons/fa";
import paymentIcon from "../../data/images/payment-icons.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-[#1A1F2B] text-[#A7A7A7] pt-12 w-full flex flex-col justify-center items-center footer">
      <div className="flex w-[70%] pb-12 border-b border-[#666666] gap-8 footer-main">
        {/* Contact Section */}
        <div className="w-[30%] contact-section">
          <h3 className="text-white font-bold mb-4">Contact</h3>
          <p className="text-[#A7A7A7] mb-6">
            We are a team of designers and developers that create high quality
            Wordpress, Magento, Prestashop, Opencart.drd
          </p>
          <p className="text-white">Contactdtyh</p>
          <p className="text-white">169-C, Technohub, Dubai Silicon Oasis.</p>
          <div className="flex space-x-4 mt-4 text-white">
            <FaFacebook className="w-6 h-6" />
            <FaTwitter className="w-6 h-6" />
            <FaInstagram className="w-6 h-6" />
            <FaGooglePlusG className="w-6 h-6" />
            <FaLinkedin className="w-6 h-6" />
          </div>
        </div>

        {/* Information Section */}
        <div className="w-[17%] ml-4 info-section links-footer">
          <h4 className="text-white font-bold mb-4">Information</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                News
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Care Section */}
        <div className="w-[17%] info-section">
          <h4 className="text-white font-bold mb-4">Customer Care</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/auth/login" className="hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link to="/auth/signup" className="hover:text-white">
                Register
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white">
                My Account
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Wishlist
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="w-[35%] news-letter">
          <h4 className="text-white font-bold mb-4">
            Subscribe to Our Newsletter
          </h4>
          <p className="mb-4">
            Subscribe to the DoctorPet mailing list to receive updates on new
            arrivals, special offers, and other discount information.
          </p>
          <form className="flex items-center border border-gray-500 rounded">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="p-4 w-full bg-transparent text-white outline-none"
            />
            <button
              type="submit"
              className="p-4 bg-gray-600 hover:bg-gray-700 text-white rounded-r"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M2.015 12l17.971-12v24z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-12 text-center footer-links-main">
        <ul className="flex justify-center space-x-4 mb-4 footer-links">
          <li className="">
            <a href="#" className="hover:text-white">
              About Us
            </a>
          </li>
          <span> | </span>
          <li className="">
            <a href="#" className="hover:text-white">
              Contact
            </a>
          </li>
          <span> | </span>
          <li className="">
            <a href="/profile" className="hover:text-white">
              Service
            </a>
          </li>
          <span> | </span>
          <li className="">
            <a href="#" className="hover:text-white">
              Shipping Policy
            </a>
          </li>
          <span> | </span>
          <li className="">
            <a href="#" className="hover:text-white">
              News
            </a>
          </li>
          <span> | </span>
          <li className="">
            <a href="#" className="hover:text-white">
              FAQ
            </a>
          </li>
        </ul>
        <div className="flex justify-center mt-4">
          <img src={paymentIcon} alt="Skrill" className="w-72" />
        </div>
       
      </div>
      <p className="w-full text-center text-[#A7A7A7] mt-10 py-8 bg-[#10151F]">
          Copyright © <span className="text-[#56A700]">DoctorPet</span>. All
          Rights Reserved.
        </p>
    </div>
  );
};

export default Footer;
