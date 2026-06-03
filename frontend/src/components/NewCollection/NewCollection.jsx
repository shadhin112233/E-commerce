import React from 'react'
import './NewCollection.css'
import { useState, useEffect } from 'react'
import Item from '../Item/Item'

const NewCollection = () => {
  const [new_collection, setNew_collection] = useState([]);
  const backend_url = "https://e-commerce-backendd-zm8m.onrender.com";

  useEffect(() => {
    // লোকালহোস্ট বদলে লাইভ URL দেওয়া হলো
    fetch(`${backend_url}/newcollection`)
      .then((response) => response.json())
      .then((data) => setNew_collection(data))
  }, [])

  return (
    <div className='newcollections'>
        <h1>NEW COLLECTIONS</h1>
        <hr/>
        <div className="collections">
            {new_collection.map((item, i) => {
                // ডাটাবেজের ছবিতে localhost:4000 থাকলে তা লাইভ URL দিয়ে পরিবর্তন করার ট্রিক
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

export default NewCollection