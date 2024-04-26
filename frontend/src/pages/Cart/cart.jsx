import React, {useState} from "react";
import { getCartProducts, removeFromCart } from "../../components/cartFunctions";
import { calculateSubtotal } from "../../components/cartFunctions";

const CartPage = () => {
    const cartProducts = getCartProducts();
    const [cartItems, setCartItems] = useState(cartProducts);
    const subtotal = calculateSubtotal(cartItems);

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId); // Usuń produkt z localStorage
        setCartItems(cartItems.filter(item => item.id !== productId)); // Aktualizuj stan cartItems
    };

    return (
        <div className='h-screen flex items-center justify-center text-black'>
            <div className='bg-white w-full py-8  flex flex-col items-center justify-center drop-shadow-2xl rounded-md md:flex-row md:w-9/12'>
                <ul className='rounded-md bg-white text-black drop-shadow-lg overflow-hidden w-2/3 md md:w-full'>
                    {cartProducts.map((item) => (
                        <li className='rounded-md overflow-hidden bg-amber-100 border px-7 py-5 m-5 flex flex-col items-center justify-between drop-shadow-lg md md:flex-row' key={item.id}>
                            <div className="flex flex-col w-24 h-24 bg-white rounded-md items-center md md:flex-row">
                                <img className='rounded-md' src={item.image} alt="Item photo" />
                                <span className='px-4 font-bold font-mono'>{item.name}</span>
                            </div>
                            <div className='flex flex-col items-center md md:flex-row justify-center content-center'>
                                <div className='m-5 font-bold px-4 font-mono'>{item.price} zł</div>
                                <div className='flex justify-center items-center'>
                                </div>
                                <div className='m-3 drop-shadow-lg'>
                                    <button className="" onClick={() => handleRemoveFromCart(item.id)}>Usuń</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='bg-white rounded-md m-4 flex flex-col items-center drop-shadow-lg'>
                    <div className='w-full p-3 border-b-4'>
                        <span className='mx-4 font-bold'>Payment Details</span>
                    </div>
                    <div className='w-full p-3 flex justify-between border-b-4'>
                        <span className='mx-4'>Total</span>
                        <span className='mx-4'>{subtotal}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage