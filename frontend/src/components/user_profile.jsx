import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProfileLabel } from "./templates";
import { useAuth } from "../context/useAuth";
import { getUserData } from "./userServices";

const UserProfile = () => {
  const [user, setUser] = useState(); // Stan przechowujący dane użytkownika
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
            Miasto: {user.city}
          </ProfileLabel>
          <ProfileLabel>
            Ulica: {user.street}
          </ProfileLabel>
          <ProfileLabel>
            Numer domu: {user.houseNumber}
          </ProfileLabel>
          <ProfileLabel>
            Telefon: {user.phone}
          </ProfileLabel>
          <ProfileLabel>
            Kod pocztowy: {user.zipCode}
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
