import React, { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { getUserData } from "./userServices";
import { OrderLabel, OrderInput } from "./templates";
import { calculateSubtotal, formatCurrency } from "./cartFunctions";
import axios from "axios";
import { useCart } from "../pages/Cart/cart_context";

export const Order = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart();
  const subtotal = calculateSubtotal(cart);
  const formattedSubtotal = formatCurrency(subtotal);  // Format the subtotal for display

  const [userData, setUser] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    city: '',
    street: '',
    houseNumber: '',
    zipCode: '',
  });

  useEffect(() => {
    // Wywołanie funkcji do pobrania danych użytkownika po załadowaniu komponentu
    const fetchData = async () => {
      try {
        const userData = await getUserData(token);
        setUser(userData);
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych użytkownika", error);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    setUser({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault()
    const orderItems = JSON.parse(localStorage.getItem('orderItems'))

    const parsedSubtotal = parseFloat(subtotal);
        if (isNaN(parsedSubtotal)) {
            console.error('Subtotal is not a valid number:', subtotal);
            return;
        }

    const orderData = {
      ...userData,
      subtotal: parsedSubtotal,
      products_ids: orderItems.map(item => ({ id: item.id, quantity: item.quantity }))
    }
    try {
      const response = await axios.post(`http://${process.env.REACT_APP_BACKEND}/bizuteria/order`, orderData, {
        headers: {
          token: token
        }
      })

      console.log('Order placed:', response.data)
      localStorage.removeItem('orderItems')
      navigate('/cart/order/orderdone')
    } catch (error) {
      console.error('Order placement failed', error)

      if (error.response) {
        console.error('Server responded with:', error.response.data)
      } else if (error.request) {
        console.error('Request was not sent:', error.request)
      } else {
        console.error('Error during request processing:', error.message)
      }
    }
  }

  return (
    <div className="justify-center flex">
      <form onSubmit={handleSubmit} className="w-10/12 shadow flex flex-col items-center p-2 m-5">
        <OrderLabel>
          Imię:
          <OrderInput
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            required
          />
        </OrderLabel>
        <OrderLabel>
          Nazwisko:
          <OrderInput
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            required
          />
        </OrderLabel>
        <OrderLabel>
          Email:
          <OrderInput
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </OrderLabel>
        <OrderLabel>
          City:
          <OrderInput
            type="text"
            name="city"
            value={userData.city}
            onChange={handleChange}
            required
          />
        </OrderLabel>
        <OrderLabel>
          Kod pocztowy:
          <OrderInput
            type="text"
            name="zipCode"
            value={userData.zipCode}
            onChange={handleChange}
            required
          />
        </OrderLabel>
        <OrderLabel>
          Ulica:
          <OrderInput
            type="text"
            name="street"
            value={userData.street}
            onChange={handleChange}
            required
          />
        </OrderLabel>
        <OrderLabel>
          Numer domu:
          <OrderInput
            type="text"
            name="houseNumber"
            value={userData.houseNumber}
            onChange={handleChange}
            required
          />
        </OrderLabel>
        <OrderLabel>
          Telefon:
          <OrderInput
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            required
          />
        </OrderLabel>
        <OrderLabel>
          Suma:
          <label className="flex w-32 md:w-48 lg:w-64 items-center text-center justify-center rounded-lg border">
          {formattedSubtotal}
            </label> 
        </OrderLabel>
        <button type="submit" className="w-full bg-amber-300 text-black px-4 py-2 rounded mb-4">Submit</button>
      </form>
    </div>
  )
}