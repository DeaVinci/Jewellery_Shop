import React, {useEffect, useState} from "react";
import axios from 'axios'
import ProductCard from "../../components/Product_component/ProductCard";

const MainPage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_BACKEND}/bizuteria/product`)
          .then((result) => {
            console.log(result.data)
            setProducts(result.data.results)
          })
          .catch((error) => console.log(error))
      }, [])
    
    return(
        <div className='main-container w-screen'>
        {/* <div className='left-section'>
        </div> */}
        <div className="grid gap-4 mt-40 w-screen flex flex-col items-center justify-center">
          <div className=' md '>
            <div className='flex items-center justify-center p-5'>
                <p className='info-p mx-10 font-bold'>Popularne produkty</p>
            </div>
            <div className='flex container gap-4 w-screen justify-around '>
                <div className='sm gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-screen mx-28'>
                  {products.map((products) => {
                    return (
                      <ProductCard key={products.id} {...products} />
                    )
                  })}
                </div>
            </div>
          </div>

          <div className='items-center justify-center md '>
          <div className='flex items-center justify-center p-5'>
                <p className='info-p mx-10 font-bold'>Popularne produkty</p>
            </div>
            <div className='flex container gap-4 w-screen justify-around justify-self-center'>
            <div className='sm gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-screen mx-28'>
                  {products.map((products) => {
                    return (
                      <ProductCard key={products.id} {...products} />
                    )
                  })}
                </div>
            </div>
          </div>
          </div>
        {/* <div className='right-section'>
        </div> */}
      </div>
    )
}

export default MainPage