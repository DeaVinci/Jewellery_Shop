import { createContext, useContext, useEffect, useReducer } from "react";

const AuthStateContext = createContext(undefined)
const initialValues = {
    user: null,
    token: null,
    isLoggedIn: false
}

const authReducer = (state, action) => {
    switch (action.type) {
        case "setToken": {
            if (action.data) {
                console.log("Zalogowano");
                localStorage.setItem('token', action.data);
                // Tutaj możemy załadować użytkownika na podstawie tokena, jeśli taka funkcjonalność jest dostępna w twojej aplikacji
                // Przykład: const user = loadUserFromToken(action.data);
                return {
                    ...state,
                    token: action.data,
                    user: action.user, // Tutaj ustawiamy użytkownika na podstawie danych załadowanych z tokena
                    isLoggedIn: true // Ustawiamy stan zalogowania na true po zalogowaniu
                };
            } else {
                console.log("Wylogowano");
                localStorage.removeItem('token');
                return {
                    ...state,
                    token: null,
                    user: null,
                    isLoggedIn: false // Ustawiamy stan zalogowania na false po wylogowaniu
                };
            }
        }
        case "logout": {
            console.log("Wylogowano");
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isLoggedIn: false // Ustawiamy stan zalogowania na false po wylogowaniu
            };
        }

        default: {
            throw Error("Unknown action type")
        }
    }
}

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialValues)

    const logout = () => dispatch({ type: 'logout' });

    const existingToken = localStorage.getItem('token') || null
    useEffect(() => {
        if (existingToken) {
            dispatch({type: 'setToken', data: existingToken})
        }
    }, [existingToken])
    return (
        <AuthStateContext.Provider value={{
            ...state,
            authDispatch: dispatch,
            logout: logout
        }}>
            {children}
        </AuthStateContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
