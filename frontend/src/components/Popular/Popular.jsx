import React from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { useState, useEffect } from 'react'

const Popular = () => {
  // ম্যাপ করার সুবিধার্থে ডিফল্ট ভ্যালু অবজেক্ট থেকে অ্যারে ([]) করা হলো
  const [popularProduct, setPopularProduct] = useState([]);
  const backend_url = "https://e-commerce-backendd-zm8m.onrender.com";

  useEffect(() => {
    // লোকালহোস্ট বদলে লাইভ URL দেওয়া হলো
    fetch(`${backend_url}/popularinwomen`)
      .then((response) => response.json())
      .then((data) => setPopularProduct(data))
  }, [])
  
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className="popular-item">
            {/* ডেটাবেজের ছবি ফিক্স করে লাইভ popularProduct স্টেটটি ম্যাপ করা হলো */}
            {popularProduct.map((item, i) => {
                const fixedImage = item.image.replace('http://localhost:4000', backend_url);
                
                return <Item 
                  key={i} 
                  id={item.id} 
                  name={item.name} 
                  image={fixedImage} 
                  new_price={item.new_price} 
                  old_price={item.old_price}
                />
            })}
        </div>
    </div>
  )
}

export default Popular