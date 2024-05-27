import axios from "axios";

export const getUserData = async (token) => {
  try {
    // Wysłanie zapytania GET na endpoint do pobrania danych użytkownika
    const response = await axios.get(`http://${process.env.REACT_APP_BACKEND}/accounts/user/profile/`, {
      headers: {
        token: token // Dodanie nagłówka z tokenem autoryzacyjnym
      }
    });
    return response.data;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania danych użytkownika", error);
    throw error;
  }
};
