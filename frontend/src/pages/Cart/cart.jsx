import React, { useState } from "react";
import { useCart } from "./cart_context";
import { Link } from "react-router-dom";
import { calculateSubtotal, formatCurrency } from "../../components/cartFunctions";
import Paypal from "../../components/paypal";

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const subtotal = calculateSubtotal(cart);
    const formattedSubtotal = formatCurrency(subtotal);

    const [checkout, setCheckOut] = useState(false)

    function placeOrder (cart) {
        if (cart.length !== 0) {
          console.log(cart)
          console.log(cart.map(({ a }) => a))
        }
        localStorage.setItem('orderItems', JSON.stringify(cart));
        localStorage.setItem('subtotal', subtotal.toFixed(2));
      }

    return (
        <div className='flex items-center justify-center text-black'>
            <div className='bg-white w-full py-8  flex flex-col items-center justify-center drop-shadow-2xl rounded-md md:px-5 md:flex-row md:w-9/12'>
                <ul className='rounded-md bg-white text-black drop-shadow-lg overflow-hidden w-2/3 md md:w-full'>
                    {cart.map((item) => (
                        <li className='rounded-md overflow-hidden bg-amber-100 border px-7 py-5 m-5 flex flex-col items-center justify-between drop-shadow-lg md md:flex-row' key={item.id}>
                            <div className="flex flex-col w-24 h-24 bg-white rounded-md items-center md md:flex-row min-w-7 min-h-7">
                                <img className='rounded-md' src={item.image} alt="Item photo" />
                            </div>
                            <div className='flex flex-col items-center md md:flex-col lg:flex-row justify-center content-center'>
                                <span className='px-4 font-bold font-mono text-nowrap'>{item.name}</span>
                                <div className='m-5 px-4 font-mono'>{item.price} zł</div>
                                <div className='flex justify-center items-center gap-3'>
                                    <button className="btn w-11 rounded-full outline-amber-600 bg-amber-300 hover:bg-amber-500 outline outline-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span className="bg-white label w-10 h-10 rounded-full outline-amber-600 items-center justify-center outline outline-2">{item.quantity}</span>
                                    <button className="btn w-10 h-10 rounded-full outline-amber-600 bg-amber-300 hover:bg-amber-500 outline outline-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <div className='m-3 drop-shadow-lg'>
                                    <button onClick={() => removeFromCart(item.id)}>Usuń</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='bg-white rounded-md m-4 flex flex-col items-center drop-shadow-lg'>
                    <div className='w-full p-3 border-b-4'>
                        <span className='mx-4 font-bold'>Szczegóły płatności</span>
                    </div>
                    <div className='w-full gap-3 p-3 flex justify-between border-b-4 md:flex-col lg:flex-col'>
                        <span className='mx-4'>Suma</span>
                        <span className='mx-4'>{formattedSubtotal}</span>
                        <Link to='order'>
                            <button onClick={() => placeOrder(cart)} className="drop-shadow-lg m-6 transition ease-in-out rounded bg-amber-200 font-mono p-4 mx-8 text-xl hover:bg-amber-500">
                            Złóż zamówienie
                            </button>
                        </Link>
                    
                    {/*}    {checkout ? (
                            <Paypal />
                        ) : (
                                <button onClick = { () => setCheckOut(true) }>Zamów produkty</button>
                    )}
                */}
                </div>
            </div>
        </div>
        </div >
    );
};

export default CartPage;
