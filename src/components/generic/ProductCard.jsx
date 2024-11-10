import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomButton from "./CustomButton";
import { AiFillHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { CartContext } from "../../contexts/CartContext";
import "../../App.css";
import { API_BASE_URL } from "../../config";
import { refresh } from "../../store/counterSlice";
import { useDispatch } from "react-redux";

const ProductCard = ({
  content,
  cardsPerRow,
  spacing,
  showCartButton,
  useRowStyle,
}) => {
  const [isLiked, setIsLiked] = useState(Array(content.length).fill(false));
  // console.log("content ", content);
  const [cart, setCart] = useContext(CartContext);
  const dispatch = useDispatch()

  const handleLikeClick = (index) => {
    const newIsLiked = [...isLiked];
    newIsLiked[index] = !newIsLiked[index];
    setIsLiked(newIsLiked);
  };

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      toast.warning("You already have this product in your cart");
    } else {
      const newCart = [...cart, product];
      setCart(newCart);
      dispatch(refresh())
      toast.success("Product added to cart successfully!");
    }
  };

  const widthClasses = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
  };

  return (
    <div className="flex flex-wrap h-fit new-arrivals-row pt-1 border border-[#ECECEC] gap-2">
      {content.map((product, index) => (
        <Link
          to={`/product/${
            product.name ? product.name.trim().replace(/\s+/g, "-") : "unknown"
          }/${product.id}`}
          key={index}
          className={`flex product-card flex-${
            useRowStyle ? "row" : "col"
          }`}
        >
          <div
            className={`relative w-full h-auto md:h-${
              useRowStyle ? "48" : "64"
            }`}
          >
            <object data="https://placehold.co/300"  className={`w-full h-auto md:h-${useRowStyle ? "48" : "64"}`}>
              <img src={`${API_BASE_URL.replace("/api","")}/${product.imagePath}` || "default-image.jpg"}
                alt={product.name}
                className="m-auto" />
            </object>
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              {product.discountPercentage > 0 && (
                <div className="bg-custom-green text-white text-xs px-2 py-1 rounded-md">
                  {`${product.discountPercentage}% OFF`}
                </div>
              )}
            </div>
          </div>
          <div className={`mt-2 w-full flex flex-col justify-around`}>
            <div className="w-full">
              <div className="flex flex-row items-center justify-between">
                <span className="text-custom-dark-blue text-[15px] font-medium font-sans">
                  {product.name}
                </span>
              </div>
              <div className="flex w-full">
                <span className="text-gray-400 line-through font-bold text-left mt-3">
                  {`${product.currencySymbol}${product.price}`}
                </span>
                <span className="text-red-400 font-bold text-left mt-3 px-2">
                  {`${product.currencySymbol}${(
                    product.price *
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}`}
                </span>
              </div>
            </div>
            {showCartButton && (
              <CustomButton
                customClass="text-gray-600 gray-border w-fit border-2 mt-2 rounded-full text-gray-400
                             hover:bg-custom-blue hover:text-white"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </CustomButton>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
