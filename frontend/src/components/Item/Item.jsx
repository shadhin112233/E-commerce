import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  const backend_url = "https://e-commerce-backendd-zm8m.onrender.com";

  // ডাটাবেজের ছবিতে localhost:4000 থাকলে তা লাইভ URL দিয়ে পরিবর্তন করার লজিক
  const fixedImage = props.image ? props.image.replace('http://localhost:4000', backend_url) : '';

  return (
    <div className='item'>
       <Link to={`/product/${props.id}`}>
          {/* onClick হ্যান্ডলারটি ফিক্স করা হয়েছে */}
          <img onClick={() => window.scrollTo(0,0)} src={fixedImage} alt={props.name} />
       </Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                ${props.new_price}
            </div>
            <div className="item-price-old">
                 ${props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item