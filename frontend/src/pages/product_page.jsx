import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useCart } from "./Cart/cart_context";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const productData = {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1,
        };
        addToCart(productData);
        document.getElementById('modal').showModal();
    };

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_BACKEND}/bizuteria/product/${id}`)
            .then((result) => {
                console.log(result.data);
                setProduct(result.data);
            })
            .catch((error) => {
                console.log(error);
                setProduct(null); // Możesz dodać tę linię tutaj, aby ustawić product na null w przypadku błędu
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="hero my-32 bg-base-100 font_poppins">
            <div className="hero-content lg:w-9/12 flex-col lg:flex-row lg:justify-around lg:items-center">
                <img src={product.image} className="max-w-sm min-h-96 rounded-lg shadow-2xl " alt={product.name} />
                <div className="">
                    <h1 className="text-5xl font-bold">{product.name}</h1>
                    <div className="flex flex-col gap-2 my-3">
                        <p className="">{product.metal}</p>
                        <p className="">{product.fineness}</p>
                        <p className="">{product.long_description}</p>
                        <p className="text-xl font-bold border border-2 drop-shadow rounded-md py-2 px-7 m-auto">{product.price} zł</p>
                    </div>
                    <button className="btn text-xl bg-amber-300 hover:bg-amber-500" onClick={handleAddToCart}>Dodaj do koszyka</button>
                </div>
            </div>
            <dialog id="modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Świetnie</h3>
                    <p className="py-4">Produkt został dodany do koszyka!</p>
                    <div className="modal-action flex flex-row">

                        <button className="btn text-white bg-red-300 hover:bg-red-400" onClick={() => document.getElementById('modal').close()}>Zamknij</button>
                        <Link to='/cart'>
                            <button className="btn text-white bg-red-300 hover:bg-red-400">Przejdź do koszyka</button>
                        </Link>

                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default ProductPage;
