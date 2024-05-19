import React from "react";
import { useCart } from "../../pages/Cart/cart_context";




const ProductCard = (props) => {
  const { id, name, price, quantity, image, short_description } = props
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    const product = {
      id,
      name,
      price,
      quantity,
      image,
      short_description
    }
    addToCart(product)
  }

  return (
    <div className="w-100 bg-base-100 h-90 min-w-60 shadow-xl flex flex-col justify-between items-center rounded-xl border-4">
      <div className="px-3 py-3">
        <img src={image} alt="Photo of jewelry piece" className="rounded-xl border min-h-52" />
        </div>
      <div className="bg-amber-100 flex flex-col justify-between w-11/12 mb-3 rounded-xl py-4 px-2 font_poppins">
        <h2 className="text-base text-bold text-ellipsis overflow-hidden whitespace-nowrap">{name}</h2>
        <h3 className="">{price} zł</h3>
        {/*<p className="overflow-hidden text-ellipsis max-h-12">{short_description}</p>*/}
        {/*<div className="card-actions"> */}
        {/*     <button className="btn bg-amber-300 hover:bg-amber-500 btn-xs sm:btn-sm lg:btn-md" onClick={handleAddToCart}>Dodaj do koszyka</button> */}
        {/*</div>*/}
      </div>
    </div>
  )
  //return (
  //  <div className="w-64 h-80 bg-base-100 shadow-xl flex flex-col justify-between items-center rounded-xl border-4">
  //    <div className="px-6 py-4 flex flex-col items-center">
  //      <img src={image} alt="Photo of jewelry piece" className="rounded-xl border min-h-52 max-h-52 object-cover" />
  //    </div>
  //    <div className="bg-amber-100 flex flex-col justify-between w-11/12 mb-3 rounded-xl py-4 px-2 font_poppins">
  //      <h2 className="text-base font-bold overflow-hidden text-ellipsis whitespace-nowrap">{name}</h2>
  //      <h3 className="">{price} zł</h3>
  //      <p className="overflow-hidden text-ellipsis max-h-12">{short_description}</p>
  //    </div>
  //  </div>
  //);
  
}

export default ProductCard