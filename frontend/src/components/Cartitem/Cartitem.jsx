import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../Asset/cart_cross_icon.png'

const Cartitem = () => {

  const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext)

  return (
    <div className="cartitems">

      <div className="cartitem-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitem-format-main cartitem-format">

                <img
                  src={e.image}
                  alt=""
                  className="carticon-product-icon"
                />

                <p>{e.name}</p>

                <p>${e.new_price}</p>

                <button className="cartitem-quantity">
                  {cartItems[e.id]}
                </button>

                <p>${e.new_price * cartItems[e.id]}</p>

                <img
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt=""
                  className="cartitems-remove-icon"
                />

              </div>

              <hr />
            </div>
          )
        }

        return null
      })}

      <div className="cartitem-dowens">
        <div className="cartitem-total">
            <h1>Cart Total</h1>
        </div>
        <div>
            <div className="cartitems-total-item">
                <p>SubTotal</p>
                <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
                <p>Shipping Fee</p>
                <p>Free</p>

            </div>
            <hr />
            <div className='cartitems-total-item'>
                <h3>Total</h3>
                <h3>{getTotalCartAmount()}</h3>

            </div>


        </div>
        <button>PROCCED TO CHECKOUT</button>


      </div>
      <div className="cartitem-promocode">
        <p>If you have a promocode,Enter it Here</p>
        <div className="cartitem-promobox">
            <input type="text" placeholder='promo code'/>
            <button>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Cartitem