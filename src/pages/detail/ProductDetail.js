import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import "./ProductDetail.css";
import { CartContext } from "../../contexts/CartContext";
import { FaSpinner } from "react-icons/fa"
const url = "https://fakestoreapi.com/products";

const ProductDetail = ({ darkMode }) => {
const { addProduct, cartItems, increase } = useContext(CartContext)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const isInCart = product => {
    return !!cartItems.find(item => item.id === product.id);
}

  useEffect(
    () => {
      try {
        (async () => {
          setLoading(true);
          setProduct(null);
          const { data } = await axios.get(`${url}/${params.productId}`);
          setProduct(data);
          setLoading(false);
          console.log(`this is product with ${params.productId}`, product);
        })();
      } catch (error) {
        console.log(error);
      }
    },
    [params.productId]
  );

  return (
      <main className="product-page">
          <Link
                className={`back-btn ${
                    darkMode ? "darkmode-text darkmode-light" : ""
                }`}
                to="/"
            >
                <BsArrowLeft /> Back
            </Link>
            {loading &&
                <div className={`loading spinner ${darkMode ? "darkmode-light" : ""}`}>
                    <p><FaSpinner /></p>
                </div>
            }
            {product && 
            <div className="product-page-display">
                {product?.image && (
                    <img className="product-image" src={product?.image} alt={product?.title} />
                )}
                <div className="product-page-info">
                    <h1>{product?.title}</h1>
                    <div className="info-flex">
                        <div className="info-right">
                            <p>
                                <span>Price:</span> {[product?.price]}
                            </p>
                            <p>
                                <span>Description:</span> {product?.description}
                            </p>
                            <div className='cart-button-div'>
                                {isInCart(product) && 
                                    <Link to={`/cart`}>
                                        <button onClick={() => increase(product)} className='cart-button prod-button'>ADD MORE</button>
                                    </Link>
                                }
                                {!isInCart(product) && 
                                    <Link to={`/cart`}>
                                        <button onClick={() => addProduct(product)} className='cart-button prod-button'>ADD TO CART</button>
                                    </Link>
                                }
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            }
      </main>
  )
};

export default ProductDetail;
