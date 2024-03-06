import React, {useEffect, useState} from "react";
import axios from 'axios'
import Product_card from "../../components/Product_component/Product_card";

const Main_page = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_BACKEND}/bizuteria/product/`)
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
        <div className="grid gap-4 mt-40 w-screen">
          <div className='items-center justify-center md '>
            <div className='flex items-center justify-center'>
                <p className='info-p mx-10'>Popular categories</p>
            </div>
            <div className='container flex gap-4 w-screen '>
                <div className='flex flex-col sm md:flex-row gap-4 grid-cols-5 w-screen mx-32'>
                  {products.map((products) => {
                    return (
                      <Product_card key={products.id} {...products} />
                    )
                  })}
                </div>
            </div>
          </div>

            <div className='flex items-center justify-center'>
                <p className='info-p'>Popular categories</p>
              </div>
              <div className='container grid gap-4 w-screen'>
                  <div className='flex flex-col sm md:flex-row gap-4 grid-cols-5 w-screen mx-32'>
                    {products.map((products) => {
                      return (
                        <Product_card key={products.id} {...products} />
                      )
                    })}
                  </div>
              </div>
          </div>
        {/* <div className='right-section'>
        </div> */}
      </div>
    )
}

export default Main_page