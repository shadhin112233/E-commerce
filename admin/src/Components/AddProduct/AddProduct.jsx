import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

  const [image, setImage] = useState(null)

  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "women",
    new_price: "",
    old_price: ""
  })

 
  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }

 
  const changehandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value
    })
  }

 
  const Add_product = async () => {

    if (!image) {
      alert("Please select an image ❌")
      return
    }

    try {

      
      let formData = new FormData()
      formData.append('image', image)

      const uploadRes = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData
      })

      const uploadData = await uploadRes.json()
      console.log("UPLOAD:", uploadData)

      if (!uploadData.success) {
        alert("Image upload failed ❌")
        return
      }

      
      const product = {
  ...productDetails,
  image: uploadData.image_url,
  new_price: Number(productDetails.new_price),
  old_price: Number(productDetails.old_price)
}
      console.log("FINAL PRODUCT:", product)

      const productRes = await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      })

      const productData = await productRes.json()
      console.log("PRODUCT RESPONSE:", productData)

      if (productData.success) {
        alert("Product Added Successfully ✅")

      
        setProductDetails({
          name: "",
          category: "women",
          new_price: "",
          old_price: ""
        })
        setImage(null)

      } else {
        alert("Product add failed ❌")
      }

    } catch (error) {
      console.error(error)
      alert("Server error ❌")
    }
  }

  return (
    <div className='add-product'>

      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changehandler}
          type="text"
          name='name'
          placeholder='Type Here'
        />
      </div>

      <div className="addproduct-price">

        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changehandler}
            type="text"
            name='old_price'
            placeholder='Type Here'
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changehandler}
            type="text"
            name='new_price'
            placeholder='Type Here'
          />
        </div>

      </div>

      <div className="addproduct-itemfield">
        <p>Category</p>
        <select
          value={productDetails.category}
          onChange={changehandler}
          name="category"
          className='add-product-selector'
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className='addproduct-thumnail-image'
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name='image'
          id='file-input'
          hidden
        />
      </div>

      <button onClick={Add_product} className='addproduct-btn'>
        Add Product
      </button>

    </div>
  )
}

export default AddProduct