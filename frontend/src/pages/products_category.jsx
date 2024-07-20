import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/Product_component/ProductCard";


const ProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { category } = useParams();

  useEffect(() => {
      axios.get(`http://${process.env.REACT_APP_BACKEND}/bizuteria/product/category/${category}`)
        .then((result) => {
          console.log(result.data)
          setProducts(result.data.results)
        })
        .catch((error) => {
          console.error("Error fetching products by category:", error);
          setError("Wystąpił błąd podczas pobierania produktów.");
        })
  }, [category]);

  return (
    <div>
      {error && <div>{error}</div>}
      {products.length === 0 && !error && <div>Brak produktów w tej kategorii.</div>}
      {products.length > 0 && (
        <div className='main-container w-screen'>
        <div className="grid gap-4 mt-10 w-screen flex flex-col items-center justify-center">
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
      )}
    </div>
  );
};

export default ProductsByCategory;
