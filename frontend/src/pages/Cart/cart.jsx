import React, { useState } from "react";
import { useCart } from "./cart_context";
import { Link } from "react-router-dom";
import { calculateSubtotal, formatCurrency } from "../../components/cartFunctions";
import Paypal from "../../components/paypal";
import Minus from '../../assets/minus-sm.svg'
import Plus from '../../assets/plus-sm.svg'

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
        <div className='flex items-center justify-center text-black font_poppins'>
            <div className='bg-white w-full py-8  flex flex-col items-center justify-center drop-shadow-2xl rounded-md md:px-5 md:flex-row md:w-9/12'>
                <ul className='rounded-md bg-white text-black drop-shadow-lg overflow-hidden w-2/3 md md:w-full'>
                    {cart.map((item) => (
                        <li className='rounded-md overflow-hidden bg-amber-100 border px-7 py-5 m-5 flex flex-col items-center justify-between drop-shadow-lg md md:flex-row' key={item.id}>
                            <div className="flex flex-col w-24 h-24 bg-white rounded-md items-center md md:flex-row mb-3 md:mb-0">
                                <img className='rounded-md min-w-24 min-h-24' src={item.image} alt="Item photo" />
                            </div>
                            <div className='flex flex-col items-center md lg:flex-col xl:flex-row justify-center content-center'>
                                <span className='px-4 text-base text-bold text-ellipsis'>{item.name}</span>
                                <div className='m-5 px-4 '>{item.price} zł</div>
                                <div className='flex justify-center items-center gap-3 '>
                                    <button className="btn w-11 bg-amber-300 hover:bg-amber-500 text-2xl" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                    <img src={Minus} alt="Minus button" className="w-6 h-6" />
                                    </button>
                                    <span className="bg-white rounded-md label w-11 h-11 items-center justify-center">{item.quantity}</span>
                                    <button className="btn w-11 bg-amber-300 hover:bg-amber-500 text" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    <img src={Plus} alt="Minus button" className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className='m-3'>
                                    <button className="btn text-white bg-red-400 hover:bg-red-500" onClick={() => removeFromCart(item.id)}>Usuń</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='bg-white rounded-md m-4 flex flex-col items-center drop-shadow-lg'>
                    <div className='w-full p-3 border-b-4'>
                        <span className='mx-4'>Szczegóły płatności</span>
                    </div>
                    <div className='w-full gap-3 p-3 flex justify-between items-center border-b-4 md:flex-col lg:flex-col'>
                        <span className='mx-4 font-bold'>Suma</span>
                        <span className='mx-4'>{formattedSubtotal}</span>
                        <Link to='order'>
                            <button onClick={() => placeOrder(cart)} className="drop-shadow-lg m-6 transition ease-in-out rounded bg-amber-200 p-4 mx-8 text-xl hover:bg-amber-500">
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
