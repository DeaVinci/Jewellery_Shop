import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import UserProfile from "../components/user_profile";

const ProfilePage = () => {
  const { isLoggedIn } = useAuth();

  //if (!isLoggedIn) {
    // Przekieruj użytkownika na stronę logowania, jeśli nie jest zalogowany
  //  return <Navigate to="/login" />;
 // }

  return (
    <div>
      <h1>Twój profil</h1>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
