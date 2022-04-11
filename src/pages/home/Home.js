import React, { useContext, useState } from 'react';
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ProductsContext } from '../../contexts/ProductContext';
import { BiError } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { formatNumber } from '../../utils/utility';
import './Home.css'
import { CartContext } from '../../contexts/CartContext'
import { FaSpinner } from "react-icons/fa"

const Home = ({ darkMode }) => {
    const { addProduct, cartItems, increase } = useContext(CartContext)
    const { products, filteredProducts, setFilteredProducts, loading } = useContext(ProductsContext)
    const [searchItem, setSearchItem] = useState('')
    const [error, setError] = useState('')
    const [scroll, setScroll] = useState(false)

    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id)
    }

    window.onscroll = (e) => {
        console.log(document.documentElement.scrollTop)
        if (document.documentElement.scrollTop > 100) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }

    const handleSearchForProduct = (event) => {
        var productsArray = products?.filter((product) => product.title.toLowerCase().includes(event.target.value.toLowerCase()))
        setSearchItem(event.target.value)
        setError(() => {
            if (productsArray?.length > 0) {
                return null
            } else {
                return "No products found!"
            }
        })
        setFilteredProducts(productsArray)
    }

    const handleFilterByCategory = (event) => {
        var productsArray = products?.filter((product) => product.category.toLowerCase().includes(event.target.value.toLowerCase()))
        document.querySelector("[name='filter_input']").value = ""
        setError(null)
        setFilteredProducts(productsArray)
    }

    const handleReset = () => {
        setSearchItem("")
        setError(null)
        setFilteredProducts(products)
    }

    const handleScroll = () => {
        document.getElementsByTagName('html')[0].scrollIntoView({ behavior: "smooth" })
    }

    return(
        <main className='home'>
        {scroll && <BsFillArrowUpCircleFill onClick={handleScroll} className={`scroll ${darkMode ? "darkmode-bg" : ""}`} />}
            <div className="filter">
                <div
                    className={`filter-input ${
                        darkMode ? "darkmode-input" : ""
                    }`}
                >
                    <AiOutlineSearch className="search" />
                    <input
                        onChange={handleSearchForProduct}
                        value={searchItem}
                        name="filter_input"
                        type="text"
                        placeholder="Search for a product..."
                    />
                    {searchItem && 
                        <AiOutlineCloseCircle
                            onClick={handleReset}
                            className={`close-input ${darkMode ? "darkmode-bg" : ""}`}
                        />
                    }
                </div>
                <div className="filter-select">
                    <select
                        name="filter_select"
                        className={darkMode ? "darkmode-light" : ""}
                        onChange={handleFilterByCategory}
                    >
                        <option value="">Filter by Category</option>
                        <option value="men's clothing">Men's clothing</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="electronics">Electronics</option>
                        <option value="women's clothing">Women's clothing</option>
                    </select>
                </div>
            </div>
            {error &&
                <div className={`error ${darkMode ? "darkmode-light" : ""}`}>
                    <p>
                        <BiError /> {error} <BiError />
                    </p>
                </div>
            }
            {loading &&
                <div className={`loading spinner ${darkMode ? "darkmode-light" : ""}`}>
                    <p><FaSpinner /></p>
                </div>
            }
            <div className='products'>
                {filteredProducts?.map((val, index) => (
                    <div key={index} className={`product-single ${darkMode ? "darkmode-light" : ""}`}>
                            <img className='product-img' src={val.image} alt={`${val.title}`} />
                        <div className="product-info">
                            <Link to={`/product/${val.id}`}>
                                <h5 className={`${darkMode ? "darkmode-text" : ""}`}>
                                    {val.title}
                                </h5>
                            </Link>
                            <div className='cart-button-div'>
                            <p>
                                <b>Price</b>: {" "} {formatNumber(val.price)}
                            </p>
                                {isInCart(val) && 
                                    <Link to={`/cart`}>
                                        <button onClick={() => increase(val)} className='cart-button'>ADD MORE</button>
                                    </Link>
                                }
                                {!isInCart(val) && 
                                    <Link to={`/cart`}>
                                        <button onClick={() => addProduct(val)} className='cart-button'>ADD TO CART</button>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </main>
        
    )
}

export default Home