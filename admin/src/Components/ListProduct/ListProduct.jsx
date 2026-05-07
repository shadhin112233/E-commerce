import React, { useEffect } from 'react'
import './ListProduct.css'
import { data } from 'react-router-dom';
import cross_icon from '../../assets/cross_icon.png'
import { useState } from 'react';

const ListProduct = () => {

  const [allproducts, setAllproducts] = useState([]);

  const fetchinfo = async()=>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllproducts(data)});

    
  }

  useEffect(()=>{
    fetchinfo();
  },[])


  const remove_product = async(id)=>{
    await fetch('http://localhost:4000/removeproduct',{

      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})


    })
    await fetchinfo()
  }



  return (
    <div className='list-products'>
      <h1>All Product List</h1>
     <div className="listproduct-format-main">
      <p>Products</p>
      <p>Title</p>
      <p>Old Price</p>
      <p>New Price</p>
      <p>Category</p>
      <p>Remove</p>
     </div>
     <div className="listproduct-allproducts">
     <hr/>
     {allproducts.map((product, index) => {
    
  return <>
    <div key={index} className="listproduct-format-main listproduct-format">

      <img src={product.image} alt="" className="listproduct-producticon" />
      <p>{product.name}</p>
      <p>${product.old_price}</p>
      <p>${product.new_price}</p>
      <p>{product.category}</p>
      <img onClick={()=>{ remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />

    </div>
    <hr />
    </>
  
})}

     </div>
    </div>
  )
}

export default ListProduct
