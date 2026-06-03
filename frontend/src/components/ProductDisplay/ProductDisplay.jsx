import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Asset/star_icon.png'
import star_dull_icon from '../Asset/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'

const ProductDisplay = (props) => {
    const { product } = props;
    const {addTocart} = useContext(ShopContext)
    return (
        <div className='productdisplay'>

            <div className="productdisplay-left">

                <div className="productdisplay-image-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="product-display-image">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>

            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>

                <div className="productdisplay-right-description">
                    A lightweight,usually knitted,pullover shirt,close fitting,and with around knickle short sleevs worm as a undershirt and outer garment.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addTocart(product.id)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category:</span>women, T-shirt, crop top</p>
                <p className='productdisplay-right-category'><span>Tags:</span>Modern, Latest</p>



            </div>

        </div>
    )
}

export default ProductDisplay
