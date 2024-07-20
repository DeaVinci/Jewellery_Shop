import axios from "axios";

export const getUserData = async (token) => {
  try {
    const response = await axios.get(`http://${process.env.REACT_APP_BACKEND}/accounts/user/profile/`, {
      headers: {
        token: token 
      }
    });
    return response.data;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania danych użytkownika", error);
    throw error;
  }
};
