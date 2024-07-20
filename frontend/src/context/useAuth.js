import { createContext, useContext, useEffect, useReducer } from "react";

const AuthStateContext = createContext(undefined);
const initialValues = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "setToken": {
      console.log("Zalogowano");
      localStorage.setItem("token", action.data);
      return {
        ...state,
        token: action.data,
        user: action.user,
        isLoggedIn: true,
      };
    }
    case "logout": {
      console.log("Wylogowano");
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isLoggedIn: false,
      };
    }

    default: {
      throw Error("Unknown action type");
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialValues);

  const logout = () => dispatch({ type: "logout" });

  const existingToken = localStorage.getItem("token") || null;
  useEffect(() => {
    if (existingToken) {
      dispatch({ type: "setToken", data: existingToken });
    }
  }, [existingToken]);
  return (
    <AuthStateContext.Provider
      value={{
        ...state,
        authDispatch: dispatch,
        logout: logout,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
