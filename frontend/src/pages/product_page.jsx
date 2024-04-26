import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { addToCart } from "../components/cartFunctions";


const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const handleAddToCart = () => {
        const productData = {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: product.quantity,
            // Dodaj inne niezbędne informacje o produkcie
        };
        addToCart(productData);
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
        <div className="hero my-32 bg-base-100">
            <div className="hero-content lg:w-9/12 flex-col lg:flex-row lg:justify-around lg:items-center">
                <img src={product.image} className="max-w-sm min-h-96 rounded-lg shadow-2xl " />
                <div>
                    <h1 className="text-5xl font-bold">{product.name}</h1>
                    <p className="py-6">{product.long_description}</p>
                    <button className="btn bg-amber-300 hover:bg-amber-500" onClick={handleAddToCart}>Dodaj do koszyka</button>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
