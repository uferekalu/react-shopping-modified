import React, { useContext } from "react";
import './Cart.css';
import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../utils/utility";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai"


const CartItem = ({ product }) => {
  const { increase, decrease, removeProduct } = useContext(CartContext);

  return (
    <div className="product-cart-items">
      <div className="product-cart-items-div">
        <Link to={`/product/${product.id}`}>
          <img
            className="product-cart-image"
            src={product.image}
            alt={`${product.title}`}
          />
        </Link>
      </div>
      <div className="product-cart-title">
        <p>
            {product.title}
        </p>
        <p>
            {formatNumber(product.price)}
        </p>
        {product.quantity > 1 &&
          <button onClick={() => decrease(product)} className="cart-button-checkout">
            -
          </button>}
        <span className="cart-items-quantity">
          {product.quantity}
        </span>
        <button onClick={() => increase(product)} className="cart-button-checkout">
          +
        </button>
        {product.quantity === 1 &&
          <button onClick={() => removeProduct(product)} className="thrash">
            <AiFillDelete />
          </button>}
      </div>
    </div>
  );
};

export default CartItem;
