import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BsTelephone, BsTelephoneFill } from "react-icons/bs";
import { FaTruck, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../data/LOGO.png";
import { FaPerson } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthProvider";
import { API_BASE_URL } from "../../config";
import { CartContext } from "../../contexts/CartContext";
import { useSelector } from "react-redux";

const navLinks = {
  home: { name: "HOME", link: "/" },
  products: { name: "PRODUCTS", link: "/products" },
  shop: { name: "SHOP", link: "/products" },
  pages: { name: "PAGES", link: "/" },
  blogs: { name: "BLOG", link: "/" },
  contact: { name: "CONTACT", link: "/" },
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { auth, logout, isLoggedIn } = useAuth();
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useContext(CartContext)
  const navigate = useNavigate();
  const searchRef = useRef();
  const counter = useSelector(store=>store.counter.counter)
  console.log(counter,"counttt")
  useEffect(() => {
    const loadedCart = localStorage.getItem("cart");
    if (loadedCart) {
      setCart(JSON.parse(loadedCart));
    }
  }, []);

  async function getCategories() {
    try {
      const getAllCategories = await fetch(
        `${API_BASE_URL}/Category/All?pageNumber=${1}&pageSize=${10}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const categories = await getAllCategories.json();
      setCategories(categories.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setIsScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const MobileMenu = () => (
    <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-full left-0 w-full flex flex-col-reverse bg-white shadow-lg z-50`}>
      {/* Mobile utility links */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2 mb-3">
          <BsTelephone className="text-custom-red" />
          <span>(+800) 123 456 329</span>
        </div>
        <div className="links-nav-top">
          
        </div>
        <Link to="/profile" className="flex items-center space-x-2 mb-3">
          <FaTruck />
          <span>Track Your Order</span>
        </Link>
        {isLoggedIn ? (
          <button onClick={logout} className="flex items-center space-x-2 mb-3">
            <FaUser />
            <span>Logout</span>
          </button>
        ) : (
          <Link to="/auth/signup" className="flex items-center space-x-2 mb-3">
            <FaUser />
            <span>Sign In or Register</span>
          </Link>
        )}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <FaUser />
          <span>Account</span>
        </Link>
      </div>
      
      {/* Mobile navigation links */}
      <div className="p-4">
        {Object.values(navLinks).map((link, index) => (
          <Link
            key={index}
            to={link.link}
            className="block py-2 hover:text-blue-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="/cart"
          className="flex items-center space-x-2 py-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <AiOutlineShoppingCart size={20} />
          <span>Cart ({cart?.length || 0})</span>
          <span className="ml-2">${0.00}</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div
      className={`static md:fixed sm:top-0 sm:left-0 w-full sm:z-50 flex flex-col items-center ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      {/* Top Section: Logo, Search Bar, Mobile Menu Button */}
      <div className="w-full flex justify-between items-center py-4 bg-white nav-top">
  {/* Mobile Menu Button */}
  <button 
    className="md:hidden text-gray-600 p-2"
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  >
    <GiHamburgerMenu size={24} />
  </button>

  {/* Logo & Search - Modified for mobile responsiveness */}
  <div className="flex flex-1 items-center gap-2 justify-end space-x-2 md:space-x-4 nav-top-main">
    <Link to="/"> 
    <img src={logo} alt="DoctorPet Logo" className="h-8 md:h-10 drpet-logo" />
    </Link>
    <div className="flex items-center bg-white rounded-md w-[70%] nav-input-container">
      <input
        type="text"
        placeholder="Search our store"
        className="px-2 md:px-4 py-2 md:py-4 w-full border-t-2 border-l-2 border-b-2 border-gray-300 outline-none rounded-l-md"
        ref={searchRef}
      />
      <button 
        className="bg-custom-green text-white px-2 md:px-4 py-2 md:py-4 border border-custom-green rounded-r-md"
        onClick={() => navigate(`/products?categoryID=${1}&searchString=${searchRef.current.value}`)}
      >
        <AiOutlineSearch size={20} />
      </button>
    </div>
  </div>

        {/* Desktop Utility Links - Hidden on Mobile */}
        <div className="hidden md:flex items-end w-[30%] justify-center space-x-6 ml-12  flex-col gap-4">
          <div className="flex items-center justify-center space-x-2 border-b-2 border-gray-200 w-[70%]">
            <div className="nav-contact-row justify-center gap-2 pb-3 flex w-[100%]">
            <span className="text-xs lg:text-sm">CALL US NOW: </span>
            <div className="bg-custom-red rounded-md p-1">
              <BsTelephoneFill className="text-white" />
            </div>
            <span className="text-xs lg:text-sm font-semibold">(+800) 123 456 329</span>
          </div>
          </div>
          
          <div className="nav-links-top flex items-start content-start w-[82%] justify-between">
          <div className="track-order flex gap-1">
          <FaTruck />
          <Link to="/profile">Track Your Order</Link>
          </div>
          <span> | </span>
          <div className="nav-auth flex gap-2">
          <FaUser />
          {isLoggedIn ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/auth/signup"> Sign In or Register</Link>
          )}
          </div>
          {/* <span> | </span>
          <div className="nav-account flex gap-2">
          <Link to="/dashboard" className="flex items-center space-x-1">
            <FaUser />
            <span> Account</span>
          </Link>
          </div> */}
          </div>
         
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <MobileMenu />

      {/* Desktop Navigation - Hidden on Mobile */}
      <div className="hidden md:flex w-[70%] text-gray-600 border border-gray-100 items-center justify-start mt-5 nav-bottom">
        {/* All Categories Button */}
        <div className="dropdown">
          <div className="flex items-center space-x-2 cursor-pointer text-white bg-custom-dark-blue py-5 pl-5 w-[220px]">
            <GiHamburgerMenu size={24} />
            <span>All Categories</span>
          </div>
          <div className="dropdown-content text-lg">
            {categories.map(category => (
              <Link 
                key={category.id}
                className="px-2 py-1" 
                to={`/products?categoryID=${category.id}`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="ml-10 flex items-center w-[74%] justify-between space-x-6">
          <div className="main-nav flex">
            
          {Object.values(navLinks).map((link, index) => (
            <Link
              key={index}
              to={link.link}
              className="text-footer-primary font-semibold"
            >
              {link.name}
            </Link>
          ))}
          
        </div>
          <div className="cart-btn">
          <Link
            to="/cart"
            className="flex items-center space-x-4 border-l border-gray-100 pl-5"
          >
            <div className="flex items-center space-x-2">
              <AiOutlineShoppingCart size={24} />
              <div className="bg-custom-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart?.length || 0}
              </div>
            </div>
            <div className="flex flex-col">
              <span>Cart</span>
              <span>${0.00}</span>
            </div>
          </Link>
          </div>
          </div>
         
      </div>
    </div>
  );
};

export default Navbar;