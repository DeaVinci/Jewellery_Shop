import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProfileLabel } from "./templates";
import { useAuth } from "../context/useAuth";
import { getUserData } from "./userServices";

const UserProfile = () => {
  const [user, setUser] = useState(); // Stan przechowujący dane użytkownika
  const [first_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [last_name, setLastName] = useState("");
  const [city, setCity] = useState("");
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

  const handleSave = async () => {
    try {
      // Wysłanie zapytania PUT na endpoint do aktualizacji danych użytkownika
      const response = await axios.post(`http://${process.env.REACT_APP_BACKEND}/accounts/user/profile/`, {
        first_name,
        email,
        last_name,
        city
      }, {
        headers: {
          token: `${localStorage.getItem("token")}` // Dodanie nagłówka z tokenem autoryzacyjnym
        }
      });
      // Jeśli zapis się powiedzie, możemy poinformować użytkownika
      alert("Dane zostały zaktualizowane!");
      // Ponowne pobranie danych użytkownika po aktualizacji
      getUserData();
    } catch (error) {
      console.error("Wystąpił błąd podczas aktualizacji danych użytkownika", error);
      // Obsługa błędu, np. wyświetlenie komunikatu dla użytkownika
      alert("Wystąpił błąd podczas aktualizacji danych użytkownika");
    }
  };



  return (
    <div className="justify-center flex">
      {user && (
        <div className="w-8/12 shadow flex flex-col items-center p-3 m-5 font_poppins">
          <ProfileLabel>
            Imię: {user.first_name}
          </ProfileLabel>
          <ProfileLabel>
            Nazwisko: {user.last_name}
          </ProfileLabel>
          <ProfileLabel>
            Email: {user.email}
          </ProfileLabel>
          <ProfileLabel>
            City: {user.city}
          </ProfileLabel>

          <Link to={'/edit-profile'}>
          <input
            type="submit"
            value="Edytuj dane"
            className="btn bg-amber-300 hover:bg-amber-500" />
            </Link>
        </div>

        // <form>
        //   <label>
        //     Imię:
        //     <input
        //       type="text"
        //       value={first_name}
        //       onChange={(e) => setName(e.target.value)}
        //       placeholder={user.first_name}
        //     />
        //   </label>
        //   <label>
        //     Email:
        //     <input
        //       type="email"
        //       value={email}
        //       onChange={(e) => setEmail(e.target.value)}
        //       placeholder={user.email}
        //     />
        //   </label>
        //   <button type="button" onClick={handleSave}>
        //     Zapisz
        //   </button>
        // </form>
      )}
    </div>
  );
};

export default UserProfile;
