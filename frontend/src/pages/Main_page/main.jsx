import React, { useEffect, useState } from "react";
import axios from 'axios'
import ProductCard from "../../components/Product_component/ProductCard";
import { Outlet, Link, useNavigate } from "react-router-dom";

const MainPage = () => {

  //const addToCart = (product) => {
  //  const existingItem = cart.find(item => item.id === product.id)
//
  //  if (existingItem) {
  //    updateQuantity(existingItem.id, existingItem.quantity + product.quantity)
  //  } else {
  //    setCart([...cart, product])
  //  }
  //}

   //const updateQuantity = (productId, newQuantity) => {
  //  if (newQuantity <= 0) {
  //    removeFromCart(productId)
  //  } else {
  //    const updatedCart = cart.map(item => {
  //      if (item.id === productId) {
  //        return { ...item, quantity: newQuantity }
  //      }
  //      return item
  //    })
  //    setCart(updatedCart)
  //  }
  //}

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_BACKEND}/bizuteria/product`)
      .then((result) => {
        console.log(result.data)
        setProducts(result.data.results)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className='main-container w-screen'>
      <div className="grid gap-4 w-screen flex flex-col items-center justify-center">
        <div className=' md '>
          <div className='flex container gap-4 w-screen justify-around justify-self-center'>
            <div className='sm gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-screen mx-28'>
              {products.map((products) => {
                return (
                  <Link key={products.id} to={`/bizuteria/product/${products.id}`}>
                    <ProductCard {...products} />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage