import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import CartItem from "./CartItem";
import './Cart.css'

const CartProducts = ({ darkMode }) => {
  const { cartItems, itemCount } = useContext(CartContext);
  return (
      <>
    <div className="cart-products">
      <Link
        className={`back-btn back-cart ${darkMode ? "darkmode-text darkmode-light" : ""}`}
        to="/"
      >
        <BsArrowLeft /> Back
      </Link>
      <div className="cart-heading-row">
          <span className="cart-mybag">My Bag</span>
          <span className="cart-total-items"><b>Total:</b> {itemCount} items</span> 
      </div>
    </div>
    {cartItems.map(product =>
        <CartItem key={product.id} product={product} />
      )}
      </>
  );
};

export default CartProducts;
