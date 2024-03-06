import React from "react";


const Product_card = (props) => {
    const {id, name, price, quantity, image, short_description} = props
    
    return(
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={image} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{name}</h2>
            <h3>{price}</h3>
            <p>{short_description}</p>
            <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
    )
}

export default Product_card