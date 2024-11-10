import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../../contexts/CartContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import { API_BASE_URL } from "../../config";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  const [quantity, setQuantity] = useState(Array(cart.length).fill(1));
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Load cart from local storage when the component mounts
  useEffect(() => {
    const loadedCart = localStorage.getItem("cart");
    if (loadedCart) {
      setCart(JSON.parse(loadedCart));
    }
  }, []);

  // Set default quantities when the cart is updated
  useEffect(() => {
    setQuantity(Array(cart.length).fill(1));
    calculateTotalPrice()
  }, [cart]);

  // Function to increase the quantity of an item
  const increaseQuantity = (index) => {
    const newQuantity = [...quantity];
    newQuantity[index]++;
    setQuantity(newQuantity);
    calculateTotalPrice()
  };

  // Function to decrease the quantity of an item
  const decreaseQuantity = (index) => {
    if (quantity[index] > 1) {
      const newQuantity = [...quantity];
      newQuantity[index]--;
      setQuantity(newQuantity);
      calculateTotalPrice
    }
  };

  // Function to calculate total price only when the user clicks "Update"
  const calculateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * quantity[i];
    }
    setTotalPrice(total);
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart, quantity, totalPrice } });
  };

  return (
    <div className="flex flex-col sm:flex-row w-full">
      {/* Cart items */}
      <div className="w-full sm:w-2/3 sm:pr-10 mb-4 sm:mb-0">
        <div className="table-header flex justify-between mb-4">
          <div className="w-2/5 text-lg text-blue-900">Products</div>
          <div className="w-1/5 text-center text-lg text-blue-900">Price</div>
          <div className="w-1/5 text-center text-lg text-blue-900">
            Quantity
          </div>
          <div className="w-1/5 text-center text-lg text-blue-900">Total</div>
        </div>
        <hr style={{ backgroundColor: "gray" }} />
        {cart.map((product, index) => (
          <div
            key={index}
            className={`flex justify-between py-4 ${index < cart.length - 1 ? "border-b border-gray-300" : ""
              }`}
          >
            <div className="flex items-center w-2/5">
              <object data="https://placehold.co/300" className={`className="w-20 h-20 mr-2 border border-gray-200"`}>
                <img src={`${API_BASE_URL.replace("/api", "")}/${product.imagePath}` || "default-image.jpg"}
                  alt={product.name}
                  className="m-auto" />
              </object>
              <p className="font-semibold ml-5">{product.name}</p>
            </div>
            <div className="w-1/5 flex items-center justify-center">
              <p className="text-center">${product.price}</p>
            </div>
            <div className="w-1/5 flex justify-around items-center">
              <button
                className="border green-border text-green px-1 py-1 rounded-sm"
                onClick={() => decreaseQuantity(index)}
              >
                <FaMinus size={12} />
              </button>
              <p>{quantity[index]}</p>
              <button
                className="border green-border text-green px-1 py-1 rounded-sm"
                onClick={() => increaseQuantity(index)}
              >
                <FaPlus size={12} />
              </button>
            </div>
            <div className="w-1/5 flex items-center justify-center">
              <p className="text-center">
                ${product.price * quantity[index]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total section */}
      <div className="w-full sm:w-1/4">
        <div className="bg-gray-100 p-10">
          <div className="flex justify-between py-5 border-b border-gray-400 pb-2 mb-2">
            <p>SUBTOTAL</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <p className="my-10 font-semibold w-full">
            Shipping & Taxes Calculated at checkout
          </p>
          <div className="mt-4">
            <button
              className="bg-green text-white py-4 px-4 w-full rounded-sm"
              onClick={calculateTotalPrice}
            >
              Update
            </button>
            <button
              className="bg-black text-white py-4 mt-5 px-4 w-full rounded-sm"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
