import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserData } from "./userServices";
import { useAuth } from "../context/useAuth";
import { OrderLabel, OrderInput } from "./templates";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    street: "",
    houseNumber: "",
    phone: "",
    zipCode: "",
  });
  const { token } = useAuth()

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
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      // Wysłanie zapytania POST na endpoint do aktualizacji danych użytkownika
      const response = await axios.put(`http://${process.env.REACT_APP_BACKEND}/accounts/user/profile/`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        city: user.city,
        street: user.street,
        houseNumber: user.houseNumber,
        phone: user.phone,
        zipCode: user.zipCode,
      }, {
        headers: {
          token: `${localStorage.getItem("token")}` // Dodanie nagłówka z tokenem autoryzacyjnym
        }
      });
      // Jeśli zapis się powiedzie, możemy poinformować użytkownika
      //alert("Dane zostały zaktualizowane!");
      document.getElementById('modal').showModal();
    } catch (error) {
      console.error("Wystąpił błąd podczas aktualizacji danych użytkownika", error);
      // Obsługa błędu, np. wyświetlenie komunikatu dla użytkownika
      alert("Wystąpił błąd podczas aktualizacji danych użytkownika");
    }
  };

  return (
    <div className="justify-center flex">
      <form className="w-8/12 shadow flex flex-col items-center p-2 m-5">
        <OrderLabel>
          Imię:
          <OrderInput
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
          />
        </OrderLabel>
        <OrderLabel>
          Nazwisko:
          <OrderInput
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
          />
        </OrderLabel>
        <OrderLabel>
          Email:
          <OrderInput
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </OrderLabel>
        <OrderLabel>
          Miasto:
          <OrderInput
            type="text"
            name="city"
            value={user.city}
            onChange={handleChange}
          />
        </OrderLabel>
        <OrderLabel>
          Ulica:
          <OrderInput
            type="text"
            name="street"
            value={user.street}
            onChange={handleChange}
          />
        </OrderLabel>
        <OrderLabel>
          Numer domu:
          <OrderInput
            type="text"
            name="houseNumber"
            value={user.houseNumber}
            onChange={handleChange}
          />
        </OrderLabel>
        <OrderLabel>
          Telefon:
          <OrderInput
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </OrderLabel>
        <OrderLabel>
          Kod pocztowy:
          <OrderInput
            type="text"
            name="zipCode"
            value={user.zipCode}
            onChange={handleChange}
          />
        </OrderLabel>
        <button type="button" onClick={handleSave} className="btn bg-amber-300 hover:bg-amber-500">
          Zapisz dane
        </button>
        <dialog id="modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Świetnie</h3>
            <p className="py-4">Dane zostały zaktualizowane!</p>
            <div className="modal-action justify-center">
              <form method="dialog ">
                <Link to='/profile'>
                  <button className="btn text-white bg-red-300 hover:bg-red-400">Zamknij i wróc do profilu</button>
                </Link>
              </form>
            </div>
          </div>
        </dialog>
      </form>
    </div>
  );
};

export default EditProfile;
