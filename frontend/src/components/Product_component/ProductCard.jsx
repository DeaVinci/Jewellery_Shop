import React from "react";
import { useCart } from "../../pages/Cart/cart_context";

const ProductCard = (props) => {
  const { id, name, price, quantity, image, short_description } = props
  const { addToCart } = useCart()

  return (
    <div className="w-100 bg-base-100 h-90 min-w-60 shadow-xl flex flex-col justify-between items-center rounded-xl border-4">
      <div className="px-3 py-3">
        <img src={image} alt="Photo of jewelry piece" className="rounded-xl border min-h-52" />
        </div>
      <div className="bg-amber-100 flex flex-col justify-between w-11/12 mb-3 rounded-xl py-4 px-2 font_poppins">
        <h2 className="text-base text-bold text-ellipsis overflow-hidden whitespace-nowrap">{name}</h2>
        <h3 className="">{price} zł</h3>
      </div>
    </div>
  )
}

export default ProductCard