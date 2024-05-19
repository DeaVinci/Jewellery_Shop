import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: ""
  });

  useEffect(() => {
    // Pobierz dane użytkownika po załadowaniu komponentu
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      // Wysłanie zapytania GET na endpoint do pobrania danych użytkownika
      const response = await axios.get(`http://${process.env.REACT_APP_BACKEND}/accounts/user/profile/`, {
        headers: {
          token: `${localStorage.getItem("token")}` // Dodanie nagłówka z tokenem autoryzacyjnym
        }
      });
      console.log(response.data)
      // Ustawienie pobranych danych użytkownika w stanie komponentu
      setUser(response.data);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych użytkownika", error);
    }
  };

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
        city: user.city
      }, {
        headers: {
          token: `${localStorage.getItem("token")}` // Dodanie nagłówka z tokenem autoryzacyjnym
        }
      });
      // Jeśli zapis się powiedzie, możemy poinformować użytkownika
      alert("Dane zostały zaktualizowane!");
    } catch (error) {
      console.error("Wystąpił błąd podczas aktualizacji danych użytkownika", error);
      // Obsługa błędu, np. wyświetlenie komunikatu dla użytkownika
      alert("Wystąpił błąd podczas aktualizacji danych użytkownika");
    }
  };

  return (
    <div className="justify-center flex">
      <form className="w-8/12 shadow flex flex-col items-center p-3 m-5">
        <label>
          Imię:
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Nazwisko:
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={user.city}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleSave} className="btn">
          Zapisz
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
