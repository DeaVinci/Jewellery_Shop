import React, { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate, Navigate } from "react-router-dom";
import { getUserData } from "./userServices";
import { OrderLabel, OrderInput } from "./templates";
import { calculateSubtotal, formatCurrency } from "./cartFunctions";
import axios from "axios";
import { useCart } from "../pages/Cart/cart_context";
import Paypal from "./paypal";


export const Order = () => {
  const { token, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart();
  const subtotal = parseFloat(calculateSubtotal(cart).toFixed(2)); 
  const formattedSubtotal = formatCurrency(subtotal);
  const [checkout, setCheckOut] = useState(false); 

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
    if (!isLoggedIn) {
      navigate('/');
    } else {
      const fetchData = async () => {
        try {
          const userData = await getUserData(token);
          setUser(userData);
        } catch (error) {
          console.error("Wystąpił błąd podczas pobierania danych użytkownika", error);
        }
      };

      fetchData();
    }
  }, [isLoggedIn, token, navigate]);

  const handleChange = (e) => {
    setUser({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  if (!isLoggedIn) {
    return null; 
  }

  return (
    <div className="justify-center flex">
      <form className="w-8/12 shadow-2xl drop-shadow rounded-md flex flex-col items-center p-2 m-5">
        <OrderLabel>
          Imię:
          <OrderInput type="text" name="first_name" value={userData.first_name} onChange={handleChange} required />
        </OrderLabel>
        <OrderLabel>
          Nazwisko:
          <OrderInput type="text" name="last_name" value={userData.last_name} onChange={handleChange} required />
        </OrderLabel>
        <OrderLabel>
          Email:
          <OrderInput type="email" name="email" value={userData.email} onChange={handleChange} required />
        </OrderLabel>
        <OrderLabel>
          City:
          <OrderInput type="text" name="city" value={userData.city} onChange={handleChange} required />
        </OrderLabel>
        <OrderLabel>
          Kod pocztowy:
          <OrderInput type="text" name="zipCode" value={userData.zipCode} onChange={handleChange} required />
        </OrderLabel>
        <OrderLabel>
          Ulica:
          <OrderInput type="text" name="street" value={userData.street} onChange={handleChange} required />
        </OrderLabel>
        <OrderLabel>
          Numer domu:
          <OrderInput type="text" name="houseNumber" value={userData.houseNumber} onChange={handleChange} required />
        </OrderLabel>
        <OrderLabel>
          Telefon:
          <OrderInput type="tel" name="phone" value={userData.phone} onChange={handleChange} required />
        </OrderLabel>
        <OrderLabel>
          Suma:
          <label className="flex w-32 md:w-48 lg:w-64 items-center text-center justify-center rounded-lg border">
            {formattedSubtotal}
          </label>
        </OrderLabel>
        {checkout ? (
          <Paypal amount={subtotal} userData={userData} token={token} navigate={navigate} />
        ) : (
          <button onClick={() => setCheckOut(true)} className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded mb-4">Zapłać systemem PayPal</button>
        )}
      </form>
    </div>
  );
};
