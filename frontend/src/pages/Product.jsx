import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import BreadCrums from '../components/BreadCrums/BreadCrums'
import ProductDisplay from '../components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../components/DescriptionBox/DescriptionBox'
import RealatedProduct from '../components/RealatedProduct/RealatedProduct'

const Product = () => {

  const { all_product } = useContext(ShopContext)
  const { productId } = useParams()

  const product = all_product.find(
    (e) => e.id === Number(productId)

  )

  console.log(all_product)
console.log(productId)
console.log(product)

  if (!product) {
    return <h1>Loading / Product Not Found</h1>
  }

  return (
    <div>
      <BreadCrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox/>
      <RealatedProduct/>
    </div>
  )
}

export default Product