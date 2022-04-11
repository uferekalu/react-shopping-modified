import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/utility";
import CartProducts from "./CartProducts";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { BsArrowLeft } from "react-icons/bs";

const PUBLIC_KEY = "pk_test_51GyLKTD8bKf8QQtz5VPgmCbpvqrXJgAUMNIXkz41l8iqnYymMCPo9ePEDhMiFRcMXpoQzXIjw7F8WKjq7XhYVwtY00skOdOq55"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

const Cart = ({ darkMode }) => {
  const { total, cartItems, clearCart, checkout, handleCheckout } = useContext(
    CartContext
  );

  const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
      }
    ]
  };

  return (
    <main className="cart">
      <div className="cart-items">
        {cartItems.length > 0
          ? 
          <>
          <CartProducts />
          <div className="cart-total-row">
          <div className="cart-total">
            <p>
              <span>TOTAL:</span> {formatNumber(total)}
            </p>
          </div>
          <div className="cart-checkout-button">
            <p>
              <button type="button" className="btn-cart" onClick={clearCart}>
                CLEAR
              </button>
              <button
                type="button"
                className="btn-cart"
                onClick={handleCheckout}
              >
                CHECKOUT
              </button>
            </p>
          </div>
        </div>
          </>
          :
          checkout ?
          <div className="cart-checkout">
            <div className="checkout-stripe">
              <Elements stripe={stripeTestPromise} options={ELEMENTS_OPTIONS}>
                <CheckoutForm totalCost={total} />
              </Elements>
            </div>
          </div> :
          <div className="cart-empty">
              <h4>Your cart is empty</h4>
              <Link
                className={`back-btn back-cart ${darkMode
                  ? "darkmode-text darkmode-light"
                  : ""}`}
                to="/"
              >
                <BsArrowLeft /> Back
              </Link>
            </div>}
            </div>
    </main>
  );
};

export default Cart;
